import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import "rxjs/Rx";
import {BarChartDirective} from "./bar-chart/bar-chart.directive";
import {CourseThreeComponent} from "./course-3/course-3.component";
import {CourseThreeOneComponent} from "./course-3-1/course-3-1.component";
import {CourseTwoComponent} from "./course-2/course-2.component";
import {ObjectTreeDirective} from "./object-tree/object-tree.directive";
import {RelaticsService} from "./relatics/relatics.service";
import {TaskList} from "./task-list/task-list.component";
import {CourseOneComponent} from "./course-1/course-1.component";


@RouteConfig([
    {path: './course-1', name: 'CourseOne', component: CourseOneComponent, useAsDefault: true}
])


@Component({
    selector: "my-app",
    templateUrl: "app/app.component.html",
    providers: [RelaticsService],
    directives: [ObjectTreeDirective, BarChartDirective, TaskList, CourseTwoComponent, CourseThreeComponent, CourseThreeOneComponent, ROUTER_DIRECTIVES]
})

export class AppComponent implements OnInit {


    constructor(private _RelaticsService:RelaticsService) {

    }

    ngOnInit() {
    }


}
