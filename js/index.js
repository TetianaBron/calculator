//Ссилка на елементи
const refs = {
  form: document.querySelector('.form'),
  result: document.querySelector('.result__number'),
  resultAdditinalText: document.querySelector('.result__additinal-text'),
  firstLabel: document.querySelector('.form__label-first'),
  secondLabel: document.querySelector('.form__label-second'),
};

//вішаємо слухачів
refs.form.addEventListener('submit', onSubmit);
refs.form.elements.firstInput.addEventListener('input', onFirstInput);
refs.form.elements.secondInput.addEventListener('input', onSecondInput);
refs.form.elements.operation.addEventListener('input', onOperationInput);

//функція при підтвердженні форми
function onSubmit(e) {
  e.preventDefault();

  const firstValue = Number(e.currentTarget.elements.firstInput.value);
  const secondValue = Number(e.currentTarget.elements.secondInput.value);
  const operationValue = refs.form.elements.operation.value;

  if (
    e.currentTarget.elements.firstInput.value === '' ||
    e.currentTarget.elements.secondInput.value === ''
  ) {
    alert('Увага! Введіть значення!');
  } else {
    const sum = doMath(firstValue, secondValue, operationValue);
    changeInterface(sum);
  }
}

//функції при зміні інпутів
function onFirstInput(e) {
  if (!e.currentTarget.value) {
    refs.firstLabel.textContent = 'Введіть ціле число';
  }
  clearResult();
}

function onSecondInput(e) {
  if (!e.currentTarget.value) {
    refs.secondLabel.textContent = 'Введіть ціле число';
  }
  clearResult();
}

function onOperationInput() {
  clearResult();
}

//функція для обрахування результатів
function doMath(x, y, sign) {
  let total = null;
  switch (sign) {
    case '+':
      total = add(x, y);
      break;

    case '-':
      total = minus(x, y);
      break;

    case '*':
      total = multiply(x, y);
      break;

    case '/':
      total = divide(x, y);
      break;

    default:
      alert('Оберіть операцію!');
  }
  return total;
}

//додаємо функції для математичних операцій
function add(a, b) {
  return a + b;
}

function minus(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    alert('На 0 ділити не можна! Змініть значення!');
  } else {
    if (!Number.isInteger(a / b)) {
      refs.resultAdditinalText.textContent = '(округлене число)';
    }
    return Math.round(a / b);
  }
}

//змінюємо інтерфейс для користувача, показуємо результат, робимо кнопку неактивною, лейбли міняємо з введіть на змініть,
//щоб було зрозуміло, що можна робити інші обчислення
function changeInterface(totalSum) {
  refs.result.textContent = totalSum;
  refs.form.elements.btn.disabled = true;
  refs.firstLabel.textContent = 'Змініть ціле число';
  refs.secondLabel.textContent = 'Змініть ціле число';
}

//витираємо попередні результати, робимо кнопку активною
//перевірка чи є додатковий текст про округлене число (який з'являється після ділення, якщо число було округлене)
//перевірка чи є результат
function clearResult() {
  if (refs.resultAdditinalText.textContent) {
    refs.resultAdditinalText.textContent = '';
  }
  if (refs.result.textContent) {
    refs.result.textContent = '';
  }
  refs.form.elements.btn.disabled = false;
}
