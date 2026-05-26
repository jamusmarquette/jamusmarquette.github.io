---
layout: project

title: NFLPA Branding
page_label: NFLPA Branding

permalink: /project/nflpa/

order: 14

featured: true

categories:
  - branding
  - motion

thumbnail: /img/jamus_marquette_nflpa_ribbon_animation.gif

hero_type: media-rows

hero_container_class: container-fluid topmargin
hero_container_style: "background-color: #121114;"

hero_rows:

  - items:
      - col: offset-lg-2 col-lg-12 col-md-16
        image: /project/nflpa/img/01_jamus_marquette_nflpa_logos.jpg


description:
  - >
    The National Football League Players Association (NFLPA) is the union for professional football players in the National Football League.

  - >
    The <em>NFLPA</em> hosts a variety of unique events that keep football heroes in the spotlight while off the field. As an extension of the NFLPA’s brand, a cohesive system of medal-inspired identities was created to uniquely identify each type of event.


credits_title: Collaborators

credits:
  - role: Art Direction
    name: "Sam Eckersley, Stuart Rogers"

  - role: Designed at
    name: RED Partners


media_rows:

  - items:
      - col: offset-lg-0 col-lg-4 mb-4 col-md-8
        video: /project/nflpa/video/jamus_marquette_nflpa_hero.mp4
        media_class: video-content-video
        controls: true

      - col: col-lg-4 mb-4 col-md-8
        video: /project/nflpa/video/jamus_marquette_nflpa_tv_lines.mp4
        media_class: video-content-video
        controls: true

      - col: offset-lg-0 col-lg-4 mb-4 col-md-8
        video: /project/nflpa/video/jamus_marquette_nflpa_tv_ribbon.mp4
        media_class: video-content-video
        controls: true

      - col: col-lg-4 mb-4 col-md-8
        video: /project/nflpa/video/jamus_marquette_nflpa_tv_shape_soundedit.mp4
        media_class: video-content-video
        controls: true


  - items:
      - col: col-lg-8 pb-4
        image: /project/nflpa/img/03_jamus_marquette_nflpa_logo_branding_on_tshirt.jpg

      - col: offset-lg-0 col-lg-8 pb-4
        image: /project/nflpa/img/04_jamus_marquette_nflpa_rookie_logo_football_player.jpg

      - col: offset-lg-0 col-lg-8 pb-4
        image: /project/nflpa/img/05_jamus_marquette_nflpa_logo_live.jpg

      - col: offset-lg-0 col-lg-8 pb-4
        image: /project/nflpa/img/06_jamus_marquette_nflpa_rookie_logo_on_football_player.jpg


  - items:
      - col: offset-lg-0 col-lg-8 pb-4 pb-md-0
        image: /project/nflpa/img/06_jamus_marquette_nflpa_rookie_logo_on_football_players.jpg

      - col: col-lg-8
        image: /project/nflpa/img/08_jamus_marquette_nflpa_rookie_logo_on_football_helmet.jpeg


---

{% include project/project-info.html %}

<div class="container-fluid mb-5" id="project">

    {% for row in page.media_rows %}

        {% include project/media-row.html row=row %}

    {% endfor %}

</div>