import {
    ElementRef,
    Injectable
} from "@angular/core";
import {
    animate,
    AnimationBuilder, AnimationFactory,
    AnimationPlayer, style
} from "@angular/animations";

@Injectable({
    providedIn: 'root'
})
export class SlideInElementService {
    constructor(private animationBuilder: AnimationBuilder) {

    }
    async slideInElement(element: ElementRef,
                         slideDuration: string = '3s ease-out'): Promise<void> {
        return new Promise((resolve) => {
            const animation: AnimationFactory = this.animationBuilder.build([
                style({ transform: 'translateY(100vh)'}),
                animate(slideDuration, style({ transform: 'translateY(0%)' })),
            ]);
            const player: AnimationPlayer = animation.create(element.nativeElement);
            player.onDone(() => {
                resolve();
            });
            player.play();
        });
    }
}