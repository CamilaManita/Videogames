const regexpEmail = /^[^@]+@[^@]+\.[^@]+$/;

const regexpPassword = /^(?=.*\d)(?=.*[a-zA-Z]).{6,30}$/;

const validationEmail = (string) => {
    if(regexpEmail.test(string)) return true;

    return false;
};

const validationPassword = (string) => {
    if (regexpPassword.test(string)) return true;

    return false;
}

module.exports = {
    validationEmail, validationPassword
}