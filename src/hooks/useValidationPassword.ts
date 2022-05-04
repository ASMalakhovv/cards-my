export const useValidationPassword = (passwordOne: string, passwordTwo: string, email: string): [error: string | null, test: boolean] => {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let error: string | null = null
    let test: boolean = true
    if (!reg.test(email)) {
        error = "Invalid format email"
        test = false
        return [error, test]
    } else if (passwordOne && passwordOne.length < 7) {
        error = "Password must be more than 7 characters"
        test = false
        return [error, test]
    } else if (passwordOne !== passwordTwo) {
        error = "passwords do not match"
        test = false
        return [error, test]
    }
    return [error, test]
}