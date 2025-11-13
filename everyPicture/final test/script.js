(function() {
    "use strict";
    console.log("reading js");

    // hotspots
    const hotspot1 = document.querySelector(".hotspot-1");
    const hotspot2 = document.querySelector(".hotspot-2");
    const hotspot3 = document.querySelector(".hotspot-3");

    // story steps
    const step1 = document.querySelector(".step1");
    const step2 = document.querySelector(".step2");
    const step3 = document.querySelector(".step3");

    // story slots
    const slot1 = document.querySelector(".slot1");
    const slot2 = document.querySelector(".slot2");
    const slot3 = document.querySelector(".slot3");

    // captions
    const caption1 = document.querySelector(".caption1").textContent;
    const caption2 = document.querySelector(".caption2").textContent;
    const caption3 = document.querySelector(".caption3").textContent;

    // detail images
    const img1 = "images/cater.jpg";
    const img2 = "images/dragon.jpg";
    const img3 = "images/ladybug.jpg";

    // scroll box
    const scrollBox = document.querySelector(".story-scroll");

    // highlight correct step / hotspot on first load
    window.addEventListener("load", function() {
        updateActiveFromScroll();
    });

    // CLICK EVENTS: drop text + image into matching slot

    hotspot1.addEventListener("click", function() {
        slot1.innerHTML =
            "<p>" + caption1 + "</p><img src='" + img1 + "' alt='caterpillar and butterfly detail'>";
        slot1.classList.add("showimage");
    });

    hotspot2.addEventListener("click", function() {
        slot2.innerHTML =
            "<p>" + caption2 + "</p><img src='" + img2 + "' alt='dragonfly detail'>";
        slot2.classList.add("showimage");
    });

    hotspot3.addEventListener("click", function() {
        slot3.innerHTML =
            "<p>" + caption3 + "</p><img src='" + img3 + "' alt='ladybug detail'>";
        slot3.classList.add("showimage");
    });

    // SCROLL EVENTS
    scrollBox.addEventListener("scroll", function() {
        updateActiveFromScroll();
    });

    function updateActiveFromScroll() {
        const boxMiddle = scrollBox.scrollTop + scrollBox.clientHeight / 2;

        const step1Middle = step1.offsetTop + step1.offsetHeight / 2;
        const step2Middle = step2.offsetTop + step2.offsetHeight / 2;
        const step3Middle = step3.offsetTop + step3.offsetHeight / 2;

        const dist1 = Math.abs(step1Middle - boxMiddle);
        const dist2 = Math.abs(step2Middle - boxMiddle);
        const dist3 = Math.abs(step3Middle - boxMiddle);

        let activeNumber = 1;
        let closest = dist1;

        if (dist2 < closest) {
            closest = dist2;
            activeNumber = 2;
        }

        if (dist3 < closest) {
            closest = dist3;
            activeNumber = 3;
        }

        step1.classList.remove("story-step-active");
        step2.classList.remove("story-step-active");
        step3.classList.remove("story-step-active");

        hotspot1.classList.remove("hotspot-active");
        hotspot2.classList.remove("hotspot-active");
        hotspot3.classList.remove("hotspot-active");

        if (activeNumber === 1) {
            step1.classList.add("story-step-active");
            hotspot1.classList.add("hotspot-active");
        } else if (activeNumber === 2) {
            step2.classList.add("story-step-active");
            hotspot2.classList.add("hotspot-active");
        } else if (activeNumber === 3) {
            step3.classList.add("story-step-active");
            hotspot3.classList.add("hotspot-active");
        }
    }
})();
