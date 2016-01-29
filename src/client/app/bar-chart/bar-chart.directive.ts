import {Component, Directive, Attribute, ElementRef, Input, OnChanges} from "angular2/core";
import {Inject} from "angular2/core";


@Directive({
    selector: 'myBarChart'
})

export class BarChartDirective implements OnChanges {

    // data input for my bar chart
    @Input('myBarChartInput') barChartData;

    public divs:any;

    render(barChartData:any) {

        let testData = [1, 23, 34, 23, 23, 15, 1, 23, 51, 99, 5, 2];

        // create window for your chart;
        let margin = {top: 60, right: 60, bottom: 60, left: 30},
            width = 800 - margin.right - margin.left,
            height = 800 - margin.top - margin.bottom;

        let svg = this.divs.append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .attr("class", "myBarChartGraph")
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

        // standard graph drawing function
        function redraw(data) {
            //fill in here


            x.domain(data.map((d, i) => i));
            y.domain([0, d3.max(data, (d) => d)]);

            let bars = svg.selectAll('rect.bar')
                .data(data);

            bars.enter()
                .append('rect')
                .classed('bar', true);

            bars
                .attr('x', (d, i) => x(i))
                .attr('width', x.rangeBand())
                .attr('y', y(0))
                .attr('height', 0)
                .transition()
                .delay((d,i) => i*50)
                .duration(800)
                .attr('y', (d) => y(d))
                .attr('height', (d) => y(0) - y(d))
        }


        let axis = svg.selectAll('g.axis')
            .data(axisData);

        axis.enter().append('g')
            .classed('axis', true);

        axis.each(function(d) {
            d3.select(this)
                .attr('transform', 'translate(' + d.dx + ',' + d.dy + ')')
                .classed(d.clazz, true)
                .call(d.axis)
        });

        redraw(testData);


    }

    constructor(elementRef:ElementRef) {

        let el:any = elementRef.nativeElement;

        this.divs = d3.select(el);

    }


    ngOnChanges() {

        // only render when barChartData exists
        if (this.barChartData) {
            this.render(this.barChartData);
        }

    }

}
