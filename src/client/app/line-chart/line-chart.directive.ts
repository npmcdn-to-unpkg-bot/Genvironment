import {Component, Directive, Attribute, ElementRef, Input, OnChanges} from "angular2/core";
import {Inject} from "angular2/core";

declare let d3;

@Directive({

        selector: 'myLineChart'
    }
)

export class LineChartDirective implements OnChanges {


    @Input('lineChartData') lineChartData;

    public divs:any;

    render(lineChartData:any) {

        console.log(lineChartData);

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
        let x = d3.time.scale().range([margin.left, width - margin.right]);
        let y = d3.scale.linear().range([height - margin.bottom, margin.top]);

        // set domain values

        x.domain(lineChartData['beginDate'], lineChartData['finalDate']);
        y.domain([0, 100]);

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
            {axis: xAxis, dx: 0, dy: (height - margin.bottom), clazz: 'x'},
            {axis: yAxis, dx: margin.left, dy: 0, clazz: 'y'}
        ];

        let pointLine = d3.svg.line()
            .x(d => x(d.date))
            .y(d => y(d.leaguePoints));

        // standard function to redraw the data on the screen
        function redraw(data) {

            let lines = svg.selectAll('.line-graph')
                .data(data.entries());

            lines.enter()
                .append('g')
                .attr('class', 'line - graph')
                .attr('transform', 'translate(' + xAxis.tickPadding() + ',0)');

            let path = lines.append('path')
                .datum(d => d.value)
                .attr('d', d => pointLine(d))

        }

    }

    constructor(elementRef:ElementRef) {

        let el:any = elementRef.nativeElement;
        this.divs = d3.select(el);

    }

    ngOnChanges():any {
        // only render when barChartData exists
        if (this.lineChartData) {
            
            this.render(this.lineChartData);


        }
    }


}


