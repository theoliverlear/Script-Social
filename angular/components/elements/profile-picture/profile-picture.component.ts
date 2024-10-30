import {
    AfterViewInit,
    Component,
    Input,
    OnInit,
    ViewChild
} from "@angular/core";
import {defaultAvatar, ImageAsset} from "../../../assets/imageAssets";
import {SsImgComponent} from "../ss-img/ss-img.component";
import {
    ProfilePictureService
} from "../../../services/server/profile-picture.service";

@Component({
    selector: 'profile-picture',
    templateUrl: './profile-picture.component.html',
    styleUrls: ['./profile-picture-style.component.css']
})
export class ProfilePictureComponent implements AfterViewInit {
    @Input() userId: number = 0;
    @Input() isHeadlineProfilePicture: boolean = false;
    @ViewChild('profilePictureImage') profilePictureImage: SsImgComponent;
    constructor(private profilePictureService: ProfilePictureService) {
        console.log('ProfilePictureComponent created');
    }
    ngAfterViewInit() {
        if (this.userId == 0) {
            this.profilePictureImage.imageAsset = defaultAvatar;
            return;
        }
        this.profilePictureService.getHasProfilePictureFromServer(this.userId).subscribe((hasProfilePicture: boolean) => {
            console.log(`User ${this.userId} has profile picture: ${hasProfilePicture}`);
            if (hasProfilePicture) {
                let profilePictureAsset: ImageAsset = {
                    src: `localhost:8080/profile/get/${this.userId}/profile-picture`,
                    alt: 'Profile Picture'
                };
                this.profilePictureImage.imageAsset = profilePictureAsset;
            } else {
                this.profilePictureImage.imageAsset = defaultAvatar;
            }
        })
    }

    protected readonly defaultAvatar = defaultAvatar;
}