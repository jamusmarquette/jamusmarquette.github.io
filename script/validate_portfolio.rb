#!/usr/bin/env ruby
# frozen_string_literal: true

require "pathname"
require "yaml"

ROOT = Pathname.new(__dir__).join("..").expand_path
PROJECT_DIR = ROOT.join("source/_projects")
SOURCE_DIR = ROOT.join("source")

CATEGORY_REGISTRY_PATH = ROOT.join("source/_data/portfolio_categories.yml")
FINAL_CATEGORIES = [
  { "id" => "identity-branding", "label" => "Identity & Branding" },
  { "id" => "editorial-publications", "label" => "Editorial & Publications" },
  { "id" => "illustration", "label" => "Illustration" },
  { "id" => "motion", "label" => "Motion" },
  { "id" => "font-design", "label" => "Font Design" },
  { "id" => "websites", "label" => "Websites" },
  { "id" => "interactive-tools", "label" => "Interactive Tools" },
  { "id" => "environmental-exhibit-design", "label" => "Environmental & Exhibit Design" },
  { "id" => "theater-art", "label" => "Theater Art" }
].freeze
RESERVED_CATEGORY_LABELS = ["All Projects", "Recently Viewed"].freeze
LEGACY_CATEGORY_LABELS = ["Book Covers", "Environmentals & Interactives", "Personal Projects"].freeze

MEDIA_KEYS = %w[thumbnail hero hero_left hero_right image video poster].freeze
ACTIVE_TEMPLATE_GLOBS = [
  "source/index.html",
  "source/_pages/**/*.{html,md}",
  "source/_layouts/**/*.{html,md}",
  "source/_includes/**/*.{html,md}"
].freeze

Issue = Struct.new(:level, :code, :message, keyword_init: true)

def front_matter(path)
  content = path.read
  match = content.match(/\A---\s*\n(.*?)\n---\s*\n/m)
  raise "missing YAML front matter" unless match

  YAML.safe_load(match[1], permitted_classes: [], aliases: false) || {}
end

def collect_media(value, trail = [], results = [])
  case value
  when Hash
    value.each do |key, child|
      results << [trail + [key], child] if MEDIA_KEYS.include?(key.to_s) && child.is_a?(String)
      collect_media(child, trail + [key], results)
    end
  when Array
    value.each_with_index { |child, index| collect_media(child, trail + [index], results) }
  end
  results
end

def case_exact?(path)
  current = Pathname.new(path.absolute? ? File::SEPARATOR : ".")
  path.each_filename do |part|
    return false unless current.directory? && current.children.any? { |child| child.basename.to_s == part }

    current = current.join(part)
  end
  true
end

def present_text?(value)
  value.is_a?(String) && !value.strip.empty?
end

def contributor_names_present?(entry)
  names = entry["names"] || entry["people"] || entry["name"]
  case names
  when Array
    names.any? { |name| present_text?(name) }
  else
    present_text?(names)
  end
end

def valid_credit_entry?(entry)
  entry.is_a?(Hash) && present_text?(entry["role"]) && contributor_names_present?(entry)
end

def valid_detail_entries?(entries)
  entries.is_a?(Array) && entries.any? { |entry| valid_credit_entry?(entry) }
end

def malformed_detail_entries?(entries)
  !entries.is_a?(Array) || entries.any? { |entry| !valid_credit_entry?(entry) }
end

def valid_recognition_entries?(entries)
  entries.is_a?(Array) && entries.any? { |entry| entry.is_a?(Hash) && present_text?(entry["title"]) }
end

def valid_link_entries?(entries)
  entries.is_a?(Array) && entries.any? do |entry|
    entry.is_a?(Hash) && present_text?(entry["label"]) && present_text?(entry["url"])
  end
end

def report_list(entries)
  entries.empty? ? "none" : entries.join(", ")
end

issues = []
projects = []
category_usage = Hash.new { |hash, key| hash[key] = [] }
excluded_category_usage = Hash.new { |hash, key| hash[key] = [] }
details_report = {
  credits: [],
  collaborators: [],
  both: [],
  malformed_collaborators: [],
  no_details: []
}

begin
  category_registry = YAML.safe_load(CATEGORY_REGISTRY_PATH.read, permitted_classes: [], aliases: false)
