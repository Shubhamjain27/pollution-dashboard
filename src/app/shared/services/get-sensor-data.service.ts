import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GetSensorDataService {
  query: any;
  constructor(private http: Http) { }

  getData() {
    this.query = {
      'Location': { 'Latitude': 17, 'Longitude': 23 },
      'StartTime': '2018-02-08T10:34',
      'EndTime': '2018-02-09T09:34'
    };
    return this.http.post('http://localhost:8080/api/Sensor/getSensorData', this.query).map(res => {
      return res;
    });
  }

  getDeviceData(sensorID: any) {
    this.query = {
      'SensorID': sensorID,
      'StartTime': '2018-02-08T10:34',
      'EndTime': '2018-02-09T09:34'
    };
    return this.http.post('http://localhost:8080/api/Sensor/getSensorData', this.query).map(res => {
      return res;
    });

  }

}
