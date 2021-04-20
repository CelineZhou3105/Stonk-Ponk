export const checkPassword = (pass, passConfirm) => {
    if (pass.length <= 8) {
        return "Password must be longer than 8 characters/digits.";
    }
    if (pass.match(/[A-Z]/) === null) {
        return "Password must include at least 1 upper case letter.";
    }
    if (pass.match(/[a-z]/) === null) {
        return "Password must include at least 1 lower case letter.";
    }
    if (pass.match(/\d/) === null) {
        return "Password must include at least 1 number.";
    }
    if (pass.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/) === null) {
        return "Password must include at least 1 special character."
    }
    if (pass !== passConfirm) {
        return "Passwords does not match! Re-enter your password.";
    }
    return 'success';
}