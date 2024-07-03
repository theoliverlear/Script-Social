//=================================-Imports-==================================
import {ProfileIntention} from "./ProfileIntention";
import {EmploymentStatus} from "./EmploymentStatus";
import {Interest} from "./Interest";

export class WelcomeProfile {
    //============================-Variables-=================================
    private _firstName: string;
    private _lastName: string;
    private _birthDate: Date;
    private _interests: Interest[];
    private _employment: EmploymentStatus;
    private _profileIntention: ProfileIntention;
    private _bio: string;
    //===========================-Constructors-===============================
    constructor(firstName: string = '',
                lastName: string = '',
                birthDate: Date = new Date(),
                interests: Interest[] = [],
                employment: EmploymentStatus = EmploymentStatus.INDEPENDENT,
                profileIntention: ProfileIntention = ProfileIntention.SOCIALIZE,
                bio: string = '') {
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthDate = birthDate;
        this._interests = interests;
        this._employment = employment;
        this._profileIntention = profileIntention;
        this._bio = bio;
    }
    //=============================-Methods-==================================

    //----------------------------Add-Interest--------------------------------
    addInterest(interest: string): void {
        let parsedInterest: Interest = Interest.from(interest);
        console.log('Adding interest ', interest);
        this._interests.push(parsedInterest);
        console.log(this._interests);
    }
    //--------------------------Remove-Interest-------------------------------
    removeInterest(interest: string): void {
        console.log('Removing interest ', interest);
        let parsedInterest: Interest = Interest.from(interest);
        this._interests = this._interests.filter((currentInterest: Interest): boolean => {
            return currentInterest !== parsedInterest;
        });
        console.log(this._interests);
    }
    clearInterests(): void {
        this._interests = [];
    }
    toString(): string {
        return `First Name: ${this._firstName}, Last Name: ${this._lastName},
                Interests: ${this._interests}, Employment: ${this._employment},
                Profile Intention: ${this._profileIntention}`;
    }
    //=============================-Getters-==================================
    get firstName(): string {
        return this._firstName;
    }
    get lastName(): string {
        return this._lastName;
    }
    get birthDate(): Date {
        return this._birthDate;
    }
    get interests(): string[] {
        return this._interests;
    }
    get employment(): EmploymentStatus {
        return this._employment;
    }
    get profileIntention(): ProfileIntention {
        return this._profileIntention;
    }
    get bio(): string {
        return this._bio;
    }
    //=============================-Setters-==================================
    setFirstName(firstName: string): void {
        this._firstName = firstName;
    }
    setLastName(lastName: string): void {
        this._lastName = lastName;
    }
    setBirthDate(birthDate: Date): void {
        this._birthDate = birthDate;
    }
    setInterests(interests: Interest[]): void {
        this._interests = interests;
    }
    setEmployment(employment: EmploymentStatus): void {
        this._employment = employment;
    }
    setProfileIntention(profileIntention: ProfileIntention): void {
        this._profileIntention = profileIntention;
    }
    setBio(bio: string): void {
        this._bio = bio;
    }
}