rescue StandardError => e
  issues << Issue.new(level: :error, code: "category-registry", message: "#{CATEGORY_REGISTRY_PATH.relative_path_from(ROOT)}: #{e.message}")
  category_registry = []
end

unless category_registry.is_a?(Array)
  issues << Issue.new(level: :error, code: "category-registry", message: "category registry must be an array")
  category_registry = []
end

registry_ids = category_registry.map { |category| category.is_a?(Hash) ? category["id"] : nil }
registry_labels = category_registry.map { |category| category.is_a?(Hash) ? category["label"] : nil }
category_registry.each_with_index do |category, index|
  unless category.is_a?(Hash) && present_text?(category["id"]) && present_text?(category["label"])
    issues << Issue.new(level: :error, code: "category-registry", message: "category registry entry #{index + 1} must include a non-empty id and label")
  end
end
registry_ids.compact.group_by(&:itself).each do |id, entries|
  issues << Issue.new(level: :error, code: "duplicate-category-id", message: "category registry id #{id.inspect} is duplicated") if entries.length > 1
end
registry_labels.compact.group_by(&:itself).each do |label, entries|
  issues << Issue.new(level: :error, code: "duplicate-category-label", message: "category registry label #{label.inspect} is duplicated") if entries.length > 1
end
if category_registry.map { |category| category.slice("id", "label") } != FINAL_CATEGORIES
  issues << Issue.new(level: :error, code: "category-registry", message: "category registry must match the final taxonomy and order")
end

PROJECT_DIR.glob("*.md").sort.each do |path|
  begin
    data = front_matter(path)
  rescue StandardError => e
    issues << Issue.new(level: :error, code: "front-matter", message: "#{path.relative_path_from(ROOT)}: #{e.message}")
    next
  end

  projects << [path, data]
  label = data["title"] || path.basename.to_s

  has_credits = valid_detail_entries?(data["credits"])
  has_collaborators = valid_detail_entries?(data["collaborators"])
  details_report[:credits] << label if has_credits
  details_report[:collaborators] << label if has_collaborators
  details_report[:both] << label if data.key?("credits") && data.key?("collaborators")
  if data.key?("collaborators") && malformed_detail_entries?(data["collaborators"])
    details_report[:malformed_collaborators] << label
  end

  has_scalar_detail = %w[status version client].any? { |key| present_text?(data[key]) }
  has_details = has_scalar_detail || has_credits || has_collaborators || valid_recognition_entries?(data["recognition"]) || valid_link_entries?(data["links"])
  details_report[:no_details] << label unless has_details

  if data["thumbnail"].to_s.strip.empty?
    issues << Issue.new(level: :error, code: "thumbnail", message: "#{label}: missing thumbnail metadata")
  end

  excluded_project = data["prototype"] == true || data["browser_exclude"] == true || data["hidden"] == true || data["published"] == false
  categories_value = data["categories"]
  if !excluded_project && !categories_value.is_a?(Array)
    issues << Issue.new(level: :error, code: "malformed-categories", message: "#{label}: categories must be a non-empty array")
  end
  categories = categories_value.is_a?(Array) ? categories_value : []
  if !excluded_project && categories.empty?
    issues << Issue.new(level: :error, code: "empty-categories", message: "#{label}: categories must not be empty")
  end
  categories.group_by(&:itself).select { |_category, entries| entries.length > 1 }.each_key do |category|
    issues << Issue.new(level: :error, code: "duplicate-category", message: "#{label}: category #{category.inspect} is duplicated")
  end

  categories.each do |category|
    if !category.is_a?(String) || category.strip.empty?
      issues << Issue.new(level: :error, code: "empty-category", message: "#{label}: category values must be non-empty strings")
      next
    end
    if RESERVED_CATEGORY_LABELS.include?(category)
      issues << Issue.new(level: :error, code: "reserved-category", message: "#{label}: #{category.inspect} is a filter state, not project metadata")
    end
    if LEGACY_CATEGORY_LABELS.include?(category)
      issues << Issue.new(level: :error, code: "legacy-category", message: "#{label}: #{category.inspect} is a retired category")
    end
    unless registry_labels.include?(category)
      issues << Issue.new(level: :error, code: "unknown-category", message: "#{label}: #{category.inspect} is not in the category registry")
    end
    (excluded_project ? excluded_category_usage : category_usage)[category] << label
  end

  collect_media(data).each do |trail, reference|
    unless reference.start_with?("/")
      issues << Issue.new(level: :warning, code: "relative-media", message: "#{label}: #{trail.join('.')} uses non-root path #{reference.inspect}")
      next
    end

    target = SOURCE_DIR.join(reference.delete_prefix("/"))
    unless target.exist?
      issues << Issue.new(level: :error, code: "missing-media", message: "#{label}: #{trail.join('.')} points to missing #{reference}")
      next
    end

    unless case_exact?(target)
      issues << Issue.new(level: :error, code: "media-case", message: "#{label}: #{reference} does not match filesystem case exactly")
    end
  end
