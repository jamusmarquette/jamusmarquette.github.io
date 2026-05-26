---
layout: project

title: The Strokes - Is This It?
page_label: The Strokes - Is This It?

permalink: /project/the_strokes/

order: 15

featured: true

categories:
  - album-art

thumbnail: /img/the_strokes_is_this_it_album_artwork.gif

hero_type: split-image

hero_left: /project/the_strokes/img/jamus_marquette_the_strokes_package_closed.jpg

hero_right: /project/the_strokes/img/jamus_marquette_the_strokes_package_opened.jpg

description:
  - >
    CD packaging for the album <em>Is this it?</em>, by The Strokes. It is packaged in a 45 record jacket, referencing the albums similarity to pre-1977 rock.<br><br> Contained inside is the CD and a poster featuring the lyrics jotted down in a notebook as though originally composed in the midst of journaling about life and relationships. Its gritty style references the albums sound which is similar to the works of 1970s garage rock bands, and its repetitive layout references its simple metronomic rhythm.


media_rows:

  - items:
      - col: col-md-16
        image: /project/the_strokes/img/the-strokes_poster_back_flat.jpg


---

{% include project/project-info.html %}

<div class="container-fluid mb-5" id="project">

    {% for row in page.media_rows %}

        {% include project/media-row.html row=row %}

    {% endfor %}

</div>