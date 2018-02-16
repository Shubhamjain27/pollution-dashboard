import { Component, OnInit, OnChanges, ViewChild, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { curveBasis, curveMonotoneX } from 'd3';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit, OnChanges {

  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  @Input() private data2: Array<any>;
  @Input() private sensor: any;
  private element: any;

  private margin = { top: 20, right: 50, bottom: 30, left: 70 };

  private xScale: any;
  private yScale: any;

  private xAxis: any;
  private yAxis: any;
  private xGrid: any;
  private svg: any;
  private chartArea: any;
  private areaElement: any;
  private lineElement: any;
  private xAxisG: any;
  private yAxisG: any;
  private chartData: any;
  private areaGradient: any;
  ngOnInit() {
    console.log(this.sensor);
    this.element = this.chartContainer.nativeElement;

    d3.select(this.element)
      .style('margin', 0)
      .style('position', 'relative');

    this.svg = d3.select(this.element).append('svg')
      .attr('width', '100%')
      .attr('height', '100%');

    this.chartArea = this.svg.append('g')
      .classed('chartArea', true)
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    this.areaElement = this.chartArea.append('path')
      .attr('class', 'area');

    this.lineElement = this.chartArea.append('path')
      .attr('class', 'line');

    this.xAxisG = this.chartArea.append('g')
      .classed('axis', true)
      .classed('x-axis', true);

    this.yAxisG = this.chartArea.append('g')
      .classed('axis', true)
      .classed('y-axis', true);

    this.xGrid = this.chartArea.append('g')
      .attr('class', 'grid');


  }

  initChart() {
    this.xScale = d3.scaleBand().domain(this.data.map(d => d.Time));
    this.yScale = d3.scaleLinear().domain([0, d3.max(this.data, d => <any>d[this.sensor])]);

    this.xAxis = d3.axisBottom(this.xScale).tickSize(0).tickValues(this.xScale.domain()
      .map((d) => d).filter(function (d, i) { return !(i % 20); })).tickPadding(5);
    this.yAxis = d3.axisLeft(this.yScale).tickSize(0).ticks(5).tickPadding(5);


  }

  update(firstCall, isResize) {
    this.updateScales(this.element.clientWidth, this.element.clientHeight);

    this.updateAxes(firstCall, this.element.clientHeight);

    this.updateArea(false);

  }

  updateScales(width, height) {
    const newWidth = width - this.margin.left - this.margin.right;
    const newHeight = height - this.margin.top - this.margin.bottom;

    this.xScale
      .range([0, newWidth]);

    this.yScale
      .range([newHeight, 0]);

  }

  updateAxes(firstCall, height) {
    if (typeof firstCall !== 'undefined') {
      this.xAxisG
        .attr('transform', `translate(0, ${height - this.margin.top - this.margin.bottom})`);
    }


    this.xAxisG
      .attr('transform', `translate(0, ${height - this.margin.top - this.margin.bottom}) `)
      .call(this.xAxis)
      .selectAll('text')
      .attr('y', 6)
      .attr('x', 0)
      .style('text-anchor', 'start');


    this.yAxisG
      .call(this.yAxis);


  }

  updateArea(isResize) {
    const height = this.element.clientHeight - this.margin.bottom - this.margin.top;

    this.areaGradient = this.chartArea.append('defs')
      .append('linearGradient')
      .attr('id', 'areaGradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');

    this.areaGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#009E9C')
      .attr('stop-opacity', 0.7);

    this.areaGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', 'white')
      .attr('stop-opacity', 0.2);

    const area = d3.area().curve(d3.curveBasis)
      .x((d: any) => {
        return this.xScale(<any>d.Time);
      })
      .y0(height)
      .y1((d: any) => {
        return this.yScale(<any>d[this.sensor]);
      });

    const valueLine = d3.line().curve(d3.curveBasis)
      .x((d: any) => {
        return this.xScale(<any>d.Time);
      })
      .y((d: any) => this.yScale(d[this.sensor]));


    this.areaElement
      .data([this.data])
      .style('fill', 'url(#areaGradient)')
      .attr('d', area);

    this.lineElement
      .data([this.data])
      .attr('d', valueLine);

  }

  onResize() {
    this.update(false, true);
  }

  ngOnChanges() {
    console.log(this.sensor);
    if (this.element) {
      this.initChart();
      this.update(true, false);
    }
  }

}
