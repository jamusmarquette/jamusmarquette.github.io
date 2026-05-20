(function ($) {

    $("#about").css("pointer-events", "none");

    let scrollMemory = null;

    function isScrolledIntoView(elem) {

        var $elem = $(elem);
        var $window = $(window);

        var docViewTop = $window.scrollTop();
        var docViewBottom = docViewTop + $window.height();

        var elemTop = $elem.offset().top;
        var elemBottom = elemTop + $elem.height();

        return elemTop <= docViewBottom && elemBottom >= docViewTop;

    }

    function showinfo() {

        console.log("SHOWINFO RUNNING");

        scrollMemory = $(window).scrollTop();

        $("html, body").scrollTop($("#about").offset().top);

        $("#about").css("display", "block");
        $("#about").css("opacity", "1");
        $("#about").css("pointer-events", "auto");

        $("#content").css("opacity", "0");
        $("#content").css("display", "none");

        $("#work").css("display", "none");
        $("#project").css("display", "none");
        $(".infohide").css("display", "none");
        $("#topgradient").css("display", "none");

    }

    function hideinfo() {

        console.log("HIDEINFO RUNNING");

        $("html, body").scrollTop(scrollMemory);

        $("#content").css("opacity", "1");

        $("#about").css("display", "none");
        $("#about").css("opacity", "0");
        $("#about").css("pointer-events", "none");

        $("#content").css("display", "block");

        $("#work").css("display", "block");
        $("#project").css("display", "block");
        $(".infohide").css("display", "block");
        $("#topgradient").css("display", "block");

    }

    $(document).ready(function () {

        console.log("READY BLOCK RUNNING");
        console.log("OpenNav Count:", $(".opennav").length);

        /// THE ARROW
        window.addEventListener("scroll", function () {

            let initialArrow = $("#scrolldowninitial");
            let imagesArrow = $("#scrolldownimages");

            if (window.scrollY > window.innerHeight) {

                initialArrow.css("display", "none");
                imagesArrow.css("display", "block");

            }

            if (window.scrollY < window.innerHeight / 10) {

                initialArrow.css("display", "block");
                imagesArrow.css("display", "none");

            }

        });

        // INFO OPEN
        $(document).on("click", ".opennav", function () {

            console.log("INFO CLICKED");

            showinfo();

        });

        // COLLAPSE EVENTS
        $("#collapseCategories").on("show.bs.collapse", function () {

            $("#info").addClass("collapsed-open");

        });

        $("#collapseCategories").on("hidden.bs.collapse", function () {

            $("#info").removeClass("collapsed-open");

        });

        // INFO CLOSE
        $(document).on("click", ".closenav", function () {

            console.log("CLOSE CLICKED");

            hideinfo();

        });

        // SCROLL BUTTONS
        $(".scrolldown.images").on("click", function () {

            $("html, body").animate({
                scrollTop: 0
            }, "slow");

        });

        $(".scrolldown.info").on("click", function () {

            $("html, body").animate({
                scrollTop: $(".aboutimage").height()
            }, "slow");

        });

    });

    $(window).scroll(function () {

        var scrollPosition = $(window).scrollTop();
        scrollMemory = scrollPosition;

    });

})(jQuery);






/* Fade-in animations */

$(document).ready(function () {

    $(window).scroll(function () {

        $('.fade').each(function () {

            var bottom_of_object =
                $(this).position().top + $(this).outerHeight();

            var bottom_of_window =
                $(window).scrollTop() + $(window).height() + 700;

            if (bottom_of_window > bottom_of_object) {

                $(this).animate({
                    'opacity': '1'
                }, 250);

            }

        });

    });

});






/* Footer arrow / intersection observer */

const backupEl = document.querySelector('#backup');

const handler = (entries) => {

    console.log(entries);

    if (!entries[0].isIntersecting) {

        $("#downarrow").html('↓');

    } else {

        $("#downarrow").html('<a class="blur" href="#top">↑</a>');

    }

};

const observer = new window.IntersectionObserver(handler);

if (backupEl) {

    observer.observe(backupEl);

}






/* Intro scroll fade */

const text = document.querySelector("#introText");

function clamp(num, min, max) {

    return Math.min(Math.max(num, min), max);

}

function easeOutQuad(x) {

    return 1 - (1 - x) * (1 - x);

}

function onScroll() {

    const scrollY = window.scrollY;

    const maxScroll = window.innerHeight * 0.6;

    const rawProgress = clamp(
        scrollY / maxScroll,
        0,
        1
    );

    const progress = easeOutQuad(rawProgress);

    const value = Math.round(
        199 + (0 - 199) * progress
    );

    document.documentElement.style.setProperty(
        "--intro-fade",
        `rgb(${value}, ${value}, ${value})`
    );

}

window.addEventListener("scroll", onScroll);

onScroll();






/* Scrolling word carousel */

const track = document.querySelector(".scrolling-track");

if (track) {

    const words = Array.from(
        track.querySelectorAll("span")
    );

    const GAP = 8;
    const LEFT_MARGIN = 20;

    let currentX = LEFT_MARGIN;
    let isAnimating = false;

    track.style.transform =
        `translateX(${currentX}px)`;

    if (words.length > 0) {

        words[0].classList.add("active");

    }

    function advanceWords() {

        if (isAnimating) return;

        isAnimating = true;

        const currentWord = words[0];

        currentWord.classList.remove("active");

        const moveAmount =
            currentWord.offsetWidth + GAP;

        currentX -= moveAmount;

        track.style.transition =
            "transform 0.8s ease";

        track.style.transform =
            `translateX(${currentX}px)`;

        setTimeout(() => {

            track.style.transition = "none";

            track.appendChild(currentWord);

            currentX += moveAmount;

            track.style.transform =
                `translateX(${currentX}px)`;

            words.push(words.shift());

            words[0].classList.add("active");

            track.offsetHeight;

            isAnimating = false;

        }, 800);

    }

    setInterval(advanceWords, 2400);

}