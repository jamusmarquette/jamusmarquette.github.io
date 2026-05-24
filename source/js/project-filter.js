document.addEventListener("DOMContentLoaded", function () {

    const projectCards = document.querySelectorAll(".project-card");
    const filterLinks = document.querySelectorAll(".category-filter");

    function filterProjects(category) {

        projectCards.forEach(card => {

            const categories = card.dataset.category || "";

            if (
                category === "all" ||
                categories.includes(category)
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

        // ACTIVE CATEGORY STYLING
        filterLinks.forEach(link => {

            link.classList.remove("active-category");

        });

        document
            .querySelectorAll(`.category-filter[data-category="${category}"]`)
            .forEach(link => {

                link.classList.add("active-category");

            });

    }

    filterLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            const category = this.dataset.category;

            const isHomepage =
                window.location.pathname === "/" ||
                window.location.pathname === "/index.html";

            // IF NOT HOMEPAGE:
            // GO TO FILTERED HOMEPAGE
            if (!isHomepage) {

                e.preventDefault();

                const targetUrl =
                    category === "all"
                        ? "/"
                        : "/?category=" + category;

                window.location.href = targetUrl;

                return;

            }

            // HOMEPAGE FILTERING
            e.preventDefault();

            filterProjects(category);

            // UPDATE URL
            history.replaceState(
                null,
                "",
                category === "all"
                    ? "/"
                    : "/?category=" + category
            );


            // UPDATE HEADER TEXT
const loveText =
    document.querySelector(".love");

if (loveText) {

    if (category === "all") {

        loveText.textContent = "featured projects";
        loveText.classList.remove("filtered-category");

    } else {

        loveText.textContent =
            category.replace(/-/g, " ");

        loveText.classList.add("filtered-category");

    }

}


            // CLOSE DROPDOWN
            const collapseElement =
                document.getElementById("collapseCategories");

            const bsCollapse =
                bootstrap.Collapse.getInstance(collapseElement);

            if (bsCollapse) {

                bsCollapse.hide();

            }

            // SCROLL TO REAL PROJECT START
            const projectsStart =
                document.getElementById("projects-start");

            if (projectsStart) {

                setTimeout(() => {

                    const headerOffset = 120;

const elementPosition =
    projectsStart.getBoundingClientRect().top;

const offsetPosition =
    elementPosition +
    window.pageYOffset -
    headerOffset;

window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
});

                }, 250);

            }

        });

    });

    // URL FILTERING
    const params = new URLSearchParams(window.location.search);

    const activeCategory = params.get("category");

    if (activeCategory) {

        filterProjects(activeCategory);

    } else {

        filterProjects("all");

    }

});