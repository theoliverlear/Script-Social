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
//-----------------------------Send-Login-Request-----------------------------
export function sendLoginRequest(username: string, password: string): boolean {
    let hashedPassword: string = hashPassword(password);
    let isAuthorized: boolean = false;
    fetch('/authorize/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: hashedPassword
        })
    }).then((response: Response) => {
        return response.json();
    }).then(responseJson =>{
        isAuthorized = responseJson.authorized;
    }).catch((error): void => {
        console.error('Error: ', error);
    });
    return isAuthorized;
}
export function hashPassword(password: string): string {
    let hashedPassword: CryptoJS.lib.WordArray = CryptoJS.SHA256(password);
    return hashedPassword.toString();
}
//----------------------Get-Current-User-Id-From-Server-----------------------
export async function getCurrentUserIdFromServer(): Promise<number> {
    let response: Response = await fetch('/user/get/current/id');
    if (response.ok) {
        let responseJson: any = await response.json();
        return responseJson.userId;
    } else {
        return -1;
    }
}