import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GeoDataService {

  constructor(private http: Http) { }

  getGeoData() {
    const query = {
      'Location': { 'Latitude': 17, 'Longitude': 23 }
    };
    return this.http.post('http://localhost:8080/api/heatMap/getData', query).map(res => {
      return res;
    });
  }

  getBaseLayer() {
    const query = {
      'Location': { 'Latitude': 17, 'Longitude': 23 }
    };
    return this.http.post('http://localhost:8080/api/heatMap/getBaseLayer', query).map(res => {
      return res;
    });
  }
}
