import {Component, OnInit} from "angular2/core";
import {ObjectTreeDirective} from "./object-tree/object-tree.directive";
import {RelaticsService} from "./relatics/relatics.service";
import {TaskList} from "./task-list/task-list.component";
import {BarChartDirective} from "./bar-chart/bar-chart.directive";
import {CourseTwoComponent} from "./course-2/course-2.component";
import {CourseThreeComponent} from "./course-3/course-3.component";
import "rxjs/Rx";
import {CourseThreeOneComponent} from "./course-3-1/course-3-1.component";

@Component({
    selector: "my-app",
    templateUrl: "app/app.component.html",
    providers: [RelaticsService],
    directives: [ObjectTreeDirective, BarChartDirective, TaskList, CourseTwoComponent, CourseThreeComponent, CourseThreeOneComponent]
})

export class AppComponent implements OnInit {

    webserviceError:boolean;
    graphData:any;
    gameData:any;


    constructor(private _RelaticsService:RelaticsService) {

    }

    ngOnInit() {
    }


}
