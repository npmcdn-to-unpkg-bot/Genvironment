import {Component} from "@angular/core";
import {CourseOneService} from "./course-1.service";
import {PostService} from './post.service'

@Component({
    selector: 'course-1',
    template: `<h1>Courses</h1>
        <p>The title of the courses page</p>
        <ul>
            <li *ngFor="let course of courses">
                 {{course}}
            </li>
        </ul>
        
        <h1>Authors</h1>
        <p>Title for the authors page</p>
        <ul>
            <li *ngFor="let author of authors">
                 {{author}}
            </li>
        </ul>
        
        <ul>
            <li *ngFor="let bmr of bmai">
                {{bmr}}
            </li>
        </ul>
`,
    providers: [CourseOneService, PostService]
})


export class CourseOneComponent {

    courses:string[];
    authors:string[];
    bmai:string;

    constructor(private _courseOneService:CourseOneService, private _postService:PostService) {
        this.courses = _courseOneService.data.courses;
        this.authors = _courseOneService.data.authors;
        (_postService.getPost().subscribe(data=>console.log(data)));

        _postService.getPost().subscribe(data => {


            this.bmai = data.author;

        })


    }


}