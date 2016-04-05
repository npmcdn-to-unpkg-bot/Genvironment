import {Component, Input, Output} from "angular2/core";


@Component({
    selector: 'ffav',
    template: `

<div style="width: 20px;display: flex;flex-direction: column;align-items: center">

<i class="glyphicon glyphicon-menu-up" (click)="onClick()"></i>
<span>{{voteCount}}</span>
<i class="glyphicon glyphicon-menu-down" (click)="onClick()"></i>

</div>
`


})

export class ComponentOneThreeSubComponent {
    @Input()
    voteCount;
    // @Input()
    // myVote;
    // @Output()
    // vote;

    constructor() {

    }

    onClick() {

        console.log('asda')

    }


}