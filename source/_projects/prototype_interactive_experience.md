---
layout: project
title: 'Development Prototype Fieldguide Interactive Experience'
page_label: 'Prototype: Interactive Experience'
permalink: /project/prototype-interactive-experience/
order: 902
featured: false
prototype: true
section_default: all
categories:
  - Websites
thumbnail: /project/prototype-interactive-experience/img/thumbnail.svg
hero_type: full-image
hero: /project/prototype-interactive-experience/img/hero.svg
description:
  - 'Fieldguide is a fictional museum companion that helps visitors choose, understand, and remember routes through a changing collection.'
status: Development prototype — fictional content
version: 0.047
client: Fieldguide Museum (fictional)
credits:
  - role: Product Strategy and Experience Design
    names:
      - Jamus Marquette
  - role: Exhibition Content Collaboration
    names:
      - Fictional Fieldguide project team
links:
  - label: Interactive Prototype
    url: /project/prototype-interactive-experience/
sections:
  - id: context
    label: Context
  - id: concept
    label: Concept
  - id: structure
    label: Structure
  - id: system
    label: System
  - id: in-use
    label: In Use
media_rows:
  - section: context
    caption:
      title: Visitors arrive with different questions
      text: 'A changing exhibition schedule, limited connectivity, multilingual content, and short attention windows made a single linear guide ineffective. Visitors needed confidence to choose a route before they needed more content.'
    items:
      - image: /project/prototype-interactive-experience/img/research.svg
        alt: Fictional visitor needs and research synthesis
        col: col-md-10
      - image: /project/prototype-interactive-experience/img/requirements.svg
        alt: Fictional product constraints and requirements
        col: col-md-6
  - section: concept
    caption:
      title: Concept — give every visitor a useful next step
      text: 'Fieldguide turns a large collection into a sequence of confident choices. Instead of asking visitors to understand the whole museum, each moment offers a meaningful next destination, object, or story.'
    items:
      - text: 'Orientation is not a map of everything; it is confidence about what to do next.'
        col: col-16
        text_class: case-study-concept-statement
  - section: structure
    caption:
      title: A collection organized around decisions
      text: 'The information architecture groups collection content around routes, objects, and saved moments. Its hierarchy follows the concept: choose a direction, understand a place, then keep a thread for later.'
    items:
      - image: /project/prototype-interactive-experience/img/information-architecture.svg
        alt: Fictional Fieldguide information architecture
        col: col-16
  - section: structure
    caption:
      title: The primary route sequence
      text: 'The core flow moves from arrival to route selection, object discovery, saving, and sharing. These wireframes show the structural decisions that make each next step visible.'
    items:
      - image: /project/prototype-interactive-experience/img/user-flow.svg
        alt: Fictional primary visitor flow
        col: col-16
      - image: /project/prototype-interactive-experience/img/wireframe-1.svg
        alt: Fictional route-selection wireframe
        col: col-md-5
      - image: /project/prototype-interactive-experience/img/wireframe-2.svg
        alt: Fictional object-detail wireframe
        col: col-md-6
      - image: /project/prototype-interactive-experience/img/wireframe-3.svg
        alt: Fictional saved-route wireframe
        col: col-md-5
  - section: system
    caption:
      title: Components that preserve orientation
      text: 'Component anatomy, navigation states, typography, and tokens make the same decision model repeat across routes, object pages, and shared-display contexts.'
    items:
      - image: /project/prototype-interactive-experience/img/components.svg
        alt: Fictional interface component system
        col: col-md-8
      - image: /project/prototype-interactive-experience/img/interface-tokens.svg
        alt: Fictional interface tokens
        col: col-md-8
  - section: system
    caption:
      title: Accessible, responsive behavior
      text: 'Focus order, contrast, touch targets, reduced motion, and responsive states keep the next step legible across devices and visitor abilities.'
    items:
      - image: /project/prototype-interactive-experience/img/accessibility-responsive.svg
        alt: Fictional accessibility and responsive system
        col: col-16
  - section: in-use
    caption:
      title: The guide during a visit
      text: 'The final interface demonstrates realistic route decisions, object discovery, and saved moments rather than isolated screens.'
    items:
      - image: /project/prototype-interactive-experience/img/final-screen-1.svg
        alt: Fictional final home screen
        col: col-md-5
      - image: /project/prototype-interactive-experience/img/final-screen-2.svg
        alt: Fictional final route screen
        col: col-md-6
      - image: /project/prototype-interactive-experience/img/final-screen-3.svg
        alt: Fictional final object screen
        col: col-md-5
  - section: in-use
    caption:
      title: Personal and shared contexts
      text: 'The experience moves between a visitor’s phone and an onsite shared display without losing the route or the next useful action.'
    items:
      - image: /project/prototype-interactive-experience/img/installation.svg
        alt: Fictional Fieldguide installation context
        col: col-16
---

<div id="project" class="prototype-project mb-5">
  {% include project/sectioned-media.html %}
</div>
