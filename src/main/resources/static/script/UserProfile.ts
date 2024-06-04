export class UserProfile {
    firstName: string;
    lastName: string;
    constructor(firstName: string = '', lastName: string = '') {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    get getFirstName(): string {
        return this.firstName;
    }
    get getLastName(): string {
        return this.lastName;
    }
    setFirstName(firstName: string) {
        this.firstName = firstName;
    }
    setLastName(lastName: string) {
        this.lastName = lastName;
    }
}