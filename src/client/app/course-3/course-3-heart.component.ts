import {Component, Input, Output} from 'angular2/core'

@Component({
    selector: 'fav',
    template: '<i class="glyphicon glyphicon-heart"></i> <p>{{item}}</p>'
})

export class CourseThreeHeartComponent {
    item:number;

    constructor() {
        this.item = 10;
    }


}