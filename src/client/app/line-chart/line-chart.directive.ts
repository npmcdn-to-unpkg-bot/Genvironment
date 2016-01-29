import {Component, Directive, Attribute, ElementRef, Input, OnChanges} from "angular2/core";
import {Inject} from "angular2/core";

@Directive({

        selector: 'myLineChart'

    }
)

export class LineChartDirective implements OnChanges {


    @Input('myLineChartInput') lineChartData;

    public divs:any;

    render(lineChartData:any) {


           // create window for your chart;
        let margin = {top: 60, right: 60, bottom: 60, left: 30},
            width = 800 - margin.right - margin.left,
            height = 800 - margin.top - margin.bottom;

        let svg = this.divs.append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .attr("class", "myLineChartGraph")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // scales
        let x = d3.scale
            .ordinal()
            .rangeRoundBands([margin.left, width - margin.right], 0.1);

        let y = d3.scale.linear()
            .range([height-margin.bottom, margin.top]);

        // axes
        let xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .ticks;

        let yAxis = d3.svg
            .axis()
            .scale(y)
            .orient('left');

        let axisData = [
            {axis: xAxis, dx: 0, dy: (height-margin.bottom), clazz: 'x' },
            {axis: yAxis, dx: margin.left, dy: 0, clazz: 'y'}
        ];

        // standard function to redraw the data on the screen
        function redraw(data) {





        }





    }








    constructor(elementRef:ElementRef) {

        let el:any = elementRef.nativeElement;

        this.divs = d3.select(el);

    }


    ngOnChanges(changes:{}):any {
         // only render when barChartData exists
        if (this.lineChartData) {
            this.render(this.lineChartData);
        }
    }


}


