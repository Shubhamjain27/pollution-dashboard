import { Component, OnInit, OnChanges, ViewChild, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { transform } from 'topojson';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit, OnChanges {

  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  private chartData2: any[][];
  private element: any;

  private margin: any = { top: 40, bottom: 40, left: 50, right: 40 };

  private xlabel = 'Time';
  private ylabel = 'Air Quality';

  private xScale: any;
  private yScale: any;

  private xAxis: any;
  private yAxis: any;

  private svg: any;
  private chartArea: any;
  private barGroup: any;
  private xAxisG: any;
  private yAxisG: any;
  private faintGray = '#ededed';
  private chartData: any;

  ngOnInit() {
    this.element = this.chartContainer.nativeElement;
    console.log(this.element);
    d3.select(this.element)
      .style('margin', 0)
      .style('position', 'relative');

    this.svg = d3.select(this.element).append('svg')
      .attr('width', '100%')
      .attr('height', '100%');

    this.chartArea = this.svg.append('g')
      .classed('chartArea', true)
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    this.barGroup = this.chartArea.append('g')
      .classed('bars', true);

    this.xAxisG = this.chartArea.append('g')
      .classed('axis', true)
      .classed('x-axis', true);

    this.yAxisG = this.chartArea.append('g')
      .classed('axis', true)
      .classed('y-axis', true);

    this.initChart();
    this.update(true, false);
  }

  initChart() {
    this.xScale = d3.scaleBand().domain(this.data.map(d => d[0]));
    this.yScale = d3.scaleLinear().domain([0, d3.max(this.data, d => d[1])]);

    this.chartData2 = this.data.map(d => [d[0], this.yScale.domain()[1]]);

    this.xAxis = d3.axisBottom(this.xScale).tickSize(0).tickPadding(5);
    this.yAxis = d3.axisLeft(this.yScale).tickSize(0).tickPadding(5);
  }

  update(firstCall, isResize) {
    this.updateScales(this.element.clientWidth, this.element.clientHeight);
    this.updateAxes(firstCall, this.element.clientHeight);
    this.updateBars(isResize);
  }

  updateScales(width, height) {
    const newWidth = width - this.margin.left - this.margin.right;
    const newHeight = height - this.margin.top - this.margin.bottom;

    this.xScale
      .range([0, newWidth])
      .paddingInner(0.6)
      .bandwidth(10);

    this.yScale.range([newHeight, 0]);
  }

  updateAxes(firstCall, height) {
    const newHeight = height;

    if (typeof firstCall !== 'undefined') {
      this.xAxisG
        .attr('transform', `translate(0,${newHeight - this.margin.top - this.margin.bottom})`);
    }

    this.xAxisG
      .attr('transform', `translate(0,${newHeight - this.margin.top - this.margin.bottom})`)
      .call(this.xAxis.tickValues(this.xScale.domain().filter(function (d, i) { return !(i % 3); })));

    this.yAxisG
      .call(this.yAxis.ticks(5));

    d3.selectAll('.axis text')
      .style('font-family', 'Roboto ')
      .style('fill', 'white')
      .style('font-size', '10px');

    d3.selectAll('.axis path')
      .style('fill', 'none')
      .style('stroke', 'none');

    d3.selectAll('.axis line')
      .style('stroke', 'black');
  }

  updateBars(isResize) {
    const updateBackground = this.barGroup.selectAll('.bar-back')
      .data(this.chartData2);

    const updateSelection = this.barGroup.selectAll('.bar')
      .data(this.data);


    const enterBackground = updateBackground.enter()
      .append('rect')
      .classed('bar-back', true)
      .style('fill', 'pink');

    const enterSelection = updateSelection.enter()
      .append('rect')
      .classed('bar', true)
      .style('fill', this.faintGray);

    updateSelection.exit()
      .remove();

    updateBackground.exit()
      .remove();

    const backWidth = this.xScale.bandwidth() * 0.3;

    if (!isResize) {
      enterSelection
        .merge(updateSelection)
        .attr('width', this.xScale.bandwidth)
        .attr('height', 0)
        .attr('x', d => this.xScale(d[0]))
        .attr('y', d => this.yScale(0))
        .transition()
        .delay((d, i) => i * 40)
        .attr('x', d => this.xScale(d[0]))
        .attr('y', d => this.yScale(d[1]))
        .attr('height', d => this.yScale(0) - this.yScale(d[1]));

      enterBackground
        .merge(updateBackground)
        .attr('width', backWidth)
        .attr('height', 0)
        .attr('x', d => this.xScale(d[0]))
        .attr('y', d => this.yScale(0))
        .transition()
        .delay((d, i) => i * 40)
        .attr('x', d => this.xScale(d[0]) + this.xScale.bandwidth() * 0.5 - backWidth * 0.5)
        .attr('y', d => this.yScale(d[1]))
        .attr('height', d => this.yScale(0) - this.yScale(d[1]));

    } else {
      enterSelection
        .merge(updateSelection)
        .attr('x', d => this.xScale(d[0]))
        .attr('width', this.xScale.bandwidth)
        .attr('y', d => this.yScale(d[1]))
        .attr('height', d => this.yScale(0) - this.yScale(d[1]));

      enterBackground
        .merge(updateBackground)
        .attr('x', d => this.xScale(d[0]) + this.xScale.bandwidth() * 0.5 - backWidth * 0.5)
        .attr('width', backWidth)
        .attr('y', d => this.yScale(d[1]))
        .attr('height', d => this.yScale(0) - this.yScale(d[1]));

    }

    this.barGroup.selectAll('.bar')
      .attr('rx', '5')
      .attr('ry', 5);
  }

  ngOnChanges() {
    if (this.element) {
      this.initChart();
      this.update(true, false);
    }
  }


  onResize(event) {
    this.update(false, true);
  }


}
