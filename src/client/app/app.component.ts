import {Component, OnInit} from "@angular/core";
import {ROUTER_DIRECTIVES, RouteConfig} from '@angular/router';

import "rxjs/Rx";
import {CourseThreeComponent} from "./course-3/course-3.component";
import {CourseThreeOneComponent} from "./course-3-1/course-3-1.component";
import {CourseTwoComponent} from "./course-2/course-2.component";
import {ObjectTreeDirective} from "./object-tree/object-tree.directive";
import {RelaticsService} from "./relatics/relatics.service";
import {TaskList} from "./task-list/task-list.component";
import {CourseOneComponent} from "./course-1/course-1.component";


@RouteConfig([
    {path: '/', name: 'Main', component: CourseOneComponent, useAsDefault: true},
    {path: 'course-1_hihi', name: 'CourseOne', component: CourseOneComponent},
    {path: 'course-2', name: 'CourseTwo', component: CourseTwoComponent},
    {path: 'course-33', name: 'CourseThree', component: CourseThreeComponent},
    {path: '/*other', name: 'Other', redirectTo: ['CourseOne']}
])


@Component({
    selector: "my-app",
    templateUrl: "app/app.component.html",
    providers: [RelaticsService],
    directives: [ObjectTreeDirective, TaskList, CourseTwoComponent, CourseThreeComponent, CourseThreeOneComponent, ROUTER_DIRECTIVES]
})

export class AppComponent implements OnInit {


    constructor() {

    }

    ngOnInit() {
    }


}
