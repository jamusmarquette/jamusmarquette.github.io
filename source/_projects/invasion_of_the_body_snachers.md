---
layout: project

title: Invasion of The Body Snatchers
page_label: Invasion of The Body Snatchers

permalink: /project/invasion_of_the_body_snachers/

order: 9

featured: true

categories:
  - Editorial & Publications

thumbnail: /img/jamus_marquette_invasion_of_the_body_snatchers_by_jack_finn_book_cover_design.jpg

hero_type: media-rows

hero_container_class: container-fluid nomargin mb-5 topmargin

hero_rows:

  - items:
      - col: col-16 mb-4
        image: /project/invasion_of_the_body_snachers/img/jamus_marquette_invasion_of_the_body_snachers_book_cover_layout.jpg


description:
  - >
    <em>Invasion of The Body Snatchers</em> is a story so unreal, so far-fetched, that if printed in the newspaper—even a reputable one—we would dismiss it as a lie, a distortion, an exaggeration, a simple error of judgment, a hoax.

  - >
    This book cover design, aimed towards those who are intrigued by strange questionable occurrences, features a photograph that subtly suggests that something invasive has infiltrated the small town of Mill Valley, and a newspaper-like style, as though this story is one of those same nonsensical stories that we would naturally dismiss as a hoax.


media_rows:

  - items:
      - col: col-16
        image: /project/invasion_of_the_body_snachers/img/jamus_marquette_invasion_of_the_body_snachers_book_cover.jpg


---

{% include project/project-info.html %}

<div class="container-fluid mb-5" id="project">

    {% for row in page.media_rows %}

        {% include project/media-row.html row=row %}

    {% endfor %}

</div>
