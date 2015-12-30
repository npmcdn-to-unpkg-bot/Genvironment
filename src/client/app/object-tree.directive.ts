import {Component, Directive, Attribute, ElementRef, Input, OnInit} from "angular2/core";
import {Inject} from "angular2/core";


@Directive({
    selector: '[myGraphData]',
})


export class ObjectTreeDirective implements OnInit {

    @Input('myGraphData') treeData;

    public divs:any;

    render(treeData:any) {

        let margin = {top: 0, right: 120, bottom: 0, left: 150},
            width = 1000 - margin.right - margin.left,
            height = 600 - margin.top - margin.bottom;

        let svg = this.divs.append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .attr("class", "myGraphTwo")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        let i = 0,
            root,
            duration = 600;

        let tree = d3.layout.tree()
            .size([height, width]);

        let diagonal = d3.svg.diagonal()
            .projection(function (d) {
                return [d.y, d.x];
            });


        root = treeData;
        root.x0 = height / 2;
        root.y0 = 0;

        // Toggle children on click.
        function click(d) {

            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update(d);
        }

        function collapse(d) {
            if (d.children) {
                d._children = d.children;
                d._children.forEach(collapse);
                d.children = null;
            }
        }

        root.children.forEach(collapse);
        update(root);


        function update(source):void {

            // compute the tree layout
            let nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);

            // horizontal spacing
            nodes.forEach(function (d) {
                d.y = d.depth * 210;
            });

            // declare the node variables
            let node = svg.selectAll("g.node")
                .data(nodes, (d) => d.id || (d.id = ++i));

            // enter the node
            let nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", (d) => "translate(" + source.y0 + "," + source.x0 + ")");


            // Enter any new nodes at the parent's previous position.
            nodeEnter.append("circle")
                .attr("r", 1e-6).on("click", click);


            let nodeEnterA = nodeEnter.append("a")
                .attr("xlink:href", (d) =>
                "https://arcadis.relaticsonline.com/37035202-abf8-4822-b8a5-b492c97a4c83/ShowObject.aspx?Key=" + d.ID)
                .attr("target", "_blank");

            nodeEnterA.append("text")
                .attr("x", (d) => d.children || d._children ? -13 : 13)
                .attr("dy", ".35em")
                .attr("text-anchor", (d) => d.children || d._children ? "end" : "start")
                .text((d) => d.name)
                .style("fill-opacity", 1e-6);


            // Transition of nodes

            let nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", (d) => "translate(" + d.y + "," + d.x + ")");

            nodeUpdate.select("circle")
                .attr("r", 10)
                .attr("stroke", (d) => d.color)
                .style("fill", (d) => d._children ? tinycolor(d.color).brighten(12).toString() : "#fff");

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.

            let nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", (d) =>"translate(" + source.y + "," + source.x + ")")
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);


            // Update the links…
            let link = svg.selectAll("path.link")
                .data(links, (d) => d.target.id);

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function (d) {
                    let i = {x: source.x0, y: source.y0};
                    return diagonal({source: i, target: i});
                });

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);


            link.exit().transition()
                .duration(duration)
                .attr("d", function (d) {
                    let i = {x: source.x, y: source.y};
                    return diagonal({source: i, target: i});
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function (d:any) {
                d.x0 = d.x;
                d.y0 = d.y;
            });


        }
    }

    constructor(elementRef:ElementRef) {

        let el:any = elementRef.nativeElement;

        this.divs = d3.select(el);

    }

    ngOnInit() {
        this.render(this.treeData);
  }




}

