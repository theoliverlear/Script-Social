import {Injectable} from "@angular/core";
import {WelcomeService} from "./server/welcome.service";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class WelcomeRedirectService {
    constructor(private welcomeService: WelcomeService,
                private router: Router) {
        console.log('WelcomeRedirectService loaded');
    }
    redirectToWelcome() {
        this.router.navigate(['/welcome']);
    }
    checkWelcomeAndRedirect() {
        this.welcomeService.getWelcomeCompletedFromServer().subscribe(welcomeCompleted => {
            if (!welcomeCompleted) {
                this.redirectToWelcome();
            }
        });
    }
}