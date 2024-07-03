export class UserProfile {
    private _firstName: string;
    private _lastName: string;
    private _bio: string;
    constructor(firstName: string = '', lastName: string = '',
                bio: string = '') {
        this._firstName = firstName;
        this._lastName = lastName;
        this._bio = bio;
    }
    get fullName(): string {
        return `${this._firstName} ${this._lastName}`;
    }
    get getFirstName(): string {
        return this._firstName;
    }
    get getLastName(): string {
        return this._lastName;
    }
    get getBio(): string {
        return this._bio;
    }
    setFirstName(firstName: string) {
        this._firstName = firstName;
    }
    setLastName(lastName: string) {
        this._lastName = lastName;
    }
    setBio(bio: string) {
        this._bio = bio;
    }
}