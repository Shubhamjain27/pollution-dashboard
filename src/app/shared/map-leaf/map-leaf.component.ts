import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { GeoDataService } from '../../shared/services/geo-data.service';
import { BindingService } from '../../shared/services/binding.service';
import * as d3 from 'd3';


@Component({
  selector: 'app-map-leaf',
  templateUrl: './map-leaf.component.html',
  styleUrls: ['./map-leaf.component.css']
})
export class MapLeafComponent implements OnInit {
  private map: L.Map;
  private sensorLayer;
  private sensorsData;
  private userLocation: L.LatLngExpression = [12.9716, 77.5946];
  constructor(
    private geoDataService: GeoDataService,
    private bindingService: BindingService
  ) { }


  markerOnClick(e) {
    this.bindingService.setLocation(e.layer.feature.properties.Name);
  }

  ngOnInit() {
    this.initiateMap();
    this.bindingService.selectedSensor$.subscribe(sensor => {
      if (sensor === 'PM2.5') {
        sensor = 'PM25';
      }
      this.map.removeLayer(this.sensorLayer);
      console.log(sensor);
      this.createSensorLayer(sensor).addTo(this.map);
    });

    this.geoDataService.getGeoData().subscribe(result => {
      const sensorsData = JSON.parse(result.json());
      this.sensorsData = sensorsData;
      this.createSensorLayer('AQI').addTo(this.map);
    });

  }

  initiateMap() {
    this.map = L.map('mapid', { attributionControl: false }).setView(this.userLocation, 13);
    const tileUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
    const url = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png';
    const positron = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
    const mapnik='https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}';
    const osmLayer = L.tileLayer(url, {
      attribution: '',
      maxZoom: 18,
      ext: 'png'
    });
    osmLayer.addTo(this.map);
    const newIcon = L.icon({
      iconUrl: 'https://www.shareicon.net/download/2016/10/18/845244_pin.svg',
      iconSize: [28, 95], // size of the icon
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    L.marker(this.userLocation, { icon: newIcon }).addTo(this.map);

  }

  createSensorLayer(sensor: any) {
    return this.sensorLayer = L.geoJSON(this.sensorsData,
      {
        style: function (feature) {
          const colorScale = d3.scaleLinear().domain(this.sensorRange(sensor)).range(<any>['white', '#009F9B']);
          return {
            color: colorScale(feature.properties[sensor]),
            fillOpacity: 0.4,
            opacity: 0.6,
            radius: 13
          };
        }.bind(this),
        pointToLayer: function (feature, latlng) {
          return new L.CircleMarker(latlng, { radius: 10, fillOpacity: 0.85 });
        },
        onEachFeature: function (feature, layer) {
          layer.bindPopup(
            `<p>${feature.properties.Name}<br/>${sensor}: ${feature.properties[sensor]}</p>`);
        }.bind(this)
      }).on('click', this.markerOnClick, this);
  }

  sensorRange(sensor: any) {
    let val = {};
    switch (sensor) {
      case 'AQI': val = [50, 180];
        break;
      case 'SO2': val = [21, 55];
        break;
      case 'CO2': val = [14, 25];
        break;
      case 'PM25': val = [15, 60];
        break;
      case 'PM10': val = [150, 330];
        break;
      case 'NO2': val = [21, 55];
    }
    return val;
  }
}
