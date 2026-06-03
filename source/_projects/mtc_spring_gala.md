---
layout: project

title: MTC Spring Gala
page_label: MTC Spring Gala

permalink: /project/mtc_spring_gala/

order: 13

featured: true

categories:
  - Editorial & Publications
  - Environmentals & Interactives

thumbnail: /img/jamus_marquette_mtc_spring_gala_invite.gif

hero_type: media-rows

hero_container_class: container-fluid project-intro nomargin full-width topmargin mb-0 mb-md-5

hero_rows:

  - items:
      - col: offset-lg-2 col-lg-12 mb-4
        video: /project/mtc_spring_gala/video/jamus_marquette_mtc_animation.mp4
        media_class: video-content-video
        media_style: "display:block;"
        poster: /project/mtc_spring_gala/img/jamus_marquette_mtc_poster_image_2021.gif


description:
  - >
    MTC’s Spring Gala is a long running annual event that is a highlight of the spring social season. It includes a cocktail reception, elegant seated dinner, and a one-night-only show featuring exciting performances from the season’s biggest Broadway hits.

  - >
    This invitation features organic linear figures representing both the formality of Manhattan Theatre Club's Spring Gala, and the season of Spring.


credits_title: Collaborators

credits:
  - role: Art Direction
    name: "Sam Eckersley, Stuart Rogers"

  - role: Designed at
    name: RED Partners


media_rows:

  - items:
      - col: col-16 mb-4
        image: /project/mtc_spring_gala/img/02_jamus_marquette_MTC_manhattan_theatre_club_spring_gala_invite.jpg


  - items:
      - col: col-16 mb-4
        image: /project/mtc_spring_gala/img/03_jamus_marquette_MTC_manhattan_theatre_club_spring_gala_invite.jpg


  - row_class: row mb-5
    items:
      - col: col-16
        image: /project/mtc_spring_gala/img/04_jamus_marquette_MTC_manhattan_theatre_club_spring_gala_invite.jpg


---

{% include project/project-info.html %}

<div class="container-fluid mb-5" id="project">

    {% for row in page.media_rows %}

        {% include project/media-row.html row=row %}

    {% endfor %}

</div>