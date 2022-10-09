import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  let delayCurr = e.currentTarget.delay.valueAsNumber;
  const delayStep = e.currentTarget.step.valueAsNumber;
  const amountOfPromise = e.currentTarget.amount.valueAsNumber;

  for (let position = 1; position <= amountOfPromise; position += 1) {
    createPromise(position, delayCurr);
    delayCurr += delayStep;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  promise
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      console.log({ position, delay });
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      console.log({ position, delay });
    });
}
