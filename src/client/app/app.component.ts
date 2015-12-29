import {Component, OnInit} from "angular2/core";
import {ObjectTree} from "./object-tree.directive";
import {RelaticsService} from "./relatics.service";
import {RelaticsDataTransformService} from "./relatics-data-transform.service";


@Component({
    selector: "my-app",
    templateUrl: "app/main.html",
    providers: [RelaticsDataTransformService, RelaticsService],
    directives: [ObjectTree]
})


export class AppComponent implements OnInit {

    public graphData:any;


    constructor(public _RelaticsService:RelaticsService, public _RelaticsDataTransformService:RelaticsDataTransformService) {


    }


    ngOnInit() {

        let x = this._RelaticsService;
        let y = this._RelaticsDataTransformService;


        x.GetData('persons', '37035202-abf8-4822-b8a5-b492c97a4c83', '123456')
            .then(function (data) {
                return y.ObjectTreeTransformation(data);
            }).then(function (data) {
                return this.graphData = "wakeup markus";
            });

        console.log(this.graphData)
    }


}
