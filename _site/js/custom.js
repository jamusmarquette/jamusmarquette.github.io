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