end

projects.group_by { |_path, data| data["order"] }.each do |order, entries|
  next if order.nil? || entries.length == 1

  names = entries.map { |_path, data| data["title"] }.join(", ")
  issues << Issue.new(level: :error, code: "duplicate-order", message: "order #{order.inspect}: #{names}")
end

projects.each do |path, data|
  next unless data["order"].nil?

  issues << Issue.new(level: :error, code: "missing-order", message: "#{path.basename}: missing order")
end

active_templates = ACTIVE_TEMPLATE_GLOBS.flat_map { |glob| ROOT.glob(glob) }.uniq
active_templates.reject! { |path| path.basename.to_s.start_with?("___") }

active_templates.sort.each do |path|
  content = path.read
  relative = path.relative_path_from(ROOT)

  content.scan(/["'](\/[^"']+)["']\s*\|\s*relative_url/).flatten.each do |reference|
    next unless reference.match?(/\.(?:css|js|gif|jpe?g|png|svg|webp|mp4|woff2?|otf)\z/i)

    target = SOURCE_DIR.join(reference.delete_prefix("/"))
    unless target.exist?
      issues << Issue.new(level: :error, code: "missing-template-path", message: "#{relative}: missing #{reference}")
      next
    end

    unless case_exact?(target)
      issues << Issue.new(level: :error, code: "template-path-case", message: "#{relative}: #{reference} does not match filesystem case exactly")
    end
  end
end

project_card = ROOT.join("source/_includes/project-card.html").read
if project_card.match?(/<a\s+project-card-title"/)
  issues << Issue.new(
    level: :error,
    code: "malformed-markup",
    message: "source/_includes/project-card.html: project title link has a malformed class attribute"
  )
end

default_layout = ROOT.join("source/_layouts/default.html").read
project_layout = ROOT.join("source/_layouts/project.html").read
if default_layout.match?(/<main\b/) && project_layout.match?(/<main\b/)
  issues << Issue.new(
    level: :warning,
    code: "nested-main",
    message: "project.html emits a main element inside default.html's main element"
  )
end

puts "Portfolio validation"
puts "Projects: #{projects.length}"
puts "Final categories: #{FINAL_CATEGORIES.length}"
puts "Real project category usage"
FINAL_CATEGORIES.each do |category|
  labels = category_usage[category["label"]]
  puts "  #{category["label"]} (#{labels.length}): #{report_list(labels)}"
end
puts "Excluded project category usage"
excluded_category_usage.keys.sort.each do |category|
  labels = excluded_category_usage[category]
  puts "  #{category} (#{labels.length}): #{report_list(labels)}"
end
puts "Details migration report"
puts "  Preferred credits (#{details_report[:credits].length}): #{report_list(details_report[:credits])}"
puts "  Legacy collaborators (#{details_report[:collaborators].length}): #{report_list(details_report[:collaborators])}"
puts "  Both fields (#{details_report[:both].length}): #{report_list(details_report[:both])}"
puts "  Malformed legacy collaborators (#{details_report[:malformed_collaborators].length}): #{report_list(details_report[:malformed_collaborators])}"
puts "  No Details data (#{details_report[:no_details].length}): #{report_list(details_report[:no_details])}"

if issues.empty?
  puts "PASS: no collection metadata or media-path issues found"
  exit 0
end

issues.sort_by { |issue| [issue.level == :error ? 0 : 1, issue.code, issue.message] }.each do |issue|
  puts "#{issue.level.to_s.upcase} [#{issue.code}] #{issue.message}"
end

errors = issues.count { |issue| issue.level == :error }
warnings = issues.count { |issue| issue.level == :warning }
puts "Summary: #{errors} error(s), #{warnings} warning(s)"
exit(errors.zero? ? 0 : 1)
