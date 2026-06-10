---
layout: project

title: Jonathan Children's Trust
page_label: Jonathan Children's Trust

permalink: /project/jonathan_childrens_trust/

order: 6

featured: true

categories:
  - Identity & Branding
  - Websites

thumbnail: /img/jamus_marquette_jonathan_childrens_trust.gif

hero_type: media-rows

hero_container_class: container-fluid project-intro

hero_rows:
  - items:
      - col: col-16
        video: /project/jonathan_childrens_trust/video/jamus_marquette_jct_logo_animation_2026.mp4

description:
  - >
    Jonathan Children’s Trust is a nonprofit organization in Zimbabwe that creates new direction, new opportunities, and new perspectives for vulnerable children and families in need through love in the form of education and provision of daily human needs.

  - >
    This identity features a symbol representing a sun composed of a heart symbolic of the love which JCT is centered on, and radial arrows symbolic of the love reaching outward creating new opportunities that would otherwise not exist for those limited by poverty.

  - >
    Also featured is a unique pattern composed of love and new opportunities to expand the brand, intended for use with uplifting media highlighting the children and families whose lives are being redirected through love.

credits_title: Collaborators

credits:
  - role: Art Direction
    name: Adriana Marquette

  - role: 'Photography, Video'
    name: Rudo Mudzi

media_rows:
  - items:
      - col: col-md-16 pb-4
        video: /project/jonathan_childrens_trust/video/jamus_marquette_jonathan_childrens_trust_pattern_video_lr.mp4
        media_class: video-content-video
        poster: /project/jonathan_childrens_trust/img/jamus_marquette_jonathan_childrens_trust_pattern_video_poster.jpg

  - items:
      - col: col-md-16 pb-4
        video: /project/jonathan_childrens_trust/video/jamus_marquette_jonathan_childrens_trust.mp4
        media_class: video-content-video

  - items:
      - col: col-md-16 pb-4
        image: /project/jonathan_childrens_trust/img/jamus_marquette_jonathan_childrens_trust_diagram.jpg

  - items:
      - col: col-md-16 mb-4
        image: /project/jonathan_childrens_trust/img/jamus_marquette_jonathan_childrens_trust2.jpg

  - items:
      - col: col-md-16 mb-4
        image: /project/jonathan_childrens_trust/img/jamus_marquette_jonathan_childrens_trust6.jpg

  - items:
      - col: col-md-16 mb-4
        image: /project/jonathan_childrens_trust/img/jamus_marquette_jonathan_childrens_trust4.jpg

  - items:
      - col: col-md-16
        image: /project/jonathan_childrens_trust/img/jamus_marquette_jonathan_childrens_trust5.jpg
---

{% include project/project-info.html %}

<div class="container-fluid mb-5" id="project">

    {% for row in page.media_rows %}

        {% include project/media-row.html row=row %}

    {% endfor %}

</div>
