document.addEventListener('DOMContentLoaded', () => {
    const lengthValue = document.getElementById('len_value');
    const passwordLength = document.getElementById('character_len');
    const generatePasswordButton = document.getElementById('gen_btn');
    const passwordOutput = document.getElementById('password_box');
    const passwordStrength = document.getElementById('strength_showing_box');
    const copyPasswordButton = document.getElementById('copy_password');
    const includeUppercase = document.getElementById('upper');
    const includeLowercase = document.getElementById('lower');
    const includeNumbers = document.getElementById('numbers');
    const includeSymbols = document.getElementById('Symbols');

    passwordLength.addEventListener('input', () => {
        lengthValue.textContent = `Character length = ${passwordLength.value}`;
    });

    generatePasswordButton.addEventListener('click', () => {
        const length = parseInt(passwordLength.value, 10);
        const options = {
            includeUppercase: includeUppercase.checked,
            includeLowercase: includeLowercase.checked,
            includeNumbers: includeNumbers.checked,
            includeSymbols: includeSymbols.checked
        };
        const password = generateRandomPassword(length, options);
        passwordOutput.value = password; 
        assessPasswordStrength(password, options);
    });

    copyPasswordButton.addEventListener('click', () => {
        passwordOutput.select();
        document.execCommand('copy');
        alert('Password copied to clipboard!');
    });

    function generateRandomPassword(length, options) {
        const upperCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCharset = 'abcdefghijklmnopqrstuvwxyz';
        const numberCharset = '0123456789';
        const symbolCharset = '!@#$%^&*()';
        let charset = '';

        if (options.includeUppercase) charset += upperCharset;
        if (options.includeLowercase) charset += lowerCharset;
        if (options.includeNumbers) charset += numberCharset;
        if (options.includeSymbols) charset += symbolCharset;

        if (!charset) return '';

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }

    function assessPasswordStrength(password, options) {
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSymbol = /[!@#$%^&*()]/.test(password);

        if (hasUpper && hasLower && hasNumber && hasSymbol) {
            passwordStrength.textContent = 'Strong Password';
            passwordStrength.style.color = 'green';
        } else if ((hasUpper && hasLower && hasNumber) || (hasUpper && hasLower && hasSymbol)) {
            passwordStrength.textContent = 'Medium Password';
            passwordStrength.style.color = 'orange';
        } else {
            passwordStrength.textContent = 'Weak Password';
            passwordStrength.style.color = 'red';
        }
    }
});
