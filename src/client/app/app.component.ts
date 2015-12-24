import {Component, OnInit} from 'angular2/core';
import {RelaticsService} from './relatics.service'
import {error} from "util";

@Component({
    selector: 'my-app',
    templateUrl: 'app/main.html',
    providers: [RelaticsService]
})

export class AppComponent {

    public title = 'Tour of Heroes';
    public hero = 'windstorm';
    public heroes:Array<any> = [];

    constructor(private _RelaticsService:RelaticsService) {


    }

    getTree() {

        var x = this.heroes;


        this._RelaticsService.GetData('persons', '37035202-abf8-4822-b8a5-b492c97a4c83', '123456')
            .then(function (data) {
                // alle doelen (test voor nu 1tje)
                let goal = data.getElementsByTagName('doel')[0];

                x.push(goal.getAttribute('doel'));

                //alle functies
                let functionArray = goal.querySelectorAll('functie');


                for (let i = 0; i < functionArray.length; i++) {

                    x.push(functionArray[i].getAttribute('functie'));

                    //alle objecten
                    let objectArray = functionArray[i].querySelectorAll('object');

                    for (let i = 0; i < objectArray.length; i++) {
                        x.push(objectArray[i].getAttribute('object'));

                        //alle eisen
                        let specificationArray = objectArray[i].querySelectorAll('specificatie');

                        for (let i = 0; i < specificationArray.length; i++) {

                            x.push(specificationArray[i].getAttribute('specificatie'));


                        }

                    }


                }

            })
    }


}

