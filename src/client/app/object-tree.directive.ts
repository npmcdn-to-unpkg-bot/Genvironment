import {Component, Directive, Attribute, ElementRef} from "angular2/core";
import {Inject} from "angular2/core";


@Directive({
    selector: 'tree-graph',
    properties: ['data']
})

export class ObjectTree {

    public data:any;
    public divs:any;

    constructor(elementRef:ElementRef) {

        let el:any = elementRef.nativeElement;
        let graph:any = d3.select(el);

        this.divs = graph.append('div').attr({
            'class': 'chart'
        });

    }


}