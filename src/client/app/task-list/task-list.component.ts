import {Component} from '@angular/core'
import {Task} from './task/task.component'
import {EditTask} from './edit-task/edit-task.component'


@Component({
    templateUrl:'app/task-list/task-list.component.html',
    selector:'my-task-list',
    directives:[Task, EditTask]

})

export class TaskList {

    tasks:Array<any>;

    addTask(title) {
        this.tasks.push({title:title, done:false})
    }

    constructor() {
        this.tasks = [
            {title: 'Task 1', done: false},
            {title: 'Task 2', done: true}
        ]
    }

}