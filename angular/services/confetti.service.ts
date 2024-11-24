import {Injectable} from "@angular/core";
import confetti, {Origin} from "canvas-confetti";

@Injectable({
    providedIn: 'root'
})
export class ConfettiService {
    private static readonly DEFAULT_ORIGIN: Origin = {
        y: 0.6
    }
    constructor() {
        console.log('ConfettiService loaded');
    }
    async burstEffect(particleCount: number = 100,
                      spread: number = 150,
                      origin: Origin = ConfettiService.DEFAULT_ORIGIN): Promise<void> {
        return new Promise(resolve => {
            confetti({
                particleCount: particleCount,
                spread: spread,
                origin: origin
            }).then((): void => {
                resolve();
            });
        });
    }
}