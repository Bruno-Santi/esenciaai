const regexValidation = {};

regexValidation.hasSpecialChar = (value) => {
    const regexCode = /[!@#$%^&*]/;
    return !regexCode.test(value);
};

regexValidation.hasUppercase = (value) => {
    const regexCode = /[A-Z]/;
    return !regexCode.test(value);
};

regexValidation.minAndMaxLength = (value, min, max) => {
    const regexCode = new RegExp(`^.{${min},${max}}$`);
    return !regexCode.test(value);
};

// regexValidation.minAndMaxLength = (value, min, max) => {
//     const regexCode = new RegExp(`^.{${min},${max}}$`);
//     return !regexCode.test(value);
// };

regexValidation.onlyLetters = (value) => {
    const regexCode = /^[A-Za-z\s]+$/;
    return !regexCode.test(value);
};


regexValidation.isEmail = (value) => {
    const regexCode = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCode.test(value);
};

regexValidation.isUrl = (value) => {
    const regexCode = /^(ftp|http|https):\/\/[^ "]+$/;
    return regexCode.test(value);
};

regexValidation.isString = (value) => {
    return typeof value === "string";
}

regexValidation.isNumber = (value) => {
    const regexCode = /^[0-9]+$/;
    return regexCode.test(value);
};

regexValidation.ageMinAndMax = (value) => {
    //de 16 a 99 años 
    const regexCode = /^(1[6-9]|[2-9][0-9])$/;
   return regexCode.test(value)
}

regexValidation.passwordLength = (value) => {
    //Mínimo ocho caracteres, al menos una letra, un número y un carácter especial:
    const regexCode = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regexCode.test(value)   
}

regexValidation.usernameMinAndMax = (value) => {
    const regexCode =  /^(?!.*_.*_)[a-z0-9_]{1,16}$/;
    return regexCode.test(value)
}

regexValidation.userName = (value) => {
    const regexCode = /^[A-Za-z]+ ?[A-Za-z]+$/
    return regexCode.test(value)
}

regexValidation.userLastName = (value) => {
   const regexCode = /^[A-Za-z']+$/
    return regexCode.test(value)
}

regexValidation.userGenre = (value) => {
    const regexCode = /^(masculino|femenino|otro)$/ 
    return regexCode.test(value)
}

regexValidation.isDateOfBirth = (value) => {
//Expresión regular para validar fechas en formato ISO 8601 (AAAA-MM-DD).
    const regexCode = /^\d{4}-\d{2}-\d{2}$/
    return regexCode.test(value)
}

regexValidation.userStatusInfo = (value) => {
    const regexCode = /^[a-zA-Z0-9.,]{1,60}$/
    return regexCode.test(value)
}

regexValidation.userRoles = (value) => {
    const regexCode = /^(admin|user|anonymous|business)$/;
    return regexCode.test(value)
}

regexValidation.userNickname = (value) => {
//Esta expresión regular valida cadenas que contienen solo letras minúsculas, números y guiones bajos,
//con una longitud máxima de 16 caracteres y no permite mayúsculas ni caracteres especiales.

    const regexCode = /^[a-z0-9_]{1,16}$/
    return regexCode.test(value)
}

regexValidation.isPhone = (value) => {
    // Valida una cadena de 10 dígitos numéricos consecutivos.}
    const regexCode = /^\d{10}$/
    return regexCode.test(value)
}

module.exports = regexValidation;