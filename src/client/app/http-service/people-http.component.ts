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
                console.log('INITIAL')
                console.log(res);


                let dataObject = d3.merge(
                    res.map(
                        (d) => {
                            d.Games.forEach(
                                (g) => {
                                    g.Date = d.Date
                                }
                            );

                            return d.Games
                        })
                );

                let dataMap = d3.map();

                let xObject = d3.merge([
                    d3.nest().key(d => d.Away).entries(dataObject),
                    d3.nest().key(d => d.Home).entries(dataObject)
                ]).forEach(d => {

                    if (dataMap.has(d.key)) {

                        dataMap.set(d.key, d3.merge([dataMap.get(d.key), d.values]))
                            .sort((a, b) => d3.ascending(a.Date, b.Date))

                    } else {
                         dataMap.set(d.key, d.values);

                    }


                });


                console.log('Secondary dataSTRUCT');
                console.log(dataObject);

                console.log('Third Datastructure');
                console.log(dataMap);

            })

    }

}