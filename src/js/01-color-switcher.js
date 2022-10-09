const COLOR_DELAY = 1000;
let timerId = null;
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onBtnStartClick() {
  btnStart.disabled = true;
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, COLOR_DELAY);
  console.log(timerId);
}

function onBtnStopClick() {
  btnStart.disabled = false;
  clearInterval(timerId);
  return;
}
