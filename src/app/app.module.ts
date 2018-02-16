import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { HttpModule } from '@angular/http';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import { BaseComponent } from './base/base.component';
import { BarChartComponent } from './shared/bar-chart/bar-chart.component';
import { DonutChartComponent } from './shared/donut-chart/donut-chart.component';
import { AirBarComponent } from './shared/air-bar/air-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapComponent } from './shared/map/map.component';
import { AreaChartComponent } from './shared/area-chart/area-chart.component';
import { LocationSearchComponent } from './shared/location-search/location-search.component';
import { GeoChartComponent } from './shared/geo-chart/geo-chart.component';
import { MapLeafComponent } from './shared/map-leaf/map-leaf.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { DataCardComponent } from './shared/data-card/data-card.component';
import { TrendsComponent } from './trends/trends.component';

import { GetSensorDataService } from './shared/services/get-sensor-data.service';
import { GeoDataService } from './shared/services/geo-data.service';
import { BindingService } from './shared/services/binding.service';

const ROUTES = [
  { path: '', component: BaseComponent },
  { path: 'trends', component: TrendsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    BarChartComponent,
    DonutChartComponent,
    AirBarComponent,
    DashboardComponent,
    MapComponent,
    AreaChartComponent,
    LocationSearchComponent,
    GeoChartComponent,
    MapLeafComponent,
    NavbarComponent,
    DataCardComponent,
    TrendsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC8rJixbJtxCvouB5pE2g4RtvtJYoJlpaE',
      libraries: ['places']
    }),
    LeafletModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GetSensorDataService, GeoDataService, BindingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
