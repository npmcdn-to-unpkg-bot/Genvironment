import {Component} from "angular2/core";


@Component({
    selector: 'course-2',
    template: `

        <i class="glyphicon" [class.active]="active"   (click)="changeClass()" ></i>


`
})


export class CourseTwoComponent {

    active;

    constructor() {
        this.active
    }

    changeClass() {


    }

}