const regexpEmail = /^[^@]+@[^@]+\.[^@]+$/;
const regexpPassword = /^(?=.*\d)(?=.*[a-zA-Z]).{6,10}$/;

const loginValidation = (input) => {
    const errors = {}
        if(!input.email || !regexpEmail.test(input.email) || input.email.length > 35) errors.email = 'Enter valid email';
        if(!regexpPassword.test(input.password)) errors.password = 'Enter valid password'
    return errors;
}

export {loginValidation};