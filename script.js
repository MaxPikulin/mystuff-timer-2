const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const hoursSp = document.querySelector('#hours');
const minutesSp = document.querySelector('#minutes');
const secondsSp = document.querySelector('#seconds');
const adjustBtns = document.querySelectorAll('.adjust');
const settingsBtn = document.getElementsByClassName('gear')[0];
const settings = document.getElementsByClassName('settings')[0];

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

function startStopTime() {
  if (startBtn.textContent == 'START') {
    if (intId) return;
    intId = setInterval(handleTime, 1000);
    startBtn.textContent = 'STOP';
  } else {
    if (!intId) return;
    clearInterval(intId);
    intId = null;
    startBtn.textContent = 'START';
  }
}

function resetTime() {
  seconds = 0;
  showTime();
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

function clickGear() {
  const ss = settings.style;
  const gear = document.querySelector('.cls-1').style;
  ss.display = ss.display == '' ? 'block' : '';
  gear.fill = gear.fill == ''? 'red': '';
}

startBtn.addEventListener('click', startStopTime);
resetBtn.addEventListener('click', resetTime);
adjustBtns.forEach(v => v.addEventListener('click', adjustTime));
settingsBtn.addEventListener('click', clickGear);
