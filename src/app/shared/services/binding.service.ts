import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BindingService {
  private selectedSensor = new Subject<any>();
  private selectedLocation = new Subject<any>();
  private sensorData = new Subject<any>();

  // Observable string streams
  selectedSensor$ = this.selectedSensor.asObservable();
  selectedLocation$ = this.selectedLocation.asObservable();
  sensorData$ = this.sensorData.asObservable();

  // Service message commands
  setSensor(sensor: any) {
    this.selectedSensor.next(sensor);
  }

  setLocation(location: any) {
    this.selectedLocation.next(location);
  }

  setSensorData(sensorData: any) {
    this.sensorData.next(sensorData);
  }
}
