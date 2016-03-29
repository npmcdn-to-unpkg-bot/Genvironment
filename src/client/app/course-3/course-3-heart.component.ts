import {Component, Input, Output} from 'angular2/core'

@Component({
    selector: 'fav',
    template: '<i ' +
    'class="glyphicon glyphicon-heart" [class.highlighted]="isLike" (click)="onClick()"></i> <span>{{totalLikes}}</span> ',
    styles: [`
    .glyphicon-heart {
        
        color: #ccc;
        cursor:pointer;
        }
        
     .highlighted {
        color: deeppink;
     }
        
    `]
})

export class CourseThreeHeartComponent {
    @Input()
    isLike;
    @Input()
    totalLikes;

    constructor() {

    }

    onClick() {
        this.isLike = !this.isLike;
        this.totalLikes += this.isLike ? +1 : -1
    }


}