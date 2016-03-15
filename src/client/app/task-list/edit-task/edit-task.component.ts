import {Component, Output, EventEmitter} from "angular2/core";

@Component({
    selector: 'my-enter-task',
    templateUrl: 'app/task-list/edit-task/edit-task.component.html',

})

export class EditTask {

    @Output() taskEntered = new EventEmitter();


    enterTask(titleInput) {
        if (titleInput.value) {
            this.taskEntered.emit(titleInput.value);
            console.log(titleInput.value);
            titleInput.value = '';
        }

    }


}