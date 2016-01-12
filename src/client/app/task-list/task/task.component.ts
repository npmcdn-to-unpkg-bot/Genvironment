import {Component, Input} from 'angular2/core'

@Component({
    templateUrl: 'app/task-list/task/task.html',
    selector: 'my-task',
})

export class Task {
    @Input() taskData;


}