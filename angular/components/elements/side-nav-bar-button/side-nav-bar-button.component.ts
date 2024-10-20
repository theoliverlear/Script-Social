import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {SideNavBarButtonType} from "./models/SideNavBarButtonType";
import {SsImgComponent} from "../ss-img/ss-img.component";

@Component({
    selector: 'side-nav-bar-button',
    templateUrl: './side-nav-bar-button.component.html',
    styleUrls: ['./side-nav-bar-button-style.component.css']
})
export class SideNavBarButtonComponent {
    @Input() sideNavBarButtonType: SideNavBarButtonType;
    @ViewChild(SsImgComponent) iconImage: SsImgComponent;
    constructor() {
        console.log('SideNavBarButtonComponent loaded');
    }
    isPopoutButton(): boolean {
        return this.sideNavBarButtonType.equals(SideNavBarButtonType.POPOUT_TAB);
    }
}