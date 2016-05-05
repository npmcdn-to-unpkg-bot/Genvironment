import {Component, Input} from '@angular/core'
import {Checkbox} from './../../ui/checkbox/checkbox.component'

@Component({
    templateUrl: 'app/task-list/task/task.html',
    selector: 'my-task',
    directives: [Checkbox]
})

export class Task {
    @Input() taskData;

    test(test) {
        this.taskData.done = !test;
    }



}