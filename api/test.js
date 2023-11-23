
// const passwordLength = (value) => {
//     // Mínimo ocho caracteres, al menos una letra, un número y un carácter especial:
//     const regexCode = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
//     return regexCode.test(value);
// }

// const inputPassword = "cio14#"; // Reemplaza esto con la contraseña que quieras verificar
// const isValidPassword = passwordLength(inputPassword);

// console.log(isValidPassword)
// const regexValidation = {}

// regexValidation.isEmail = (value) => {
//     const regexCode = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regexCode.test(value);
// };

// const email = "ramiroignacio_14@asdasdasasd.com";
// const isValidEmail = regexValidation.isEmail(email)


const usernameMinAndMax = (value) => {
    const regexCode = /^(?!.*_.*_)[a-z0-9_]{1,16}$/    ;
    return regexCode.test(value)
}

const username = "ramiro_1_45"
const validateUsername = usernameMinAndMax(username)

console.log(validateUsername)