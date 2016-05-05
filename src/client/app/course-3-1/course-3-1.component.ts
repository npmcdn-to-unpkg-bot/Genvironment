import {Component} from "@angular/core";
import {ComponentOneThreeSubComponent} from './course-3-1-sub.component'

@Component({
    selector: 'course-3-1',
    template: `<ffav [voteCount]="votes.totalVotes">
            
            rwar
    
</ffav>`,
    directives: [ComponentOneThreeSubComponent]
})

export class CourseThreeOneComponent {
    votes = {
        isLike: false,
        totalVotes: 10

    }



}