---
layout: project
title: "DEVELOPMENT REFERENCE — Portfolio Case Study Framework"
page_label: "Case Study Framework"
permalink: /project/case-study-framework/
order: 904
featured: false
prototype: true
section_default: all
thumbnail: /project/case-study-framework/img/thumbnail.svg
description:
  - "A reference page showing what belongs in a JAMUS project introduction and each conceptual section. This is a development reference, not client work or a portfolio project."
project_facts:
  - label: Purpose
    value: Authoring reference for future case studies
  - label: Method
    value: Project introduction → Context → Concept → Structure → System → In Use
  - label: Status
    value: Development reference — not portfolio work
  - label: Central logic
    value: Ideas become structures. Structures become systems. Systems become experiences.
introduction_guidance:
  - type: purpose
    label: Purpose
    text: "Orient the visitor before the conceptual narrative begins. The introduction answers: What is this project? Treat it like the cover of a book, not a selectable chapter."
  - type: questions
    label: Questions to answer
    text: "What is it? Who is it for? What was the role, year, team, status, and relevant scope?"
  - type: examples
    label: Content that belongs here
    text: "Hero, concise summary, client, role, team, tools, technologies, links, and compact credit information."
  - type: avoid
    label: Does not belong here
    text: "A conceptual essay, a process chronology, or a gallery of final applications."
  - type: review-question
    label: Review question
    text: "Could a visitor identify the project before choosing a section?"
sections:
  - id: context
    label: Context
    guidance:
      - type: purpose
        label: Purpose
        text: "Explain the situation that made the project necessary before revealing the solution."
      - type: questions
        label: Questions to answer
        text: "Why did it exist? Who needed it? What opportunity, limitation, workflow, or public condition mattered?"
      - type: examples
        label: Discipline-specific examples
        text: "Audience needs, cultural history, content inventory, reading conditions, technical constraints, or existing service friction."
      - type: avoid
        label: Does not belong here
        text: "A list of activities such as interviews, wireframes, or workshops without explaining what they revealed."
      - type: review-question
        label: Review question
        text: "Does this section make the project’s need clear without describing the complete answer?"
  - id: concept
    label: Concept
    guidance:
      - type: purpose
        label: Purpose
        text: "State the governing insight that makes the major design decisions necessary rather than decorative."
      - type: questions
        label: Questions to answer
        text: "What truth changed the direction? What idea can govern hierarchy, behavior, form, and use?"
      - type: examples
        label: Strong versus weak language
        text: "Weak: make it modern. Strong: orientation is confidence about the next useful step. A concept is a decision rule, not a style preference."
      - type: avoid
        label: Does not belong here
        text: "Generic goals such as engaging, cohesive, innovative, or modern without a specific consequence."
      - type: review-question
        label: Review question
        text: "Could Structure and System be explained as consequences of this statement?"
  - id: structure
    label: Structure
    guidance:
      - type: purpose
        label: Purpose
        text: "Show how the concept determined organization and form. Structure is not a chronological archive."
      - type: questions
        label: Questions to answer
        text: "Why this hierarchy, navigation, layout, flow, construction, pacing, or proportion?"
      - type: examples
        label: Discipline-specific examples
        text: "Information architecture, user flow, editorial grid, letter skeleton, layout exploration, wayfinding plan, or story model."
      - type: avoid
        label: Does not belong here
        text: "Reusable component rules or polished applications unless they explain the structural decision itself."
      - type: review-question
        label: Review question
        text: "Does every artifact demonstrate why the work took this form?"
  - id: system
    label: System
    guidance:
      - type: purpose
        label: Purpose
        text: "Explain how the structure becomes coherent, repeatable, and scalable."
      - type: questions
        label: Questions to answer
        text: "What rules repeat? What components, tokens, metrics, behaviors, or visual languages maintain consistency?"
      - type: examples
        label: Discipline-specific examples
        text: "Product states and tokens; identity typography and color; editorial rhythm; type-family axes and features; exhibit modules and visitor flow."
      - type: avoid
        label: Does not belong here
        text: "A moodboard or a sequence of isolated final images without explaining the rules connecting them."
      - type: review-question
        label: Review question
        text: "Could another person extend this work without inventing a new visual language?"
  - id: in-use
    label: In Use
    guidance:
      - type: purpose
        label: Purpose
        text: "Let the visitor experience the finished system operating in realistic situations."
      - type: questions
        label: Questions to answer
        text: "What does it do? How do people encounter it? How does it behave across contexts, states, or scales?"
      - type: examples
        label: Discipline-specific examples
        text: "Final interfaces and motion, an interactive type specimen, printed spreads, signage, packaging, installed exhibits, or live prototypes."
      - type: avoid
        label: Does not belong here
        text: "A final-image gallery disconnected from the experience it is meant to support."
      - type: review-question
        label: Review question
        text: "Can a visitor understand how the system performs rather than merely how it looks?"
introduction_rows:
  - caption:
      title: A factual introduction before the conceptual narrative
      text: "Project introduction → Context → Concept → Structure → System → In Use. The introduction is always part of All Sections, but it is not a selectable section."
    items:
      - text: "Ideas become structures. Structures become systems. Systems become experiences. This project was not designed this way because it looked good. It was designed this way because the concept demanded it."
        col: col-16
        text_class: case-study-concept-statement
---

<div id="project" class="prototype-project case-study-framework mb-5">
  {% include project/sectioned-media.html %}
</div>
