import {Component} from "angular2/core";

import {BarChartDirective} from "../bar-chart/bar-chart.directive";
import {PostService} from '../course-1/post.service'


@Component({
    selector: 'course-2',
    template: `

        

        <i class="glyphicon" [class.active]="active"   (click)="changeClass()" ></i>
        <myBarChart [barChartData]="bmai">
    
</myBarChart>

        <button (click)="getNewData()">KLIK ME</button>


`,
    directives: [BarChartDirective],
    providers: [PostService]
})


export class CourseTwoComponent {

    active;
    bmai:number[];

    constructor(private _postService:PostService) {

        _postService.getPost().subscribe(data => {


            this.bmai = data.author;

        })
    }

    getNewData() {

        this._postService.getPost().subscribe(data => {


            this.bmai = data.author;

        })
    }


    changeClass() {


    }

}