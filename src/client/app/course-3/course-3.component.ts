import {Component, Input, Output} from '@angular/core'
import {CourseThreeHeartComponent} from './course-3-heart.component'
@Component({
    selector: 'course-3',
    template: `<fav [isLike]="tweetes.isLike"  [totalLikes]="tweetes.totalLikes">

        
</fav>`,
    directives: [CourseThreeHeartComponent]
})

export class CourseThreeComponent {
    tweetes = {
        isLike: false,
        totalLikes: 10

    }

}