import {Component, HostBinding, Input} from "@angular/core";
import {fadeIn} from "../../../animations/animations";
import {
    FadeInAnimationProperties
} from "../../../animations/models/FadeInAnimationProperties";

@Component({
    selector: 'fade-in-content',
    templateUrl: './fade-in-content.component.html',
    styleUrls: ['./fade-in-content.component.css'],
    animations: [
        fadeIn
    ]
})
export class FadeInContentComponent {
    @Input() animationProperties: FadeInAnimationProperties;
    @HostBinding('@fadeIn') get fadeIn() {
        return {
            value: '',
            params: {
                delay: this.animationProperties.delay,
                duration: this.animationProperties.duration
            }
        }
    }
    constructor() {
        console.log('FadeInElementComponent loaded');
    }
}