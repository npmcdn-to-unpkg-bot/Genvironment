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
    public jsonString = '';
    public heroes:Array<any> = [];

    constructor(private _RelaticsService:RelaticsService) {


    }


    getTree() {


        var string = this.jsonString;

        let myJson = {};


        this._RelaticsService.GetData('persons', '37035202-abf8-4822-b8a5-b492c97a4c83', '123456')
            .then(function (data) {

                // alle doelen (test voor nu 1tje)

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

                return myJson


            }).then(function (data) {
                console.log(data);


                var margin = {top: 20, right: 120, bottom: 20, left: 120},
                    width = 960 - margin.right - margin.left,
                    height = 800 - margin.top - margin.bottom;

                var i = 0,
                    duration = 750,
                    root;


                var tree = d3.layout.tree()
                    .size([height, width]);


                var diagonal = d3.svg.diagonal()
                    .projection(function (d) {
                        return [d.y, d.x];
                    });

                var svg = d3.select("body").append("svg")
                    .attr("width", width + margin.right + margin.left)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


                root = data;
                root.x0 = height / 2;
                root.y0 = 0;

                function collapse(root) {

                    console.log("d = " + root[0]);

                }

            collapse(root);

            }
        );


    }


}

