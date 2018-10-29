import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { STATISTICS } from '../data/bardata';
import * as D3 from 'd3';
@Component({
  selector: 'app-campaign-overview',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './co.component.html'
})
export class CamoverComponent implements OnInit {
  title = 'Bar Chart';

  private width: number;
  private height: number;
  private margin = { top: 20, right: 20, bottom: 30, left: 40 };

  private x: any;
  private y: any;
  private svg: any;
  private g: any;

  constructor() { }

  ngOnInit() {
    var svg = D3.select("svg"),
      margin = { top: 20, right: 20, bottom: 30, left: 80 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;
   var colors = ["blue","red","green"];
    var tooltip = D3.select("body").append("div").attr("class", "toolTip");

    var x = D3.scaleLinear().range([0, width]);
    var y = D3.scaleBand().range([height, 0]);
    var color = D3.scaleOrdinal() 
      .range(["#D73027", "#FFFFBF" , "#1A9850"]);
   
   
    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    STATISTICS.sort(function (a, b) { return a.value - b.value; });

    x.domain([0, D3.max(STATISTICS, function (d) { return d.value; })]);
    y.domain(STATISTICS.map(function (d) { return d.area; })).padding(0.1);

    g.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(D3.axisBottom(x));
      

    g.append("g")
      .attr("class", "y axis")
      .call(D3.axisLeft(y));

    g.selectAll(".bar")
      .data(STATISTICS)
      .enter().append("rect")
      /*.style("fill", function(d,i){
        return color(i);
        })*/
      .attr("class", "bar")
      .attr("x", 0)
      .attr("height", y.bandwidth())
      .attr("y", function (d) { return y(d.area); })
      
      .attr("width", function (d) { return x(d.value); })
      .on("mousemove", function (d) {
        tooltip
          .style("left", D3.event.pageX - 50 + "px")
          .style("top", D3.event.pageY - 70 + "px")
          .style("display", "inline-block")
          .html((d.area) + "<br>" + "£" + (d.value));
      })
      .on("mouseout", function (d) { tooltip.style("display", "none"); });

  }

 

}
