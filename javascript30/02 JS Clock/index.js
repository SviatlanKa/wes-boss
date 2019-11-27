const handHours = document.querySelector(".hand-hours");
const handMinutes = document.querySelector(".hand-minutes");
const handSeconds = document.querySelector(".hand-seconds");

function setDate() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const hoursInDegrees = 360 / 12 * hours + 90;
    const minutesInDegrees = 360 / 60 * minutes + 90;
    const secondsInDegrees = 360 / 60 * seconds + 90;
    handHours.style.transform = `rotate(${hoursInDegrees + minutes / 10}deg)`;
    handMinutes.style.transform = `rotate(${minutesInDegrees + seconds / 10}deg)`;
    handSeconds.style.transform = `rotate(${secondsInDegrees}deg)`;
}

setInterval(setDate, 1000)