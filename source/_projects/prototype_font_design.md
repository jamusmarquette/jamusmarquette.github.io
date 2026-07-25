---
layout: project
title: 'Development Prototype Meridian Variable Typeface'
page_label: 'Prototype: Font Design'
permalink: /project/prototype-font-design/
order: 903
featured: false
prototype: true
prototype_kind: font-design
section_default: all
categories:
  - Font Design
thumbnail: /project/prototype-font-design/img/thumbnail.svg
hero_type: full-image
hero: /project/prototype-font-design/img/hero.svg
description:
  - 'Meridian is a fictional variable type family for editorial systems, public information, interfaces, and cultural institutions.'
status: In Development
version: 0.900 Beta
credits:
  - role: Type Design
    names:
      - Jamus Marquette
  - role: Specimen Design
    names:
      - Jamus Marquette
  - role: Technical Support
    names:
      - Inter Project Authors
links:
  - label: Variable Specimen
    url: /project/prototype-font-design/
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
    component: font-specimen
media_rows:
  - section: context
    caption:
      title: One voice across unlike reading conditions
      text: 'Editorial headlines, public information, interfaces, and environmental graphics require different optical conditions but often need to feel like one institution is speaking. Meridian is imagined for that tension between expression and durable reading.'
    items:
      - image: /project/prototype-font-design/img/references.svg
        alt: Fictional typographic context and references
        col: col-md-8
      - image: /project/prototype-font-design/img/sketching.svg
        alt: Fictional early typographic studies
        col: col-md-8
  - section: concept
    caption:
      title: Concept — measured warmth
      text: 'Meridian balances civic clarity with a human, slightly expansive rhythm. Its forms are designed to carry public information without becoming bureaucratic or anonymous.'
    items:
      - text: 'A public voice can be precise without becoming impersonal.'
        col: col-16
        text_class: case-study-concept-statement
  - section: structure
    caption:
      title: Glyph architecture follows the reading task
      text: 'Skeletons, proportions, contrast, terminals, and width relationships are selected because they support measured warmth at display and reading sizes—not as a chronological drawing archive.'
    items:
      - image: /project/prototype-font-design/img/construction-1.svg
        alt: Fictional letter construction study
        col: col-md-5
      - image: /project/prototype-font-design/img/construction-2.svg
        alt: Fictional proportion study
        col: col-md-6
      - image: /project/prototype-font-design/img/construction-3.svg
        alt: Fictional glyph architecture study
        col: col-md-5
  - section: structure
    caption:
      title: Masters as a structural plan
      text: 'Weight and optical-size masters are planned around transitions in reading conditions, so interpolation reinforces the family’s formal logic instead of merely filling a numerical range.'
    items:
      - image: /project/prototype-font-design/img/master-planning.svg
        alt: Fictional variable font master plan
        col: col-16
  - section: system
    caption:
      title: A family of repeatable rules
      text: 'Character construction, spacing, and metrics establish how Meridian repeats coherently across styles and languages.'
    items:
      - image: /project/prototype-font-design/img/character-system.svg
        alt: Fictional character system
        col: col-md-8
      - image: /project/prototype-font-design/img/spacing-system.svg
        alt: Fictional spacing system
        col: col-md-8
  - section: system
    caption:
      title: Axes, features, and instances
      text: 'The family architecture documents weight and optical-size logic alongside numerals, punctuation, alternates, naming, and OpenType behavior.'
    items:
      - image: /project/prototype-font-design/img/axis-system.svg
        alt: Fictional axis architecture
        col: col-16
      - image: /project/prototype-font-design/img/numerals.svg
        alt: Fictional numeral system
        col: col-md-5
      - image: /project/prototype-font-design/img/punctuation.svg
        alt: Fictional punctuation system
        col: col-md-6
      - image: /project/prototype-font-design/img/opentype.svg
        alt: Fictional OpenType feature system
        col: col-md-5
  - section: in-use
    caption:
      title: Interactive specimen — technical stand-in
      text: 'Inter Variable is loaded locally only to test the portfolio’s specimen controls. The fictional Meridian family described here has not been drawn; this interface does not claim Inter as JAMUS work.'
    items:
      - image: /project/prototype-font-design/img/use-editorial.svg
        alt: Fictional editorial type application
        col: col-md-8
      - image: /project/prototype-font-design/img/use-interface.svg
        alt: Fictional interface type application
        col: col-md-8
  - section: in-use
    caption:
      title: A family in varied conditions
      text: 'Display, signage, responsive, and editorial examples show the kind of practical contexts a finished family would need to support.'
    items:
      - image: /project/prototype-font-design/img/use-poster.svg
        alt: Fictional display typography application
        col: col-md-5
      - image: /project/prototype-font-design/img/use-signage.svg
        alt: Fictional signage application
        col: col-md-6
      - image: /project/prototype-font-design/img/use-responsive.svg
        alt: Fictional responsive typography application
        col: col-md-5
---

<div id="project" class="prototype-project font-prototype mb-5">
  {% include project/sectioned-media.html %}
</div>

<script src="{{ '/js/font-prototype-specimen.js' | relative_url }}" defer></script>
