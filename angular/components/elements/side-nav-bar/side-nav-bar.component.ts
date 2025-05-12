import {
    AfterViewInit,
    Component,
    ElementRef,
    HostBinding,
    Renderer2
} from "@angular/core";
import {
    SideNavBarButtonType
} from "../side-nav-bar-button/models/SideNavBarButtonType";
import {SwipeService} from "../../../services/swipe.service";
import {SwipeDirection} from "../../events/models/SwipeDirection";
import {SwipeEvent} from "../../events/SwipeEvent";
import {
    slideInOutAnimation
} from "../../animations/animations";
import {
    sideNavBarSlideAnimationProperties
} from "../../animations/animationProperties";

@Component({
    selector: 'side-nav-bar',
    templateUrl: './side-nav-bar.component.html',
    styleUrls: ['./side-nav-bar.component.css'],
    animations: [slideInOutAnimation]
})
export class SideNavBarComponent implements AfterViewInit {
    sideNavBarExpanded: boolean = false;
    @HostBinding('class.side-nav-closed') isSideNavClosed = true;
    @HostBinding('@slideInOut') get slideAnimation(): {
        params: { openedWidth: string; closedWidth: string };
        value: "opened" | "closed"
    } {
        return {
            value: this.sideNavBarExpanded ? 'opened' : 'closed',
            params: {
                closedWidth: sideNavBarSlideAnimationProperties.closedWidth,
                openedWidth: sideNavBarSlideAnimationProperties.openedWidth
            }
        }
    }
    constructor(private element: ElementRef, private renderer: Renderer2, private swipeService: SwipeService) {
        console.log('SideNavBarComponent loaded');
    }
    ngAfterViewInit(): void {
        const sideNavBarElement = this.element.nativeElement;
        console.log('sideNavBarElement', sideNavBarElement);
        this.swipeService.detectSwipe(sideNavBarElement, (event: SwipeEvent): void => {
            console.log('swipe event', event);
            if (event.direction === SwipeDirection.LEFT && this.sideNavBarExpanded) {
                this.toggleSideNavBarPopout();
            } else if (event.direction === SwipeDirection.RIGHT && !this.sideNavBarExpanded) {
                this.toggleSideNavBarPopout();
            }
        });
    }
    toggleSideNavBarPopout(): void {
        this.sideNavBarExpanded = !this.sideNavBarExpanded;
        this.flipSideBarTabImage();
        this.toggleTextVisibility();
        const sideNavBarElement = this.element.nativeElement;
        console.log('sideNavBarElement in toggle', sideNavBarElement);
        if (this.sideNavBarExpanded) {
            this.renderer.removeClass(sideNavBarElement, 'side-nav-closed');
            this.renderer.addClass(sideNavBarElement, 'side-nav-open');
        } else {
            this.renderer.removeClass(sideNavBarElement, 'side-nav-open');
            this.renderer.addClass(sideNavBarElement, 'side-nav-closed');
        }
    }
    toggleTextVisibility(): void {
        const sideNavBarText = this.element.nativeElement.querySelectorAll('.side-bar-icon-title-div');
        if (this.sideNavBarExpanded) {
            sideNavBarText.forEach((text: Element) => {
                this.renderer.setStyle(text, 'display', 'flex');
            });
        } else {
            sideNavBarText.forEach((text: Element) => {
                this.renderer.setStyle(text, 'display', 'none');
            });
        }
    }
    flipSideBarTabImage(): void {
        const sideBarTabImg = this.element.nativeElement.querySelector('#side-bar-tab-img');
        if (this.sideNavBarExpanded) {
            this.renderer.setStyle(sideBarTabImg, 'transform', 'rotate(180deg)');
        } else {
            this.renderer.setStyle(sideBarTabImg, 'transform', 'rotate(0deg)');
        }
    }
    protected readonly SideNavBarButtonType = SideNavBarButtonType;
}