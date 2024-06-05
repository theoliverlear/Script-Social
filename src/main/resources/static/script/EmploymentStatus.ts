export enum EmploymentStatus {
    //============================-Variables-=================================
    INDEPENDENT = 'Independent',
    EMPLOYED = 'Employed',
    SEEKING_EMPLOYMENT = 'Seeking Employment',
    STUDENT = 'Student',
    HOBBYIST = 'Hobbyist',
    BUILDING_TEAM = 'Building Team'
}
export namespace EmploymentStatus {
    export function from(employmentStatusString: string): EmploymentStatus {
        let employmentStatus: EmploymentStatus;
        switch(employmentStatusString) {
            case EmploymentStatus.INDEPENDENT:
                employmentStatus = EmploymentStatus.INDEPENDENT;
                break;
            case EmploymentStatus.EMPLOYED:
                employmentStatus = EmploymentStatus.EMPLOYED;
                break;
            case EmploymentStatus.SEEKING_EMPLOYMENT:
                employmentStatus = EmploymentStatus.SEEKING_EMPLOYMENT;
                break;
            case EmploymentStatus.STUDENT:
                employmentStatus = EmploymentStatus.STUDENT;
                break;
            case EmploymentStatus.HOBBYIST:
                employmentStatus = EmploymentStatus.HOBBYIST;
                break;
            case EmploymentStatus.BUILDING_TEAM:
                employmentStatus = EmploymentStatus.BUILDING_TEAM;
                break;
            default:
                throw new Error('Invalid Employment Status');
        }
        return employmentStatus;
    }
    export function toString() {
        return this.toString();
    }
}