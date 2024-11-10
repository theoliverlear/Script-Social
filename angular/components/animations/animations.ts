import {
    animate, AnimationTriggerMetadata,
    state,
    style,
    transition,
    trigger
} from "@angular/animations";
import {sideNavBarSlideAnimationProperties} from "./animationProperties";
export const fixedFadeAnimation: AnimationTriggerMetadata = trigger('fixedFade', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms', style({ opacity: 1 }))
    ]),
    transition(':leave', [
        animate('250ms', style({ opacity: 0 }))
    ])
]);
export const fadeAnimation: AnimationTriggerMetadata = trigger('fade', [
    state('visible', style({ opacity: 1 })),
    state('hidden', style({ opacity: 0 })),
    transition('visible => hidden', [
        animate('{{ fadeOutDuration }}')
    ], { params: { fadeOutDuration: '250ms' } }),

    transition('hidden => visible', [
        animate('{{ fadeInDuration }}')
    ], { params: { fadeInDuration: '250ms' } })
]);
export const fadeIn: AnimationTriggerMetadata = trigger('fadeIn', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('{{ duration }} {{ delay }}', style({ opacity: 1 }))
    ])
]);
export const slideInOutAnimation: AnimationTriggerMetadata = trigger('slideInOut', [
    state('closed',
        style({
            width: '{{ closedWidth }}'
        }),
        {params: {
                closedWidth: sideNavBarSlideAnimationProperties.closedWidth
            }
        }
    ),
    state('opened', style({
            width: '{{ openedWidth }}'
        }),
        {params: {
                openedWidth: sideNavBarSlideAnimationProperties.openedWidth
            }
        }
    ),
    transition('closed <=> opened', [
        animate('0.15s')
    ])
]);
export const scrollFadeInAnimation: AnimationTriggerMetadata = trigger('scrollFadeIn', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('2500ms 500ms', style({ opacity: 1 }))
    ])
]);
