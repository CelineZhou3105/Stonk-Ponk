export const checkPassword = (pass, passConfirm) => {
    if (pass.length <= 8) {
        alert("Password must be longer than 8 characters/digits.");
        return false;
    }
    if (pass.match(/[A-Z]/) === null) {
        alert("Password must include at least 1 upper case letter.");
        return false;
    }
    if (pass.match(/[a-z]/) === null) {
        alert("Password must include at least 1 lower case letter.");
        return false;
    }
    if (pass.match(/\d/) === null) {
        alert("Password must include at least 1 number.");
        return false;
    }
    if (pass.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]+/) === null) {
        alert("Password must include at least 1 special character.");
        return false;
    }
    if (pass !== passConfirm) {
        alert("Passwords does not match! Re-enter your password.");
        return false;
    }
    return true;
}