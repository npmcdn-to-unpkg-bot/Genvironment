import {Component, OnInit} from "angular2/core";
import {ObjectTreeDirective} from "./object-tree/object-tree.directive";
import {RelaticsService} from "./relatics/relatics.service";
import {RelaticsDataTransformService} from "./object-tree/relatics-data-transform.service";
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Router} from 'angular2/router';
import {TaskList} from './task-list/task-list.component'

@Component({
    selector: "my-app",
    templateUrl: "app/app.html",
    providers: [RelaticsDataTransformService, RelaticsService],
    directives: [ROUTER_DIRECTIVES, ObjectTreeDirective, TaskList]
})

export class AppComponent implements OnInit {

    graphData:any;


    constructor(private _router:Router, public _RelaticsService:RelaticsService, public _RelaticsDataTransformService:RelaticsDataTransformService) {


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

        this._RelaticsService.GetData(relaticsObject.operationName, relaticsObject.workspaceId, relaticsObject.entryCode, relaticsObject.objectId)
            .then((val) =>
                this._RelaticsDataTransformService.ObjectTreeTransformation(val)
            )
            .then((val) => {
                this.graphData = val; // assigns object to this.graphdata
            })
            .catch((err) => console.error("rejected:", err));


    }


}
