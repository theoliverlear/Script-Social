export class UserProfile {
    //============================-Variables-=================================
    private _firstName: string;
    private _lastName: string;
    private _bio: string;
    //===========================-Constructors-===============================
    constructor(firstName: string = '', lastName: string = '',
                bio: string = '') {
        this._firstName = firstName;
        this._lastName = lastName;
        this._bio = bio;
    }
    //=============================-Getters-==================================
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
    //=============================-Setters-==================================
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