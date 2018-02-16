import { Component, OnInit } from '@angular/core';
import { BindingService } from '../services/binding.service';
@Component({
  selector: 'app-air-bar',
  templateUrl: './air-bar.component.html',
  styleUrls: ['./air-bar.component.css']
})
export class AirBarComponent implements OnInit {
  sensors: Array<any>;
  constructor(private bindingService: BindingService) { }

  ngOnInit() {
    this.getSensors();
  }

  getSensors() {
    this.sensors = [
      'AQI',
      'CO2',
      'PM2.5',
      'PM10',
      'SO2'
    ];
  }

  someFunc(event, sensor) {
    this.bindingService.setSensor(sensor);
  }
}
