import {Component} from 'angular2/core'
import {Task} from './task/task.component'


@Component({
    templateUrl:'app/task-list/task-list.html',
    selector:'my-task-list',
    directives:[Task]

})

export class TaskList {

    tasks:Array<any>;

    constructor() {
        this.tasks = [
            {title: 'Task 1', done: false},
            {title: 'Task 2', done: true}
        ]
    }





}