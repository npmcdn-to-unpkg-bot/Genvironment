import {Component} from "angular2/core";
import {CourseOneService} from "./course-1.service";

@Component({
    selector: 'course-1',
    template: `<h1>Courses</h1>
        <p>The title of the courses page</p>
        <ul>
            <li *ngFor="#course of courses">
                 {{course}}
            </li>
        </ul>
        
        <h1>Authors</h1>
        <p>Title for the authors page</p>
        <ul>
            <li *ngFor="#author of authors">
                 {{author}}
            </li>
        </ul>
`,
    providers: [CourseOneService]
})


export class CourseOneComponent {

    courses:string[];
    authors:string[];

    constructor(private _courseOneService:CourseOneService) {
        this.courses = _courseOneService.data.courses;
        this.authors = _courseOneService.data.authors;
    }


}