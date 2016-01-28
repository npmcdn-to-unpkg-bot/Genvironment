import {Component} from 'angular2/core'
import {Http, HTTP_PROVIDERS} from 'angular2/http'
import {OnInit} from "angular2/core";

@Component({
    selector: 'http-app',
    viewProviders: [HTTP_PROVIDERS],
    templateUrl: 'app/http-service/people.html'

})

export class PeopleComponent implements OnInit {

    people:any;

    constructor(private http:Http) {

    }

    ngOnInit() {


        this.http.get('app/http-service/eng2-2013-14.json')
            .map(res=> res.json())
            .subscribe(res => {


                let dataObject = d3.merge(
                    res.map(
                        (d) => { d.Games.forEach(
                                (g) => { g.Date = d.Date }
                            );

                            return d.Games
                        })
                )

                console.log(dataObject);


            })

    }

}