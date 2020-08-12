const form = document.getElementById('contactForm');
const nameMessageError = document.getElementById('nameMessageError');
const emailMessageError = document.getElementById('emailMessageError');
const subjectMessageError = document.getElementById('subjectMessageError');
const messageMessageError = document.getElementById('messageMessageError');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const elements = [...event.target].map(element => ({ name: element.name, value: element.value }));
    const name = elements.find(e => e.name === 'name');
    const email = elements.find(e => e.name === 'email');
    const subject = elements.find(e => e.name === 'subject');
    const message = elements.find(e => e.name === 'message');

    clearMessageErrors();

    if (isValidateFields(name.value, email.value, subject.value, message.value)) {
        showSnackbar('E-mail para contato enviado com sucesso!', 'success');
    }
});

function clearMessageErrors() {
    nameMessageError.classList.remove('is-visible');
    emailMessageError.classList.remove('is-visible');
    subjectMessageError.classList.remove('is-visible');
    messageMessageError.classList.remove('is-visible');
}

function showMessageErrors(isValidName, isValidEmail, isValidSubject, isValidMessage) {
    if (!isValidName) {
        nameMessageError.classList.add('is-visible');
    }

    if (!isValidEmail) {
        emailMessageError.classList.add('is-visible');
    }

    if (!isValidSubject) {
        subjectMessageError.classList.add('is-visible');
    }

    if (!isValidMessage) {
        messageMessageError.classList.add('is-visible');
    }
}

function isValidateFields(nameValue, emailValue, subjectValue, messageValue) {
    const isValidName = nameValue.trim().length > 2;
    const isValidEmail = emailValue.trim().length > 0;
    const isValidSubject = subjectValue.trim().length > 2;
    const isValidMessage = messageValue.trim().length > 1;

    if (isValidName && isValidEmail && isValidSubject && isValidMessage) {
        return true;
    } else {
        showMessageErrors(isValidName, isValidEmail, isValidSubject, isValidMessage);
        return false;
    }
}

function showSnackbar(message, type) {
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    toastr[type](message);
}