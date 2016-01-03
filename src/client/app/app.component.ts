import {Component, OnInit} from "angular2/core";
import {ObjectTreeDirective} from "./object-tree.directive";
import {RelaticsService} from "./relatics.service";
import {RelaticsDataTransformService} from "./relatics-data-transform.service";
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Router} from 'angular2/router';

@Component({
    selector: "my-app",
    templateUrl: "app/main.html",
    providers: [RelaticsDataTransformService, RelaticsService],
    directives: [ROUTER_DIRECTIVES, ObjectTreeDirective]
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
