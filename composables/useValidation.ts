export function useValidation() {
    function isValidEmail(email: string) {
        if (email.length <= 5) return false; // skip validation for short input

        const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return re.test(email);
    }

    function isValidPassword(password: string) {
        /*
             - Minimum 8 characters
             - At least one uppercase letter
             - At least one lowercase letter
             - At least one number
             - At least one special character
         */
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return re.test(password);
    }

    return { isValidEmail, isValidPassword };
}