import * as CryptoJS from 'crypto-js';

export function sendSignupToServer(username: string, email: string, unwashedPassword: string): boolean {
    let hashedPassword: string = hashPassword(unwashedPassword);
    let isAuthorized: boolean = false;
    fetch('/authorize/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            username: username,
            password: hashedPassword
        })
    }).then((response: Response) => response.json()).then(responseJson => {
        console.log(responseJson);
        isAuthorized = responseJson.authorized;
    }).catch(error => {
        console.error('Error: ', error);
        isAuthorized = false;
    });
    return isAuthorized;
}
export function hashPassword(password: string): string {
    let hashedPassword: CryptoJS.lib.WordArray = CryptoJS.SHA256(password);
    return hashedPassword.toString();
}