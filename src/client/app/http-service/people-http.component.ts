import {Component} from 'angular2/core'
import {Http, HTTP_PROVIDERS} from 'angular2/http'

@Component({
    selector: 'http-app',
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: 'app/http-service/people.html'

})

export class PeopleComponent {

    people:any;

    constructor(http:Http) {

        http.get('app/http-service/people.json')
            .map(res=> res.json())
            .subscribe(people => this.people = people)
    }
}