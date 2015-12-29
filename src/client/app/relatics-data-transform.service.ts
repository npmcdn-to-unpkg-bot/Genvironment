import {Injectable} from 'angular2/core';


@Injectable()
export class RelaticsDataTransformService {

    //Transform relatics in object format
    ObjectTreeTransformation(data:HTMLDocument):Promise<string> {

        let myJson:any = {};

        // alle doelen
        let goal = data.getElementsByTagName("doel")[0];

        // initial myJson data
        myJson.name = goal.getAttribute("doel");
        myJson.ID = goal.getAttribute("ID");
        myJson.children = [];
        myJson.color = "purple";


        //alle functies
        let functionArray = goal.querySelectorAll('functie');

        for (let i = 0; i < functionArray.length; i++) {


            let objectArray = functionArray[i].querySelectorAll('object');


            if (functionArray[i].querySelectorAll('object').length > 0) {

                myJson.children.push({
                    "name": functionArray[i].getAttribute('functie'),
                    "ID": functionArray[i].getAttribute('ID'),
                    "color": "goldenrod",
                    "children": []
                });


            } else {
                myJson.children.push({
                    "name": functionArray[i].getAttribute('functie'),
                    "ID": functionArray[i].getAttribute('ID'),
                    "color": "goldenrod"
                });
            }


            //alle objecten
            for (let x = 0; x < objectArray.length; x++) {

                //alle eisen
                let specificationArray = objectArray[x].querySelectorAll('specificatie');


                if (objectArray[x].querySelectorAll('specificatie').length > 0) {

                    myJson.children[i].children.push({
                        "name": objectArray[x].getAttribute('object'),
                        "ID": objectArray[x].getAttribute('ID'),
                        "color": "green",
                        "children": []
                    });

                } else {
                    myJson.children[i].children.push({
                        "name": objectArray[x].getAttribute('object'),
                        "ID": objectArray[x].getAttribute('ID'),
                        "color": "green"
                    });
                }


                for (let z = 0; z < specificationArray.length; z++) {

                    myJson.children[i].children[x].children.push({
                        "name": specificationArray[z].getAttribute('specificatie'),
                        "ID": specificationArray[z].getAttribute('ID'),
                        "color": "steelblue",
                    });

                }

            }

        }

        return Promise.resolve(myJson)


    }


}