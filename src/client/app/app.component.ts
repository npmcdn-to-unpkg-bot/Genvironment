import {Component, OnInit} from "angular2/core";
import {ObjectTree} from "./object-tree.directive";
import {RelaticsService} from "./relatics.service";


@Component({
    selector: "my-app",
    templateUrl: "app/main.html",
    providers: [RelaticsService],
    directives: [ObjectTree]
})


export class AppComponent {

    public graphData = {};
    constructor(private _RelaticsService:RelaticsService) {

    }




    ngOnInit() {
        let x = RelaticsService();


    }


}
