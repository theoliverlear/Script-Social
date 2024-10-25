import {
  AfterViewInit,
  Component,
  EventEmitter,
  Output, QueryList,
  ViewChildren
} from '@angular/core';
import {defaultAvatar, hamburgerIcon, searchIcon} from "../../../assets/imageAssets";
import {TypeSpeed} from "../../../models/TypeSpeed";
import {TagType} from "../../../models/html/TagType";
import {TypingTextComponent} from "../typing-text/typing-text.component";
import {TargetType} from "../../../models/html/TargetType";
import {
  navBarAccountElementLink,
  navBarHomeElementLink,
  navBarSearchElementLink
} from "../../../assets/elementLinkAssets";

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar-style.component.css']
})
export class NavBarComponent implements AfterViewInit{
  navBarDisplayed: boolean = false;
  @Output() navBarDisplayedEvent: EventEmitter<void> = new EventEmitter();
  @ViewChildren('typingTextComponent') typingTextComponents: QueryList<TypingTextComponent>;
  async displayNavBar(): Promise<void> {
    this.navBarDisplayed = true;
    this.navBarDisplayedEvent.emit();
    for (let typingTextComponent of this.typingTextComponents.toArray()) {
      await typingTextComponent.typeText();
    }
  }
  async hideNavBar(): Promise<void> {
    for (let typingTextComponent of this.typingTextComponents.toArray().reverse()) {
      await typingTextComponent.deleteText();
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
  protected readonly TargetType = TargetType;
  protected readonly navBarHomeElementLink = navBarHomeElementLink;
  protected readonly navBarSearchElementLink = navBarSearchElementLink;
  protected readonly navBarAccountElementLink = navBarAccountElementLink;
}
