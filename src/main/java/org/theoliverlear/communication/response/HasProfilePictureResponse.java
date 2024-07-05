package org.theoliverlear.communication.response;
//=================================-Imports-==================================
import lombok.Data;

@Data
public class HasProfilePictureResponse {
    //============================-Variables-=================================
    boolean hasProfilePicture;
    //===========================-Constructors-===============================
    public HasProfilePictureResponse(boolean hasProfilePicture) {
        this.hasProfilePicture = hasProfilePicture;
    }
}
