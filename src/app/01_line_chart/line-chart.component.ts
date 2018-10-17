import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { LineChartService }  from '../line-chart.service';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { LineData,LineDt } from '../lineData';
import { DatePipe } from '@angular/common';
import * as D3 from 'd3';

@Component({
    selector: 'app-line-chart',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.css'],
    providers: [DatePipe]
})

export class LineChartComponent implements OnInit {

    title = 'Line Chart';
    private margin = {top: 20, right: 20, bottom: 30, left: 50};
    private width: number;
    private height: number;
    private x: any;
    private y: any;
    private svg: any;
    private line: d3Shape.Line<[number, number]>;
    private arr:any[];
      public dataLine: LineData[] = [];
    constructor(private LineChartService: LineChartService,private datePipe: DatePipe) {
        this.width = 900 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
    }

    ngOnInit() {
        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawLine();
       this.LineChartService.getData().subscribe((data:LineData[]) => {
      data.forEach(data => {
        this.dataLine.push(
            {
                date: new Date(data.date), //date
                value: data.value //convert string to number
            });
    });
    console.log(this.dataLine);
      });
    }

    private initSvg() {
        this.svg = d3.selectAll('svg')
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
            
    }


    private initAxis() {
        this.x = d3Scale.scaleTime().range([0, this.width]);
        this.y = d3Scale.scaleLinear().range([this.height, 0]);
        var parseDate = D3.timeParse("%Y-%m-%d");
           this.dataLine.forEach(function (d) {
          d.date = parseDate(d.date);
          d.value = +d.value;
        });
        this.x.domain(d3Array.extent(LineDt, (d) => d.date));
        this.y.domain(d3Array.extent(LineDt, (d) => d.value ));
        
    }

    private drawAxis() {
        this.svg.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3Axis.axisBottom(this.x));
        this.svg.append('g')
            .attr('class', 'axis axis--y')
            .call(d3Axis.axisLeft(this.y))
            .append('text')
            .attr('class', 'axis-title')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            
            .text('Sale');
        
    }

    private drawLine() {
        this.line = d3Shape.line()
            .x( (d: any) => this.x(d.date) )
            .y( (d: any) => this.y(d.value) );

        const div = this.svg.append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

        this.svg.append('path')
            .datum(LineDt)
            .attr('class', 'line')
            
            .attr('d', this.line);

       this.svg.selectAll('dot')
      .data(LineDt)
      .enter()
      .append('circle')
      .attr('cx', (d) => this.x(d.date) )
      .attr('cy', (d) => this.y(d.value) )
      .attr('r', 2)
      .on("mouseover", (d) =>{		
            div.transition()		
                .duration(200)		
                .style("opacity", 0.9);		
            div.html(d.date + "<br/>"  + d.value)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })					
      .on('mouseout', (d) => { 
                  div.transition()
                     .duration(500)
                     .style('opacity', 0);
      });

    }

}
