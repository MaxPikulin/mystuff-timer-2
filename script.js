const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const stopBtn = document.querySelector('#stopBtn');
const hoursSp = document.querySelector('#hours');
const minutesSp = document.querySelector('#minutes');
const secondsSp = document.querySelector('#seconds');
const strtCoords = startBtn.getBoundingClientRect();
const contCoords = document.querySelector('.container').getBoundingClientRect();
const adjustBtns = document.querySelectorAll('.adjust');

let seconds = 0,
  intId;

function showTime() {
  const [sec, min, hour] = setTime();
  let s = ('' + sec).length < 2 ? '0' + sec : sec,
    m = ('' + min).length < 2 ? '0' + min : min,
    h = ('' + hour).length < 2 ? '0' + hour : hour;
  secondsSp.textContent = s;
  minutesSp.textContent = m;
  hoursSp.textContent = h;
  document.title = `${h}:${m}:${s}`;
}

function setTime() {
  let sec, min, hour = 0;
  sec = parseInt(seconds % 60);
  min = parseInt((seconds % 3600) / 60);
  hour = parseInt(seconds / 3600);
  return [sec, min, hour];
}

function startTime() {
  if (intId) return;
  intId = setInterval(handleTime, 1000);
  stopBtn.setAttribute('style', `top:${strtCoords.top - contCoords.top}px; left: ${strtCoords.left-contCoords.left}px; width: ${strtCoords.width}px; display: block;`);
}

function resetTime() {
  seconds = 0;
  showTime();
}

function stopTime() {
  if (!intId) return;
  clearInterval(intId);
  intId = null;
  stopBtn.style.setProperty('display', 'none');
}

function adjustTime(e) {
  const adjustAmount = parseInt(e.target.dataset.amount);
  seconds += adjustAmount;
  showTime();
}

function handleTime() {
  seconds++;
  showTime();
}

startBtn.addEventListener('click', startTime);
resetBtn.addEventListener('click', resetTime);
stopBtn.addEventListener('click', stopTime);
adjustBtns.forEach(v => v.addEventListener('click', adjustTime));
