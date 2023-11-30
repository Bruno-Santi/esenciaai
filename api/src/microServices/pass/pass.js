const passwordGenerator = require('password-generator');

const passAsigne = () => {
    const contraseña = passwordGenerator(6, false);
    console.log(`Contraseña generada: ${contraseña}`);

}


module.exports = passAsigne;