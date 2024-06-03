export enum Interest {
    SOFTWARE_DEVELOPMENT = 'Software Development',
    WEB_DEVELOPMENT = 'Web Development',
    MOBILE_DEVELOPMENT = 'Mobile Development',
    DATABASE_MANAGEMENT = 'Database Management',
    CYBERSECURITY = 'Cybersecurity',
    DATA_SCIENCE = 'Data Science',
    GAME_DEVELOPMENT = 'Game Development',
    TEAM_BUILDING = 'Team Building',
    PROJECT_MANAGEMENT = 'Project Management',
    ARTIFICIAL_INTELLIGENCE = 'Artificial Intelligence'
}
export namespace Interest {
    export function from(interestString: string): Interest {
        let interest: Interest;
        switch(interestString) {
            case Interest.SOFTWARE_DEVELOPMENT:
                interest = Interest.SOFTWARE_DEVELOPMENT;
                break;
            case Interest.WEB_DEVELOPMENT:
                interest = Interest.WEB_DEVELOPMENT;
                break;
            case Interest.MOBILE_DEVELOPMENT:
                interest = Interest.MOBILE_DEVELOPMENT;
                break;
            case Interest.DATABASE_MANAGEMENT:
                interest = Interest.DATABASE_MANAGEMENT;
                break;
            case Interest.CYBERSECURITY:
                interest = Interest.CYBERSECURITY;
                break;
            case Interest.DATA_SCIENCE:
                interest = Interest.DATA_SCIENCE;
                break;
            case Interest.GAME_DEVELOPMENT:
                interest = Interest.GAME_DEVELOPMENT;
                break;
            case Interest.TEAM_BUILDING:
                interest = Interest.TEAM_BUILDING;
                break;
            case Interest.PROJECT_MANAGEMENT:
                interest = Interest.PROJECT_MANAGEMENT;
                break;
            case Interest.ARTIFICIAL_INTELLIGENCE:
                interest = Interest.ARTIFICIAL_INTELLIGENCE;
                break;
            default:
                throw new Error('Error in parsing Interest');
        }
        return interest;
    }
}