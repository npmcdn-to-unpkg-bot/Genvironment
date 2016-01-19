import {Component, Input, Output, EventEmitter} from 'angular2/core'

@Component({
    selector: 'my-checkbox',
    templateUrl: 'app/ui/checkbox/checkbox.html',
})

export class Checkbox {
    @Input() label;
    @Input() checked;

    @Output() checkedChange = new EventEmitter();

    onCheckedChange(checked) {
        //console.log(checked);
        console.log(this.checkedChange.emit(checked));
        //this.checkedChange.emit(checked)
    }

}

