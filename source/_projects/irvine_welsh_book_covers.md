---
layout: project

title: Irvine Welsh
page_label: Irvine Welsh

permalink: /project/irvine_welsh_book_covers/

order: 3

featured: true

categories:
  - Book Covers

thumbnail: /img/jamus_marquette_irvine_welsh_covers_animation.gif

hero_type: media-rows

hero_container_class: container-fluid topmargin

hero_rows:

  - items:
      - col: offset-lg-2 col-lg-12 mb-4
        image: /project/irvine_welsh_book_covers/img/jamus_marquette_irvine_welsh_if_you_liked_school_youll_love_work_book_cover_designs_wide.jpg


description:
  - >
    A series of book covers for Irvine Welshe’s <span class="fst-italic">If You Like School, You’ll Love Work</span>. Each cover is accompanied by a front flap fold to reveal more about each story.

  - >
    Selected for Publication in <span class="fst-italic">CMYK Magazine’s Call For Aspiring Creatives #43</span>.


credits_title: Collaborators

credits:
  - role: Art Direction
    name: "Kevin Brainard, Darren Cox"


media_rows:

  - items:
      - col: offset-lg-2 col-lg-12 mb-4
        image: /project/irvine_welsh_book_covers/img/jamus_marquette_irvine_welsh_if_you_liked_school_youll_love_work_book_cover_design.jpg


  - items:
      - col: offset-lg-2 col-lg-12 mb-4
        image: /project/irvine_welsh_book_covers/img/jamus_marquette_irvine_welsh_kingdom_of_fife_book_cover_design.jpg


  - items:
      - col: offset-lg-2 col-lg-12 mb-4
        image: /project/irvine_welsh_book_covers/img/jamus_marquette_irvine_welsh_the_dogs_of_lincoln_park_book_cover_design.jpg


  - items:
      - col: offset-lg-2 col-lg-12
        image: /project/irvine_welsh_book_covers/img/jamus_marquette_irvine_welsh_miss_arizona_book_cover_design.jpg


---

{% include project/project-info.html %}

<div class="container-fluid mb-5" id="project">

    {% for row in page.media_rows %}

        {% include project/media-row.html row=row %}

    {% endfor %}

</div>