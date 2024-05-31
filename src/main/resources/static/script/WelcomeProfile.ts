//=================================-Imports-==================================
import {ProfileIntention} from "./ProfileIntention";
import {EmploymentStatus} from "./EmploymentStatus";

export class WelcomeProfile {
    //============================-Variables-=================================
    private _firstName: string;
    private _lastName: string;
    private _interests: string[];
    private _employment: EmploymentStatus;
    private _profileIntention: ProfileIntention;
    //===========================-Constructors-===============================
    constructor(firstName: string = '',
                lastName: string = '',
                interests: string[] = [],
                employment: EmploymentStatus = EmploymentStatus.INDEPENDENT,
                profileIntention: ProfileIntention = ProfileIntention.SOCIALIZE) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._interests = interests;
        this._employment = employment;
        this._profileIntention = profileIntention;
    }
    //=============================-Methods-==================================

    //----------------------------Add-Interest--------------------------------
    addInterest(interest: string): void {
        this._interests.push(interest);
    }
    //--------------------------Remove-Interest-------------------------------
    removeInterest(interest: string): void {
        this._interests = this._interests.filter((currentInterest: string): boolean => currentInterest !== interest);
    }
    //=============================-Getters-==================================
    get firstName(): string {
        return this._firstName;
    }
    get lastName(): string {
        return this._lastName;
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
    //=============================-Setters-==================================
    setFirstName(firstName: string): void {
        this._firstName = firstName;
    }
    setLastName(lastName: string): void {
        this._lastName = lastName;
    }
    setInterests(interests: string[]): void {
        this._interests = interests;
    }
    setEmployment(employment: EmploymentStatus): void {
        this._employment = employment;
    }
    setProfileIntention(profileIntention: ProfileIntention): void {
        this._profileIntention = profileIntention;
    }

}