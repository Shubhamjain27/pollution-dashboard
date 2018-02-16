import { Component, OnInit, OnChanges, ViewChild, Input, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit, OnChanges {

  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: number;
  @Input() private sensor: any;
  @Input() private baseColor: any;
  private element;
  private margin: any = { top: 10, bottom: 10, left: 10, right: 10 };
  private svg: any;
  private width: any;
  private height: any;
  private donutArea: any;
  private chartArea: any;
  private radius: any;
  private arc: any;
  private dataArray: any[];
  private secColor = '#EDEDEE';
  private textColor = 'white';
  private thickness = 20;
  private innerCircle: any;

  ngOnInit() {
    this.element = this.chartContainer.nativeElement;

    d3.select(this.element)
      .style('margin', 0)
      .style('position', 'relative');

    this.svg = d3.select(this.element)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%');


    this.chartArea = this.svg.append('g')
      .classed('chartArea', true)
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    this.donutArea = this.chartArea
      .append('g')
      .attr('class', 'donut');

    this.innerCircle = this.chartArea.append('circle').attr('class', 'inner');

    this.initChart();
    this.update(true);
  }

  initChart() {
    this.dataArray = [this.data];

  }

  update(firstCall) {
    this.updateArc();
    this.updateDonut(firstCall);
  }
  updateArc() {
    this.width = this.element.offsetWidth - this.margin.left - this.margin.right;
    this.height = this.element.offsetHeight - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
    this.arc = d3.arc()
      .outerRadius(this.radius)
      .innerRadius(this.radius - this.thickness);

  }

  updateDonut(firstCall) {
    this.donutArea.attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    const anglesrange = this.data * 0.01 * 2 * Math.PI;

    const colors = [this.baseColor, this.secColor];

    const pies = d3.pie()
      .sort(null)
      .startAngle(0)
      .endAngle(anglesrange);

    const updateSelection = this.donutArea.selectAll('path')
      .data(pies(this.dataArray));

    updateSelection.enter()
      .append('path')
      .attr('fill', (d, i) => colors[i])
      .attr('fill-opacity', 0.5)
      .transition()
      .delay((d, i) => i * 500)
      .duration(500)
      .attrTween('d', d => {
        const i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
        return t => {
          d.endAngle = i(t);
          return this.arc(<any>d);
        };
      });

    updateSelection
      .transition()
      .duration(0)
      .attrTween('d', d => {
        const i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
        return t => {
          d.endAngle = i(t);
          return this.arc(<any>d);
        };
      });


    updateSelection.exit().remove();

    const text = this.dataArray[0];
    const textStruc = [{ 'val': text }];

    const innerRadius = this.radius - this.thickness;
    const donutCircle = this.donutArea.append('circle')
      .attr('class', 'donut-circle')
      .style('fill', this.baseColor);

    const donutText = this.donutArea.append('text')
      .style('fill', this.textColor)
      .attr('dy', '0.35em')
      .attr('class', 'label')
      .attr('text-anchor', 'middle')
      .style('font-size', innerRadius * 0.8);

    donutCircle.attr('r', innerRadius);

    if (firstCall) {

      donutText.text(text);
    }

    if (!firstCall) {
      this.donutArea.select('.label').remove();
      this.donutArea.select('.donut-circle').remove();
      donutText
        .transition()
        .duration(0)
        .style('opacity', 0)
        .transition().duration(0)
        .style('opacity', 1)
        .text(d => text).style('fill', this.textColor);
    }

  }

  onResize(event) {
    this.update(false);
  }

  ngOnChanges() {
    if (this.element) {
      console.log(this.data);
      this.initChart();
      this.update(false);
    }
  }

}


