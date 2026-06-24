// ===============================
// ELEMENTS
// ===============================

const startBtn = document.getElementById("startBtn");
const curtainContainer = document.getElementById("curtainContainer");
const bgMusic = document.getElementById("bgMusic");

const slides = document.querySelectorAll(".slide");
const nextBtn = document.getElementById("nextBtn");
const progressFill = document.getElementById("progressFill");

const finalSection = document.getElementById("finalSection");
const sliderSection = document.querySelector(".slideshow-section");

let currentSlide = 0;

// ===============================
// START OPENING
// ===============================

startBtn.addEventListener("click", () => {

    bgMusic.play().catch(() => {});

    curtainContainer.classList.add("curtain-open");

    setTimeout(() => {
        curtainContainer.style.display = "none";
    }, 2400);

});

// ===============================
// FLOATING PARTICLES
// ===============================

const particlesContainer = document.getElementById("particles");

function createParticles() {

    for(let i = 0; i < 60; i++) {

        const particle = document.createElement("div");

        particle.classList.add("particle");

        const size = Math.random() * 6 + 2;

        particle.style.width = size + "px";
        particle.style.height = size + "px";

        particle.style.left = Math.random() * 100 + "%";

        particle.style.animationDuration =
            (Math.random() * 12 + 8) + "s";

        particle.style.animationDelay =
            Math.random() * 10 + "s";

        particle.style.opacity =
            Math.random();

        particlesContainer.appendChild(particle);

    }

}

createParticles();

// ===============================
// SLIDESHOW
// ===============================

function updateSlide() {

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    slides[currentSlide].classList.add("active");

    const percent =
        ((currentSlide + 1) / slides.length) * 100;

    progressFill.style.width = percent + "%";

}

nextBtn.addEventListener("click", () => {

    if(currentSlide < slides.length - 1){

        currentSlide++;

        updateSlide();

    } else {

        openHeartScene();

    }

});

updateSlide();

// ===============================
// HEART SCENE
// ===============================

function openHeartScene(){

    sliderSection.style.display = "none";

    finalSection.style.display = "block";

    startHeartAnimation();

}

// ===============================
// CANVAS
// ===============================

const canvas =
document.getElementById("heartCanvas");

const ctx =
canvas.getContext("2d");

function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

// ===============================
// HEART POINTS
// ===============================

function heartFunction(t){

    const x =
        16 * Math.pow(Math.sin(t),3);

    const y =
        -(13*Math.cos(t))
        +(5*Math.cos(2*t))
        +(2*Math.cos(3*t))
        +(Math.cos(4*t));

    return {x,y};

}

// ===============================
// PARTICLES
// ===============================

const heartParticles = [];

const TOTAL = 500;

function createHeartParticles(){

    heartParticles.length = 0;

    const scale =
        Math.min(
            canvas.width,
            canvas.height
        ) * 0.018;

    for(let i=0;i<TOTAL;i++){

        const t =
            Math.random() *
            Math.PI *
            2;

        const point =
            heartFunction(t);

        heartParticles.push({

            baseX:
                point.x * scale,

            baseY:
                point.y * scale,

            size:
                Math.random() * 3 + 1,

            offset:
                Math.random() * Math.PI * 2,

            speed:
                Math.random() * 0.03 + 0.01

        });

    }

}

createHeartParticles();
// ===============================
// HEART DRAW
// ===============================

let time = 0;

function animateHeart(){

    requestAnimationFrame(
        animateHeart
    );

    time += 0.02;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const pulse =
        1 +
        Math.sin(time * 2) * 0.08;

    const centerX =
        canvas.width / 2;

    const centerY =
        canvas.height / 2;

    for(const p of heartParticles){

        const px =
            centerX +
            (p.baseX * pulse) +
            Math.sin(
                time +
                p.offset
            ) * 3;

        const py =
            centerY +
            (p.baseY * pulse) +
            Math.cos(
                time +
                p.offset
            ) * 3;

        ctx.beginPath();

        ctx.arc(
            px,
            py,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(255,90,130,0.95)";

        ctx.shadowBlur = 18;

        ctx.shadowColor =
            "#ff4d6d";

        ctx.fill();

    }

}

// ===============================
// EXTRA FLOATING HEARTS
// ===============================

const tinyHearts = [];

function createTinyHearts(){

    tinyHearts.length = 0;

    for(let i=0;i<120;i++){

        tinyHearts.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            size:
                Math.random() * 6 + 2,

            speed:
                Math.random() * 0.7 + 0.3,

            alpha:
                Math.random() * 0.5 + 0.2

        });

    }

}

createTinyHearts();

function drawTinyHearts(){

    tinyHearts.forEach(h=>{

        h.y -= h.speed;

        if(h.y < -20){

            h.y =
                canvas.height + 20;

            h.x =
                Math.random() *
                canvas.width;

        }

        ctx.font =
            `${h.size * 2}px sans-serif`;

        ctx.fillStyle =
            `rgba(255,120,150,${h.alpha})`;

        ctx.fillText(
            "❤",
            h.x,
            h.y
        );

    });

}

// ===============================
// FINAL LOOP
// ===============================

function finalAnimation(){

    requestAnimationFrame(
        finalAnimation
    );

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawTinyHearts();

    const pulse =
        1 +
        Math.sin(time * 2) * 0.08;

    const centerX =
        canvas.width / 2;

    const centerY =
        canvas.height / 2;

    time += 0.02;

    for(const p of heartParticles){

        const x =
            centerX +
            (p.baseX * pulse) +
            Math.sin(
                time +
                p.offset
            ) * 3;

        const y =
            centerY +
            (p.baseY * pulse) +
            Math.cos(
                time +
                p.offset
            ) * 3;

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(255,90,130,.95)";

        ctx.shadowBlur = 25;

        ctx.shadowColor =
            "#ff4d6d";

        ctx.fill();

    }

}

// ===============================
// START HEART
// ===============================

function startHeartAnimation(){

    resizeCanvas();

    createHeartParticles();

    createTinyHearts();

    finalAnimation();

}