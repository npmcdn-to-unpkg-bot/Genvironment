import {Component} from "angular2/core";
import {RouteParams, Router} from "angular2/router";

@Component({

    template: `
    HELLO THIS IS MY TEMPLATE!!
    `

})

export class DemoComponent {

    getRoute= () => console.log("THIS IS THE PARAMETER: "+ this._routeParams.get("id"));

    constructor(private _router:Router,
                private _routeParams:RouteParams
                ) {

        this.getRoute();



    }
}

