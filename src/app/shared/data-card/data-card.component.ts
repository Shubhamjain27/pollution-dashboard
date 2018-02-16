import { Component, OnInit, Input } from '@angular/core';
import { BindingService } from '../services/binding.service';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.css']
})
export class DataCardComponent implements OnInit {
  @Input() donutData: any;
  public mainColor;
  private secondColor: any;
  public mainSensor: any;
  public sensorList;
  public dataList;
  public smallList;
  constructor(private bindingService: BindingService) { }

  ngOnInit() {
    this.sensorList = ['AQI', 'CO2', 'PM2.5', 'PM10', 'SO2'];
    this.smallList = this.getSmall('AQI');
    this.dataList = this.getDataList();
    console.log(this.smallList);
    this.mainSensor = 'AQI';
    console.log(this.sensorList);
    this.mainColor = '#009E9C';
    this.secondColor = '#009E9C';
    this.bindingService.selectedSensor$.subscribe(sensor => {
      this.donutData = Math.floor(Math.random() * 100) + 1;
      this.mainSensor = sensor;
      this.dataList = this.getDataList();
      this.smallList = this.getSmall(sensor);
      console.log(this.smallList);
    });
    this.bindingService.selectedLocation$.subscribe(location => {
      this.donutData = Math.floor(Math.random() * 100) + 1;
      this.dataList=this.getDataList()
      console.log(this.smallList);
    });
  }



  getSmall(sensor) {
    const i = this.sensorList.indexOf(sensor);
    const someList = this.sensorList.slice();
    someList.splice(i, 1);
    return someList;
  }

  getDataList() {
    const dataList = [];
    for (let i = 0; i < 4; i++) {
      dataList.push(Math.floor(Math.random() * (80 - 30 + 1)) + 30);
    }
    return dataList;
  }
}
