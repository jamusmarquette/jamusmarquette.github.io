---
layout: project

title: + Illustrations
page_label: + Illustrations

permalink: /project/illustrations/

order: 12

featured: true

categories:
  - personal
  - illustration

thumbnail: /img/00_jamus_marquette_jamus_and_adriana_tshirt_illustrations.gif

description:
  - >
    Conceptually driven illustrations and animations influenced by biblical principles and stories.

  - >
    Each of these works were created considering the historical, grammatical, and literary context of each source of influence in an effort to communicate originally intended meanings without bias while also developing a cohesive visually appealing graphic style of illustration and animation for creative, conceptually driven thinkers.


media_rows:

  - items:
      - col: col-md-4 mb-4
        image: /project/illustrations/img/love_cross.gif

      - col: col-md-4 mb-4
        image: /project/illustrations/img/love_hands.gif

      - col: col-md-4 mb-4
        video: /project/illustrations/video/wresting_with_god.mp4
        media_class: video-content-video
        media_style: "display:block;"
        poster: /project/illustrations/img/wresting_with_god_animation_poster.gif

      - col: col-md-4 mb-4
        video: /project/illustrations/video/jamus_marquette_animation_eat.mp4
        media_class: video-content-video
        media_style: "display:block;"
        poster: /project/illustrations/img/jamus_marquette_eat_animation.gif


  - items:
      - col: col-md-8 mb-4
        image: /project/illustrations/img/01_jamus_marquette_jamus_and_adriana_tshirt_illustrations.gif

      - col: col-md-8 mb-4
        image: /project/illustrations/img/04_jamus_marquette_jamus_and_adriana_tshirt_illustrations.gif


  - items:
      - col: col-md-8 mb-4
        image: /project/illustrations/img/03_jamus_marquette_jamus_and_adriana_tshirt_illustrations.gif

      - col: col-md-8 mb-4
        image: /project/illustrations/img/02_jamus_marquette_jamus_and_adriana_tshirt_illustrations.gif


  - items:
      - col: col-md-8 mb-4
        image: /project/illustrations/img/08_jamus_marquette_jamus_and_adriana_tshirt_illustrations.gif

      - col: col-md-8 mb-4
        image: /project/illustrations/img/06_jamus_marquette_jamus_and_adriana_tshirt_illustrations.gif


  - items:
      - col: col-md-8 mb-4 mb-md-0
        image: /project/illustrations/img/07_jamus_marquette_jamus_and_adriana_tshirt_illustrations.gif

      - col: col-md-8
        image: /project/illustrations/img/05_jamus_marquette_jamus_and_adriana_tshirt_illustrations.gif


---

{% include project/project-info.html %}

<div class="container-fluid mb-5" id="project">

    {% for row in page.media_rows %}

        {% include project/media-row.html row=row %}

    {% endfor %}

</div>