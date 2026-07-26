---
layout: project

title: Laureate Summit
page_label: Laureate Summit

permalink: /project/here_for_good/

order: 4

featured: true

categories:
  - Identity & Branding
  - Environmental & Exhibit Design

thumbnail: /img/jamus_marquette_laureate_summit_logo.png

hero_type: media-rows

hero_container_class: container-fluid project-intro

hero_rows:

  - row_class: row project-intro-paragraph
    items:
      - col: offset-lg-1 col-lg-14 mb-0 mb-lg-5
        video: /project/here_for_good/video/here_for_good_animation.mp4
        media_class: video-content-video
        media_style: "display:block; max-height: 75vh !important; height: 100%;"
        poster: /project/here_for_good/img/here_for_good_animation.jpg


description:
  - >
    Here for Good is an initiative of Laureate International University (LIU) that partners with the Clinton Global Initiative and the International Youth Foundation with a strong focus on developing the next generation of global leaders.

  - >
    The dot symbol, representative of a point on the map, is the center of an identity system created to communicate Here for Good’s message of unity in a visual language that could easily be adapted by LIU’s network of 70 institutions of higher education around the world.

  - >
    A wide range of event graphics and collateral were developed for the annual summit in Orlando, FL, where the new identity system was unveiled. Here for Good continues to be a key initiative throughout Laureate’s network of schools.


credits_title: Collaborators

credits:
  - role: Project Lead
    name: Civic Entertainment Group

  - role: Creative Direction
    name: "Sam Eckersley, Stuart Rogers"

  - role: Designed at
    name: RED Partners


media_rows:

  - items:
      - col: offset-lg-2 col-lg-12 col-md-16 mb-4 mb-lg-6
        image: /project/here_for_good/img/jamus_marquette_laureate_summit_brand_clinton.jpg


  - items:
      - col: offset-lg-2 col-lg-12 col-md-16 mb-4 mb-lg-6
        image: /project/here_for_good/img/jamus_marquette_laureate_summit_brand_slide.jpg


  - items:
      - col: offset-lg-2 col-lg-12 col-md-16 mb-4 mb-lg-6
        image: /project/here_for_good/img/jamus_marquette_laureate_summit_brand_stage_01.jpg


  - items:
      - col: offset-lg-2 col-lg-12 col-md-16 mb-4 mb-lg-6
        image: /project/here_for_good/img/jamus_marquette_laureate_summit_brand_book_2026.png


  - items:
      - col: offset-lg-2 col-lg-12 col-md-16
        image: /project/here_for_good/img/jamus_marquette_laureate_summit_brand_stage_02.jpg


---

{% include project/project-info.html %}

<div class="container-fluid mb-5" id="project">

    {% for row in page.media_rows %}

        {% include project/media-row.html row=row %}

    {% endfor %}

</div>
