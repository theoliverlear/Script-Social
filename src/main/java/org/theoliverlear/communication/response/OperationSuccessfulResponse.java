package org.theoliverlear.communication.response;
//=================================-Imports-==================================
import lombok.Data;

@Data
public class OperationSuccessfulResponse {
    //============================-Variables-=================================
    boolean successful;
    //===========================-Constructors-===============================
    public OperationSuccessfulResponse(boolean successful) {
        this.successful = successful;
    }
}
