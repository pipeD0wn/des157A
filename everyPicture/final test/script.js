(function() {
    "use strict";
    console.log("reading js");

    // hotspots
    const hotspot1 = document.querySelector(".hotspot-1");
    const hotspot2 = document.querySelector(".hotspot-2");
    const hotspot3 = document.querySelector(".hotspot-3");

    // story steps (scrollable later)
    const step1 = document.querySelector(".step1");
    const step2 = document.querySelector(".step2");
    const step3 = document.querySelector(".step3");

    // story slots (where image + text will go)
    const slot1 = document.querySelector(".slot1");
    const slot2 = document.querySelector(".slot2");
    const slot3 = document.querySelector(".slot3");

    // captions for hidden text
    const caption1 = document.querySelector(".caption1").textContent;
    const caption2 = document.querySelector(".caption2").textContent;
    const caption3 = document.querySelector(".caption3").textContent;

    // images for each hotspot
    const img1 = "images/cater.jpg";
    const img2 = "images/dragon.jpg";
    const img3 = "images/ladybug.jpg";

    // scroll container PLEASE
    const scrollBox = document.querySelector(".story-scroll");

    // keep page load in mind, make active from get go
    window.addEventListener("load", function() {
        updateActiveFromScroll();
    });

    // click button event that when hotpost selected it puts in the image to the text area vis innerhtml

    hotspot1.addEventListener("click", function() {
        slot1.innerHTML = "<p>" + caption1 + "</p><img src='" + img1 + "' alt='caterpillar and butterfly detail'>";
        slot1.classList.add("showimage");
    });

    hotspot2.addEventListener("click", function() {
        slot2.innerHTML = "<p>" + caption2 + "</p><img src='" + img2 + "' alt='dragonfly detail'>";
        slot2.classList.add("showimage");
    });

    hotspot3.addEventListener("click", function() {
        slot3.innerHTML = "<p>" + caption3 + "</p><img src='" + img3 + "' alt='ladybug detail'>";
        slot3.classList.add("showimage");
    });

    // higghlight the hotspot that connects to the scroll vie scroll function event listener thingie

    scrollBox.addEventListener("scroll", function() {
        updateActiveFromScroll();
    });

    function updateActiveFromScroll() {
        const boxRect = scrollBox.getBoundingClientRect();
        const middle = boxRect.top + boxRect.height / 2;

        const step1Rect = step1.getBoundingClientRect();
        const step2Rect = step2.getBoundingClientRect();
        const step3Rect = step3.getBoundingClientRect();

        const step1Middle = step1Rect.top + step1Rect.height / 2;
        const step2Middle = step2Rect.top + step2Rect.height / 2;
        const step3Middle = step3Rect.top + step3Rect.height / 2;

        const dist1 = Math.abs(step1Middle - middle);
        const dist2 = Math.abs(step2Middle - middle);
        const dist3 = Math.abs(step3Middle - middle);

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

        // Clear all active classes
        step1.classList.remove("story-step-active");
        step2.classList.remove("story-step-active");
        step3.classList.remove("story-step-active");

        hotspot1.classList.remove("hotspot-active");
        hotspot2.classList.remove("hotspot-active");
        hotspot3.classList.remove("hotspot-active");

        // Add active state to the correct section and hotspot
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
