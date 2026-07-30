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
  - "The project opening is Overview: it identifies what the project is and why it exists before Concept, Development, System, and In Use explain the work in more detail."
status: Development reference — not client work
credits:
  - role: Framework Author
    names:
      - Jamus Marquette
sections:
  - id: concept
    label: Concept
    status: complete
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
        text: "Could Development and System be explained as consequences of this statement?"
  - id: development
    label: Development
    status: complete
    placeholder_example: true
    guidance:
      - type: purpose
        label: Purpose
        text: "Show the research, constraints, exploration, iteration, prototyping, testing, and refinement that led toward the solution."
      - type: questions
        label: Questions to answer
        text: "What did research, discovery, constraints, experimentation, or testing reveal? How did the work evolve?"
      - type: examples
        label: Discipline-specific examples
        text: "Research synthesis, sketches, alternative directions, user flows, letter studies, prototypes, material tests, or refinement studies."
      - type: avoid
        label: Does not belong here
        text: "Only polished final applications or reusable rules without showing the process that produced them."
      - type: review-question
        label: Review question
        text: "Does every artifact reveal how the project took shape?"
  - id: system
    label: System
    status: complete
    guidance:
      - type: purpose
        label: Purpose
        text: "Explain how typography, layout, motion, color, imagery, interaction, materials, grids, and components express and reinforce the concept."
      - type: questions
        label: Questions to answer
        text: "How do the formal choices support the concept? What repeatable rules, components, behaviors, or visual languages make that expression coherent?"
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
    status: complete
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
---

<div id="project" class="prototype-project case-study-framework mb-5">
  {% include project/sectioned-media.html %}
</div>
