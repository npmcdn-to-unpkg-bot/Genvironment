import {Component} from "angular2/core";

import {BarChartDirective} from "../bar-chart/bar-chart.directive";



@Component({
    selector: 'course-2',
    template: `

        

        <i class="glyphicon" [class.active]="active"   (click)="changeClass()" ></i>
        <myBarChart [barChartData]="[1,1,1]">
    
</myBarChart>


`,
    directives: [BarChartDirective]
})


export class CourseTwoComponent {

    active;

    constructor() {
        this.active
    }

    changeClass() {


    }

}