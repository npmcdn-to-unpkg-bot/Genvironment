import {Component, Input} from 'angular2/core'
import {CourseOneService} from './course-1.service'

@Component({
    selector: 'course-1',
    template: `<h1>Hello bitiah van mij</h1>

        <ul>
        <li *ngFor="#item of items">
        
        {{item}}
</li>
        </ul>
`,
    providers: [CourseOneService]
})


export class CourseOneComponent {

    items:any;

    constructor(private _courseOneService:CourseOneService) {
        this.items = _courseOneService.data
    }


}