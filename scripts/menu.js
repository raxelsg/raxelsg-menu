(function () {
    "use strict";

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.querySelectorAll(".night__title .letter").forEach((letter, i) => {
        letter.style.setProperty("--i", i);
    });

    const night = document.querySelector(".half--night");
    const sparksLayer = document.querySelector(".sparks");
    const title = document.querySelector(".night__title");
    const studioTitle = document.querySelector(".studio__title");

    document.querySelectorAll(".font-picker__select").forEach((fontPicker) => {
        fontPicker.addEventListener("change", (event) => {
            const target = event.target.id === "studio-font" ? studioTitle : title;

            if (target) {
                target.dataset.font = event.target.value;
            }
        });
    });

    if (!night || !sparksLayer || !title || prefersReduced) return;

    let sparkTimer = null;

    function spawnSpark() {
        const rectTitle = title.getBoundingClientRect();
        const rectLayer = sparksLayer.getBoundingClientRect();

        const originX = rectTitle.left - rectLayer.left + Math.random() * rectTitle.width;
        const originY = rectTitle.top - rectLayer.top + rectTitle.height * (0.2 + Math.random() * 0.7);

        const spark = document.createElement("span");
        spark.className = "spark";

        const dx = (Math.random() - 0.5) * 160;
        const dy = -40 - Math.random() * 150;
        const dur = 650 + Math.random() * 600;
        const size = 3 + Math.random() * 5;

        spark.style.left = originX + "px";
        spark.style.top = originY + "px";
        spark.style.width = size + "px";
        spark.style.height = size + "px";
        spark.style.setProperty("--dx", dx + "px");
        spark.style.setProperty("--dy", dy + "px");
        spark.style.setProperty("--dur", dur + "ms");

        sparksLayer.appendChild(spark);
        setTimeout(() => spark.remove(), dur + 60);
    }

    function burst(count) {
        for (let i = 0; i < count; i++) spawnSpark();
    }

    night.addEventListener("mouseenter", () => {
        burst(14);
        sparkTimer = setInterval(() => burst(3 + Math.floor(Math.random() * 4)), 90);
    });

    night.addEventListener("mouseleave", () => {
        clearInterval(sparkTimer);
        sparkTimer = null;
    });
})();
