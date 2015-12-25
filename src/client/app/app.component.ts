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
    constructor(private _RelaticsService:RelaticsService) {


    }


    transformData() {

        let myJson = {};

        this._RelaticsService.GetData('persons', '37035202-abf8-4822-b8a5-b492c97a4c83', '123456')
            .then(function (data) {

                // alle doelen
                let goal = data.getElementsByTagName('doel')[0];


                myJson["name"] = goal.getAttribute('doel');
                myJson["children"] = [];


                //alle functies
                let functionArray = goal.querySelectorAll('functie');

                for (let i = 0; i < functionArray.length; i++) {


                    let objectArray = functionArray[i].querySelectorAll('object');

                    if (functionArray[i].querySelectorAll('object').length > 0) {

                        myJson.children.push({"name": functionArray[i].getAttribute('functie'), "children": []});


                    } else {
                        myJson.children.push({"name": functionArray[i].getAttribute('functie')});
                    }


                    //alle objecten
                    for (let x = 0; x < objectArray.length; x++) {

                        //alle eisen
                        let specificationArray = objectArray[x].querySelectorAll('specificatie');


                        if (objectArray[x].querySelectorAll('specificatie').length > 0) {

                            myJson["children"][i].children.push({
                                "name": objectArray[x].getAttribute('object'),
                                "children": []
                            });

                        } else {
                            myJson["children"][i].children.push({
                                "name": objectArray[x].getAttribute('object')
                            });
                        }


                        for (let z = 0; z < specificationArray.length; z++) {

                            myJson["children"][i]["children"][x].children.push({"name": specificationArray[z].getAttribute('specificatie')});


                        }

                    }


                }

                return JSON.stringify(myJson)


            });


    }


}

