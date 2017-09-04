const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const stopBtn = document.querySelector('#stopBtn');
const hoursSp = document.querySelector('#hours');
const minutesSp = document.querySelector('#minutes');
const secondsSp = document.querySelector('#seconds');
const strtCoords = startBtn.getBoundingClientRect();
const contCoords = document.querySelector('.container').getBoundingClientRect();

let hours = 0,
    minutes = 0,
    seconds = 0,
    intId;

function showTime() {
    secondsSp.textContent = ('' + seconds).length < 2 ? '0' + seconds : seconds;
    minutesSp.textContent = ('' + minutes).length < 2 ? '0' + minutes : minutes;
    hoursSp.textContent = ('' + hours).length < 2 ? '0' + hours : hours;
}

function setTime() {
    seconds++;
    if (seconds > 59) {
        minutes++;
        seconds = 0;
    }
    if (minutes > 59) {
        hours++;
        minutes = 0;
    }
    showTime();
}

function startTime() {
    if (intId) return;
    intId = setInterval(setTime, 1000);

    stopBtn.setAttribute('style', `top:${strtCoords.top - contCoords.top}px; left: ${strtCoords.left-contCoords.left}px; width: ${strtCoords.width}px; display: block;`);
}

function resetTime() {
    seconds = minutes = hours = 0;
    showTime();
}

function stopTime() {
    if (!intId) return;
    clearInterval(intId);
    intId = null;
    stopBtn.style.setProperty('display', 'none');
}

startBtn.addEventListener('click', startTime);
resetBtn.addEventListener('click', resetTime);
stopBtn.addEventListener('click', stopTime);