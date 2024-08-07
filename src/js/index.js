import { addClient, getClients } from './clients.js';
import { isValidName, isValidDate, isValidEmail } from './form-validation.js';

const dialog = document.createElement('dialog');
document.body.appendChild(dialog);
const nameInput = document.getElementById('nome');
const nameInputMessage = '<p class="message">O nome deve ser completo. Conter ao menos 10 caracteres e um espaço</p>';
const dateInput = document.getElementById('data');
const dateInputMessage = '<p class="message">A data deve ser anterior à data atual e posterior à data de criação da empresa (01/01/2023)</p>';
const emailInput = document.getElementById('email');
const emailInputMessage = '<p class="message">O email deve ser válido. Conter @ e .com ou .com.br</p>';
const btnSubmit = document.getElementById('btnsubmit');

dialog.addEventListener('click', () => dialog.close());

function validationStyle(input, isValid, message) {
    if (isValid) {
        input.classList.remove('invalid');
        input.classList.add('valid');
        const previousMessage = input.nextElementSibling;
        if (previousMessage && previousMessage.classList.contains('message')) {
            previousMessage.remove();
        }
    } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        const previousMessage = input.nextElementSibling;
        if (previousMessage && previousMessage.classList.contains('message')) {
            previousMessage.remove();
        }
        input.insertAdjacentHTML('afterend', message);
    }
}

nameInput.addEventListener('input', () => {
    validationStyle(nameInput, isValidName(nameInput.value), nameInputMessage);
});

dateInput.addEventListener('input', () => {
    validationStyle(dateInput, isValidDate(dateInput.value), dateInputMessage);
});

emailInput.addEventListener('input', () => {
    validationStyle(emailInput, isValidEmail(emailInput.value), emailInputMessage);
});

btnSubmit.addEventListener('click', event => {
    event.preventDefault();
    const isValidDateInput = isValidDate(dateInput.value);
    const isValidEmailInput = isValidEmail(emailInput.value);
    const isValidNameInput = isValidName(nameInput.value);

    if (!isValidNameInput) {
        nameInput.focus();
        validationStyle(nameInput, isValidNameInput, nameInputMessage);
    } else if (!isValidEmailInput) {
        emailInput.focus();
        validationStyle(emailInput, isValidEmailInput, emailInputMessage);
    } else if (!isValidDateInput) {
        dateInput.focus();
        validationStyle(dateInput, isValidDateInput, dateInputMessage);
    }

    if (!isValidNameInput || !isValidEmailInput || !isValidDateInput) {
        dialog.innerHTML = '<p>Formulário inválido! Verifique os campos</p>';
        document.body.appendChild(dialog);
        dialog.showModal();
    } else {
        dialog.innerHTML = '<p>Formulário enviado com sucesso!</p>';
        document.body.appendChild(dialog);
        dialog.showModal();
    }
});
