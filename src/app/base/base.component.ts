import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { GetSensorDataService } from '../shared/services/get-sensor-data.service';
import { BindingService } from '../shared/services/binding.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  private chartData: Array<any>;
  private chartData2: any;
  private donutVal: Number;
  private result: any;
  private selectedDeviceID: any;
  private selectedSensor: any;
  constructor(
    private dataService: GetSensorDataService,
    private bindingService: BindingService
  ) { }

  ngOnInit() {
    this.selectedSensor = 'AQI';
    this.getData();
    this.donutVal = 50;

    this.bindingService.selectedSensor$.subscribe(sensor => {
      if (sensor === 'PM2.5') { sensor = 'PM25'; }
      if (sensor === 'NO2') { sensor = 'SO2'; }
      console.log(sensor);
      this.selectedSensor = sensor;
    });

    this.bindingService.selectedLocation$.subscribe(id => {
      this.selectedDeviceID = id;
      console.log(id);
      this.dataService.getDeviceData(id).subscribe(result => {
        console.log(result.json());
        this.chartData = result.json();
      });
    });
  }

  getData() {
    this.dataService.getData().subscribe(result => {
      console.log(result.json());
      this.chartData = result.json();
    });
  }

}
