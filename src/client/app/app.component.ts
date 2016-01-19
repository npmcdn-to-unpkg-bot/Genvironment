import {Component, OnInit} from "angular2/core";
import {ObjectTreeDirective} from "./object-tree/object-tree.directive";
import {RelaticsService} from "./relatics/relatics.service";
import {RelaticsDataTransformService} from "./object-tree/relatics-data-transform.service";
import {TaskList} from './task-list/task-list.component'

@Component({
    selector: "my-app",
    templateUrl: "app/app.html",
    providers: [RelaticsDataTransformService, RelaticsService],
    directives: [ObjectTreeDirective, TaskList]
})

export class AppComponent implements OnInit {

    webserviceError:boolean;
    graphData:any;


    constructor( public _RelaticsService:RelaticsService, public _RelaticsDataTransformService:RelaticsDataTransformService) {


    }

    ngOnInit() {

        // get URL parameters
        let parameters:string[] = window.location.href.split('#');
        let relaticsObject = {
            "operationName": parameters[1],
            "workspaceId": parameters[2],
            "entryCode": parameters[3],
            "objectId": parameters[4],
        };

        this.webserviceError = false;

        this._RelaticsService.GetData(relaticsObject.operationName, relaticsObject.workspaceId, relaticsObject.entryCode, relaticsObject.objectId)
            .then((val) =>
                this._RelaticsDataTransformService.ObjectTreeTransformation(val)
            )
            .then((val) => {
                this.graphData = val; // assigns object to this.graphdata
            })
            .catch((err) => {
                this.webserviceError = true;
                console.error("rejected:", err);   }
                )



}


}
