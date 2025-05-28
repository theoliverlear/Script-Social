import {
    AfterViewInit,
    Component,
    ElementRef,
    ViewChild
} from "@angular/core";
import {ConfettiService} from "../../../services/client/confetti.service";
import {
    SlideInElementService
} from "../../../services/client/slide-in-element.service";

@Component({
    selector: 'welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements AfterViewInit {
    @ViewChild('welcomeBanner', {read: ElementRef}) welcomeBanner: ElementRef;
    constructor(private confettiService: ConfettiService,
                private slideInElementService: SlideInElementService) {

    }
    ngAfterViewInit(): void {
        console.log('Welcome banner element:', this.welcomeBanner);
        this.confettiService.burstEffect();
        this.slideInWelcomeBanner();
    }
    async slideInWelcomeBanner(): Promise<void> {
        await this.slideInElementService.slideInElement(this.welcomeBanner);
    }
}