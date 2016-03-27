import {Component, OnInit} from "angular2/core";
import {ObjectTreeDirective} from "./object-tree/object-tree.directive";
import {RelaticsService} from "./relatics/relatics.service";
import {TaskList} from "./task-list/task-list.component";
import {BarChartDirective} from "./bar-chart/bar-chart.directive";
import {GameComponent} from "./games/games.component";
import "rxjs/Rx";

@Component({
    selector: "my-app",
    templateUrl: "app/app.component.html",
    providers: [RelaticsService],
    directives: [ObjectTreeDirective, BarChartDirective, TaskList, GameComponent]
})

export class AppComponent implements OnInit {

    webserviceError:boolean;
    graphData:any;
    gameData:any;


    constructor(private _RelaticsService:RelaticsService) {

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

    }


}
