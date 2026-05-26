---
layout: project

title: Humanrobot
page_label: Humanrobot

permalink: /project/humanrobot/

order: 11

featured: true

categories:
  - branding
  - web

thumbnail: /img/jamus_marquette_human_robot_animation.gif

hero_type: media-rows

hero_container_class: container-fluid project-intro

hero_rows:

  - items:
      - col: col-md-16 mb-4 d-flex justify-content-center align-items-center
        image: /project/humanrobot/img/jamus_marquette_humanrobot_web_motion_branding_design_logo_animation.gif
        media_style: "max-width:300px;"


description:
  - >
    HUMANROBOT is a one-man tech team that offers product tech support—from product ideation, to implementation, and maintenance—to companies who have tech products, but do not have internal tech teams.

  - >
    The logo is a typographic wordmark referencing a human/robot figure, composed of a monospaced typeface referring to the code implemented in programming and software development.

  - >
    The website is an invitation to connect with HUMANROBOT and develop a personal yet business oriented relationship. In the form of a simple, single view platform, it highlights HUMANROBOT’s ability to simplify product into its necessities from the ground up, and features motion of the HUMANROBOT mark as one would type code, emphasizing the development of product through code, and the invitation to build a close, effective, and collaborative relationship.


media_rows:

  - items:
      - col: offset-lg-0 col-md-8 pb-4
        video: /project/humanrobot/video/jamus_marquette_humanrobot_text_animation.mp4
        media_class: video-content-video
        poster: /project/humanrobot/img/jamus_marquette_humanrobot_text_animation_poster.jpg

      - col: col-md-8 pb-4
        video: /project/humanrobot/video/jamus_marquette_humanrobot_website.mp4
        media_class: video-content-video
        poster: /project/humanrobot/img/jamus_marquette_humanrobot_web_poster.jpg


  - items:
      - col: col-md-8 pb-4
        image: /project/humanrobot/img/jamus_marquette_humanrobot_web_motion_branding_design7.jpg

      - col: col-md-8 pb-4
        image: /project/humanrobot/img/jamus_marquette_humanrobot_web_motion_branding_design_text_illustrations.gif


  - items:
      - col: col-md-8 pb-4
        image: /project/humanrobot/img/jamus_marquette_humanrobot_web_motion_branding_design8.jpg

      - col: col-md-8 pb-4
        image: /project/humanrobot/img/jamus_marquette_humanrobot_web_motion_branding_design11.jpg

      - col: col-md-8 pb-4 pb-md-0
        image: /project/humanrobot/img/jamus_marquette_humanrobot_web_motion_branding_design10.jpg

      - col: col-md-8
        image: /project/humanrobot/img/jamus_marquette_humanrobot_web_motion_branding_design9.jpg


---

{% include project/project-info.html %}

<div class="container-fluid mb-5" id="project">

    {% for row in page.media_rows %}

        {% include project/media-row.html row=row %}

    {% endfor %}

</div>