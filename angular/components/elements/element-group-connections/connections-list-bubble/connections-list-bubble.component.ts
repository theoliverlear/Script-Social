import {
    AfterViewInit,
    Component, EventEmitter,
    HostBinding,
    HostListener,
    Input,
    Output
} from "@angular/core";

@Component({
    selector: 'connections-list-bubble',
    templateUrl: './connections-list-bubble.component.html',
    styleUrls: ['./connections-list-bubble.component.css']
})
export class ConnectionsListBubbleComponent {
    @HostBinding("class.add-conversation-mode") isAddConversationMode: boolean = false;
    @Input() connectionName: string;
    @HostBinding('class.selected') isSelected: boolean = false;
    @Output() clickEvent: EventEmitter<void> = new EventEmitter();
    constructor() {

    }
    @HostListener('click')
    handleClick() {
        this.clickEvent.emit();
    }
    select() {
        this.isSelected = true;
    }
    deselect() {
        this.isSelected = false;
    }
}