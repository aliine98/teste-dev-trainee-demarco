import { addClient, getClients, deleteClient, editClient } from './clients.js';
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
        event.preventDefault();
        dialog.innerHTML = '<p>Formulário inválido! Verifique os campos</p>';
        document.body.appendChild(dialog);
        dialog.showModal();
    } else {
        dialog.innerHTML = '<p>Formulário enviado com sucesso!</p>';
        document.body.appendChild(dialog);
        dialog.showModal();
        addClient(nameInput.value, emailInput.value, dateInput.value);
    }
});

function openEditForm(client) {
    const dialog = document.createElement('dialog');
    dialog.classList.add('edit-dialog');
    dialog.innerHTML = `
    <form id="edit-form">
    <label for="nomeEdit">Nome:</label>
    <input type="text" id="nomeEdit" value="${client.name}" required>
    <label for="emailEdit">Email:</label>
    <input type="email" id="emailEdit" value="${client.email}" required>
    <label for="dataEdit">Data:</label>
    <input type="date" id="dataEdit" value="${client.date}" required>
    <button type="submit" id="btn-update">Atualizar</button>
    </form>
    `;
    document.body.appendChild(dialog);
    console.log(dialog);
    dialog.showModal();

    const form = dialog.querySelector('#edit-form');
    form.addEventListener('submit', () => {
        const nameInput = form.querySelector('#nomeEdit');
        const emailInput = form.querySelector('#emailEdit');
        const dateInput = form.querySelector('#dataEdit');
        validationStyle(nameInput, isValidName(nameInput.value), nameInputMessage);
        validationStyle(emailInput, isValidEmail(emailInput.value), emailInputMessage);
        validationStyle(dateInput, isValidDate(dateInput.value), dateInputMessage);
        editClient(client.id, { name: nameInput.value, email: emailInput.value, date: dateInput.value });
        dialog.close();
    });
}

const clientsList = getClients();
const clientsUl = document.getElementById('clients');
clientsUl.innerHTML = '';

clientsList.forEach(client => {
    console.log(client);
    const li = document.createElement('li');
    li.classList.add('client');
    li.innerHTML = `
            <p>Nome: ${client.name}</p>
            <p>Email: ${client.email}</p>
            <p>Cliente desde: ${client.date}</p>
            <button class="btn-edit">Editar</button>
            <button class="btn-delete">Deletar</button>
            `;
    clientsUl.appendChild(li);
    li.querySelector('.btn-edit').addEventListener('click', () => openEditForm(client));
    li.querySelector('.btn-delete').addEventListener('click', () => {
        deleteClient(client.id);
        window.location.reload();
    });
});
