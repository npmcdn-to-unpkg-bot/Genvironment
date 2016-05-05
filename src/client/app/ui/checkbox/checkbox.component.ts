import {Component, Input, Output, EventEmitter} from '@angular/core'

@Component({
    selector: 'my-checkbox',
    templateUrl: 'app/ui/checkbox/checkbox.html',
})

export class Checkbox {
    @Input() label;
    @Input() checked;

    @Output() checkedChange = new EventEmitter();


    onCheckedChange(checked) {
        this.checkedChange.emit(checked);
    }

}

