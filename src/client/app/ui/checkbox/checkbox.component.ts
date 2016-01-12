import {Component, Input, Output, EventEmitter} from 'angular2/core'

@Component({
    selector: 'my-checkbox',
    templateUrl: 'app/ui/checkbox/checkbox.html',
})

export default class Checkbox {
    @Input() label;
    @input() checked;

    @Output() checkedChange;

    onCheckedChange(checked) {
        this.checkedChange.next(checked)
    }

}

