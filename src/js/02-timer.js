import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delay = 1000;
const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let currentTime = null; // поточний час таймера
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onChoseClose(selectedDates[0]);
  },
};

flatpickr(input, options);
btnStart.addEventListener('click', onBtnClick);

function ticTimer() {
  if (currentTime === null || intervalId === null) {
    return;
  }

  currentTime -= delay;
  if (currentTime < 0) {
    clearInterval(intervalId);
    intervalId = null;
    return;
  }
  updateTime(convertMs(currentTime));
  console.log('tic', currentTime);
}

function onBtnClick() {
  intervalId = setInterval(() => {
    ticTimer();
  }, delay);
}

function onChoseClose(date) {
  const currentDate = new Date();
  console.log(date);
  if (date <= currentDate) {
    Notify.failure('Please choose a date in the future', {
      fontSize: '22px',
      timeout: 2000,
      width: '600px',
    });
    btnStart.disabled = true;
    return;
  }
  currentTime = date - currentDate;
  btnStart.disabled = false;
}

function updateTime({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
