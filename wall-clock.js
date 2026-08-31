
/* =========================================
   ELEMENTS
========================================= */

const numbers = document.getElementById("numbers");
const ticks = document.getElementById("ticks");

const hourHand = document.getElementById("hourHand");
const minuteHand = document.getElementById("minuteHand");
const secondHand = document.getElementById("secondHand");

const digitalTime = document.getElementById("digitalTime");
const dateElement = document.getElementById("date");


/* =========================================
   CREATE NUMBERS
========================================= */

for (let i = 1; i <= 12; i++) {

    const number = document.createElement("div");

    number.className = "number";

    /*
       12 should be at 0 degrees.
       Each number moves 30 degrees.
    */

    const angle = i === 12 ? 0 : i * 30;

    number.style.setProperty("--angle", `${angle}deg`);

    const span = document.createElement("span");

    span.textContent = i;

    /*
       Counter-rotate the number so
       the text stays upright.
    */

    span.style.setProperty("--angle", `${angle}deg`);

    number.appendChild(span);

    numbers.appendChild(number);
}


/* =========================================
   CREATE 60 TICKS
========================================= */

for (let i = 0; i < 60; i++) {

    const tick = document.createElement("div");

    tick.className = "tick";

    /*
       Every second = 6 degrees.
    */

    tick.style.transform =
        `rotate(${i * 6}deg)`;

    /*
       Every 5th tick is a major marker.
    */

    if (i % 5 === 0) {
        tick.classList.add("major");
    }

    ticks.appendChild(tick);
}


/* =========================================
   UPDATE CLOCK
========================================= */

function updateClock() {

    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const milliseconds = now.getMilliseconds();


    /*
       Smooth second hand.
    */

    const smoothSeconds =
        seconds + milliseconds / 1000;


    /*
       Hour hand
       12 hours = 360 degrees
    */

    const hourDegrees =
        ((hours % 12) * 30) +
        (minutes * 0.5) +
        (seconds / 120);


    /*
       Minute hand
    */

    const minuteDegrees =
        (minutes * 6) +
        (seconds * 0.1);


    /*
       Second hand
    */

    const secondDegrees =
        smoothSeconds * 6;


    hourHand.style.transform =
        `translateX(-50%) rotate(${hourDegrees}deg)`;


    minuteHand.style.transform =
        `translateX(-50%) rotate(${minuteDegrees}deg)`;


    secondHand.style.transform =
        `translateX(-50%) rotate(${secondDegrees}deg)`;


    /*
       Digital clock
    */

    const h =
        String(hours).padStart(2, "0");

    const m =
        String(minutes).padStart(2, "0");

    const s =
        String(seconds).padStart(2, "0");


    digitalTime.textContent =
        `${h}:${m}:${s}`;


    /*
       Date
    */

    dateElement.textContent =
        now
        .toLocaleDateString(
            "en-NG",
            {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        )
        .toUpperCase();


    requestAnimationFrame(updateClock);
}


/* =========================================
   START
========================================= */

updateClock();