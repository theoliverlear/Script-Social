export enum ProfileIntention {
    //============================-Variables-=================================
    NETWORKING = 'Networking',
    GETTING_INVOLVED = 'Getting Involved',
    CONNECT_TEAM = 'Connect with Team',
    FIND_TEAM = 'Find a Team',
    SOCIALIZE = 'Socialize',
    JOB_SEARCH = 'Job Search',
    LEARN = 'Learn'
}
export namespace ProfileIntention {
    export function from(profileIntentionString: string): ProfileIntention {
        let profileIntention: ProfileIntention;
        switch(profileIntentionString) {
            case ProfileIntention.NETWORKING:
                profileIntention = ProfileIntention.NETWORKING;
                break;
            case ProfileIntention.GETTING_INVOLVED:
                profileIntention = ProfileIntention.GETTING_INVOLVED;
                break;
            case ProfileIntention.CONNECT_TEAM:
                profileIntention = ProfileIntention.CONNECT_TEAM;
                break;
            case ProfileIntention.FIND_TEAM:
                profileIntention = ProfileIntention.FIND_TEAM;
                break;
            case ProfileIntention.SOCIALIZE:
                profileIntention = ProfileIntention.SOCIALIZE;
                break;
            default:
                throw new Error('Invalid Profile Intention');
        }
        return profileIntention;
    }
}