import {animate, style, transition, trigger} from "@angular/animations";

export const fadeAnimation = trigger('fade', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms', style({ opacity: 1 }))
    ]),
    transition(':leave', [
        animate('250ms', style({ opacity: 0 }))
    ])
]);