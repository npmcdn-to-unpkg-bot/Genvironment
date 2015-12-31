import {Component, OnInit} from "angular2/core";
import {ObjectTreeDirective} from "./object-tree.directive";
import {RelaticsService} from "./relatics.service";
import {RelaticsDataTransformService} from "./relatics-data-transform.service";


@Component({
    selector: "my-app",
    templateUrl: "app/main.html",
    providers: [RelaticsDataTransformService, RelaticsService],
    directives: [ObjectTreeDirective]
})


export class AppComponent implements OnInit {

    graphData:any;


    constructor(public _RelaticsService:RelaticsService, public _RelaticsDataTransformService:RelaticsDataTransformService) {


    }

    ngOnInit() {

        this._RelaticsService.GetData('persons', '37035202-abf8-4822-b8a5-b492c97a4c83', '123456')
            .then((val) =>
                this._RelaticsDataTransformService.ObjectTreeTransformation(val)
            )
            .then((val) => {
                this.graphData = val; // assigns object to this.graphdata
                console.log(this.graphData); // logs object
            })
            .catch((err) => console.log("rejected:", err));


    }


}
