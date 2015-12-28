import {Component, OnInit} from 'angular2/core';
import {RelaticsService} from './relatics.service'
import {error} from "util";

@Component({
    selector: 'my-app',
    templateUrl: 'app/main.html',
    providers: [RelaticsService]
})

export class AppComponent {

    public title:string = '';
    public graphData = {};


    constructor(private _RelaticsService:RelaticsService) {

    }

    showGraph(treeData):void {

        let margin = {top: 20, right: 120, bottom: 20, left: 120},
            width = 960 - margin.right - margin.left,
            height = 800 - margin.top - margin.bottom;


        let i = 0,
            root,
            duration = 700;

        let tree = d3.layout.tree()
            .size([height, width]);

        let diagonal = d3.svg.diagonal()
            .projection(function (d) {
                return [d.y, d.x];
            });


        let svg = d3.select("#graph").append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


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
                d.y = d.depth * 180;
            });

            // declare the node variables
            let node = svg.selectAll("g.node")
                .data(nodes, function (d) {
                    return d.id || (d.id = ++i);
                });

            // enter the node
            let nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function (d) {
                    return "translate(" + source.y0 + "," + source.x0 + ")";
                })
                .on("click", click);

            // Enter any new nodes at the parent's previous position.
            nodeEnter.append("circle")
                .attr("r", 1e-6)
                .style("fill", function (d) {
                    return d._children ? "lightsteelblue" : "#fff";
                });

            nodeEnter.append("text")
                .attr("x", function (d) {
                    return d.children || d._children ? -13 : 13;
                })
                .attr("dy", ".35em")
                .attr("text-anchor", function (d) {
                    return d.children || d._children ? "end" : "start";
                })
                .text(function (d) {
                    return d.name;
                })
                .style("fill-opacity", 1e-6);


            // Transition of nodes

            let nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function (d) {
                    return "translate(" + d.y + "," + d.x + ")";
                });

            nodeUpdate.select("circle")
                .attr("r", 10)
                .style("fill", function (d) {
                    return d._children ? "lightsteelblue" : "#fff";
                });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.

            let nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function (d) {
                    return "translate(" + source.y + "," + source.x + ")";
                })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);


            // Update the links…
            let link = svg.selectAll("path.link")
                .data(links, function (d) {
                    return d.target.id;
                });

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
            nodes.forEach(function (d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });


        }


    }

    transformData():Promise<string> {

        let myJson = {};

        return this._RelaticsService.GetData('persons', '37035202-abf8-4822-b8a5-b492c97a4c83', '123456')
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

                        (<any>myJson).children.push({"name": functionArray[i].getAttribute('functie'), "children": []});


                    } else {
                        (<any>myJson).children.push({"name": functionArray[i].getAttribute('functie')});
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

                return myJson;


            });


    }


    ngOnInit() {
        console.log('ngOnInit');
        let x = this.transformData();
        x.then((data) => {
                this.title = JSON.stringify((data));
                this.showGraph(data);
            }
        );


    }


}

