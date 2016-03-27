import {Component, Input} from 'angular2/core'


@Component({
    selector: 'course-1',
    template: `<h1>Hello bitiah van mij</h1>

        <ul>
        <li *ngFor="#item of items">
        
        {{item}}
</li>
        </ul>
`
})


export class CourseOneComponent {

    items:string[];

    constructor() {
        this.items = ['as', 'as']
    }


}