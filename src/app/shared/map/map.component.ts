import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild('map') private mapContainer: ElementRef;
  private element: HTMLElement;
  ngOnInit() {
    this.element = this.mapContainer.nativeElement;
    const projection = d3.geoAlbersUsa().scale(1000);
    const path = d3.geoPath().projection(projection);


    const svg = d3.select(this.element).append('svg')
      .attr('width', '100%')
      .attr('height', '100%');

    const url = 'https://gist.githubusercontent.com/mbostock/4090846/raw/d534aba169207548a8a3d670c9c2cc719ff05c47/us.json';

    d3.json(url, (error, topology) => {
      if (error) { throw error; }

      console.log('topojson', topology);
      const geojson = topojson.feature(topology, (topology as any).objects.counties);
      console.log('geojson', geojson);

      svg.append('g')
        .attr('transform', 'translate(0,0)')
        .attr('width', '100%')
        .attr('class', 'counties')
        .selectAll('path')
        .data(geojson.features)
        .enter().append('path')
        .attr('d', path);
    });
  }

}
