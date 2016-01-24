import {Component} from 'angular2/core'
import {Http, HTTP_PROVIDERS} from 'angular2/http'
import {OnInit} from "angular2/core";

@Component({
    selector: 'http-app',
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: 'app/http-service/people.html'

})

export class PeopleComponent implements OnInit{

    people:any;

    constructor(private http:Http) {

    }

    ngOnInit() {
        this.http.get('app/http-service/people.json')
            .map(res=> res.json())
            .subscribe(people => this.people = people)

    }

}