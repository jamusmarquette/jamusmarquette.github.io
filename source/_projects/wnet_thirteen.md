---
layout: project

title: PBS’ THIRTEEN
page_label: PBS’ THIRTEEN

permalink: /project/wnet_thirteen/

order: 8

featured: true

categories:
  - Editorial & Publications

thumbnail: /img/jamus_marquette_wnet_thirteen_covers.jpg

hero_type: media-rows

hero_container_class: container-fluid nomargin full-width topmargin

hero_rows:
  - items:
      - col: col-16
        video: /project/wnet_thirteen/img/jamus_marquette_wnet_thirteen_covers.mp4
        media_class: full-width-img

description:
  - >
    PBS’ station THIRTEEN is one of America’s most respected and innovative public media providers. Reaching millions of people with programming that celebrates culture and education it is the most-watched public television channel in the nation.

  - >
    Unique cover designs and interior layouts highlighting monthly features for PBS’ monthly print and digital guide were created on a monthly basis to attract and inform patrons about upcoming programming and insightful articles.

credits_title: Collaborators

credits:
  - role: Art Direction
    name: 'Sam Eckersley, Stuart Rogers'

  - role: Guide Editor
    name: Elisa Lichtenbaum

  - role: Designed at
    name: RED Partners

media_rows:
  - items:
      - col: col-16 mb-4
        image: /project/wnet_thirteen/img/jamus_marquette_wnet_pbs_thirteen_guide_and_covers_education_issue_and_carousel.jpg

  - items:
      - col: col-16 mb-4
        image: /project/wnet_thirteen/img/jamus_marquette_wnet_pbs_thirteen_guide_and_covers_thank_you_cake_and_annie.jpg

  - items:
      - col: col-16 mb-4
        image: /project/wnet_thirteen/img/jamus_marquette_wnet_pbs_thirteen_guide_and_covers_education_meets_broadway_and_new_york_state_of_mind.jpg

  - items:
      - col: col-16
        image: /project/wnet_thirteen/img/jamus_marquette_wnet_pbs_thirteen_guide_and_covers_women_war_and_peace_cover_and_911_american_flag.jpg
---

{% include project/project-info.html %}

<div class="container-fluid mb-5" id="project">

    {% for row in page.media_rows %}

        {% include project/media-row.html row=row %}

    {% endfor %}

</div>
