import {Component, Directive, Attribute, ElementRef, Input, OnChanges} from "@angular/core";

declare let d3;

@Directive({
    selector: '[myTreeMapData]',
})

export class TreeMapDirective implements OnChanges {

    public divs:any;

    constructor(elementRef:ElementRef) {

        let el:any = elementRef.nativeElement;

        this.divs = d3.select(el);

    }

    render() {

    //    TODO create the render function



    }

    ngOnChanges() {

    }





}