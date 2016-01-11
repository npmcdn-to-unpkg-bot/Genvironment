import {Component} from 'angular2/core'
import {bootstrap} from 'angular2/platform/browser'


@Component({
    selector: 'user-info',
    styles: [`
     .user-info {
         border: 1px solid white;
         padding: 5px;
     }
    .active {
     font-weight: bold;
     color: green;
    }
    .manager {
     background-color: lightyellow;
    }

     `],
    template: `
     <div class="user-info" [ngClass]="{manager: User.role === 'manager'}">
        <p [ngStyle]="{'font-size': fontSize}" *ngIf="!editMode">
 Name: {{User.name}}
 </p>


 <p *ngIf="!editMode">Email: {{User.email}}</p>

  <p *ngIf="editMode">
 <input #email
 type="text"
 (blur)="emailChanged(email.value)"
 placeholder="Enter your Email...">
 </p>
         <p>Birthday: {{User.birthday}}</p>
         <p>gender: {{User.gender}}</p>
          <div [ngSwitch]="User.status">
             <p *ngSwitchWhen="'active'">Status: active</p>
             <p *ngSwitchWhen="'suspended'">Status: suspended</p>
             <p *ngSwitchDefault>No Status defined.</p>
           </div>

         <ul>
                <li *ngFor="#number of User.phoneNumbers">{{number}}</li>
    </ul>
   <button (click)="toggleEditMode()">Edit</button>


    </div>
      `
})
export class UserInformation {

    toggleEditMode() {
        this.editMode = !this.editMode;
    }


    fontSize = '22px';
    disableEdit = false;
    showEmail = false;

    toggleEmail() {
        this.showEmail = !this.showEmail
    }

    emailChanged(value) {
        this.User.email = value;
    }


    User = {
        name: 'konjo',
        email: 'nir@email.com',
        birthday: '11/02/1981',
        gender: 'male',
        status: 'suspended',
        role: 'manager',
        phoneNumbers: [
            '+972-334-3784',
            '+972-352-8922',
            '+972-667-2973'
        ]


    }

}


