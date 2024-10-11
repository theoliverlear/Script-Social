import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output, QueryList,
  ViewChildren
} from '@angular/core';
import {defaultAvatar, hamburgerIcon, searchIcon} from "../../assets/imageAssets";
import {TypeSpeed} from "../../models/TypeSpeed";
import {TagType} from "../../models/TagType";
import {TypableTextComponent} from "../typable-text/typable-text.component";

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar-style.component.css']
})
export class NavBarComponent implements AfterViewInit{
  navBarDisplayed: boolean = false;
  @Output() navBarDisplayedEvent: EventEmitter<void> = new EventEmitter();
  @ViewChildren('typableTextComponent') typableTextComponents: QueryList<TypableTextComponent>;
  async displayNavBar(): Promise<void> {
    this.navBarDisplayed = true;
    this.navBarDisplayedEvent.emit();
    for (let typableTextComponent of this.typableTextComponents.toArray()) {
      await typableTextComponent.typeText();
    }
  }
  async hideNavBar(): Promise<void> {
    for (let typableTextComponent of this.typableTextComponents.toArray().reverse()) {
      await typableTextComponent.deleteText();
    }
    this.navBarDisplayed = false;
  }
  toggleNavBar(): void {
    console.log('toggling nav bar');
    if (this.navBarDisplayed) {
      this.hideNavBar();
    } else {
      this.displayNavBar();
    }
  }

ngAfterViewInit() {

}

  protected readonly hamburgerIcon = hamburgerIcon;
  protected readonly searchIcon = searchIcon;
  protected readonly defaultAvatar = defaultAvatar;

  protected readonly TypeSpeed = TypeSpeed;
  protected readonly TagType = TagType;
}
