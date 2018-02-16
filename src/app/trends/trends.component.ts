import { Component, OnInit } from '@angular/core';
import { GetSensorDataService } from '../shared/services/get-sensor-data.service';

@Component({
  selector: 'app-trends',
  templateUrl: './trends.component.html',
  styleUrls: ['./trends.component.css']
})
export class TrendsComponent implements OnInit {
  chartData: any;
  sensors: any;
  constructor(private dataService: GetSensorDataService) { }

  ngOnInit() {
    this.getSensors();
    this.getData();
  }
  getData() {
    this.dataService.getData().subscribe(result => {
      console.log(result.json());
      this.chartData = result.json();
    });
  }

  getSensors() {
    this.sensors = [
      { sensor: 'AQI', show: true },
      { sensor: 'CO2', show: true },
      { sensor: 'PM25', show: true },
      { sensor: 'PM10', show: true },
      { sensor: 'SO2', show: true },
    ];
  }

  toggler(sensor) {
    console.log(sensor);
    sensor.show = !sensor.show;
  }
}
