#!/usr/bin/env ruby
# Run on macOS after adding/changing project media; generated data is committed for GitHub Pages.
require 'yaml'
require 'json'
require 'base64'
require 'tmpdir'
require 'open3'
require 'digest'
root = File.expand_path('..', __dir__)
output = File.join(root, 'source/_data/image_previews.json')
previous = File.exist?(output) ? JSON.parse(File.read(output)) : {}
paths = []
collect = lambda do |value|
  case value
  when Hash
    value.each do |key, child|
      paths << child if %w[thumbnail featured_thumbnail hero hero_left hero_right image poster video].include?(key) && child.is_a?(String)
      collect.call(child)
    end
  when Array then value.each { |child| collect.call(child) }
  end
end
Dir.glob(File.join(root, 'source/_projects/*')).each do |file|
  yaml = File.read(file)[/\A---\s*\n(.*?)\n---/m, 1]
  collect.call(YAML.safe_load(yaml)) if yaml
end
result = {}
Dir.mktmpdir do |dir|
  paths.uniq.sort.each do |path|
    file = File.join(root, 'source', path.sub(%r{\A/}, ''))
    next unless File.file?(file)
    digest = Digest::SHA256.file(file).hexdigest
    if previous.dig(path, 'digest') == digest
      result[path] = previous[path]
      next
    end
    preview = File.join(dir, 'preview.png')
    if File.extname(file).downcase == '.mp4'
      info, status = Open3.capture2('ffprobe', '-v', 'error', '-select_streams', 'v:0',
        '-show_entries', 'stream=width,height', '-of', 'json', file)
      raise "Video metadata failed: #{path}" unless status.success?
      dimensions = JSON.parse(info).fetch('streams').first
      width, height = dimensions.fetch('width'), dimensions.fetch('height')
      _, status = Open3.capture2('ffmpeg', '-hide_banner', '-loglevel', 'error', '-y',
        '-i', file, '-frames:v', '1', '-vf', 'scale=24:24:force_original_aspect_ratio=decrease', preview)
    else
      info, status = Open3.capture2('sips', '-g', 'pixelWidth', '-g', 'pixelHeight', file)
      width = info[/pixelWidth: (\d+)/, 1].to_i
      height = info[/pixelHeight: (\d+)/, 1].to_i
      next unless status.success? && width > 0 && height > 0
      _, status = Open3.capture2('sips', '-s', 'format', 'png', '-Z', '24', file, '--out', preview)
    end
    raise "Preview failed: #{path}" unless status.success?
    result[path] = { 'width' => width, 'height' => height, 'digest' => digest,
      'src' => 'data:image/png;base64,' + Base64.strict_encode64(File.binread(preview)) }
  end
end
File.write(output, JSON.pretty_generate(result) + "\n")
puts "Generated #{result.size} image previews"
