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

        this._RelaticsService.GetData('persons', '37035202-abf8-4822-b8a5-b492c97a4c83', '123456')
            .then((val) =>
                this._RelaticsDataTransformService.ObjectTreeTransformation(val)
            )
            .then((val) => {
                this.graphData = val; // assigns object to this.graphdata
            })
            .catch((err) => console.error("rejected:", err));


    }


}
