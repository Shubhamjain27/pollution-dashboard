import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.css']
})
export class LocationSearchComponent implements OnInit {

  private latitude: number;
  private longitude: number;
  private location: any;
  private searchControl: FormControl;
  public zoom: number;
  public address: string;
  public google:any;
  @ViewChild('search') public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {

    // region set google maps default
    this.zoom = 14;
    this.location = 'Location Search';
    // endregion

    // create search FormControl
    this.searchControl = new FormControl();

    // set Current Position
    this.setCurrentPosition();

    this.mapsAPILoader.load().then(() => {

      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['geocode', 'establishment']
      });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.address = place.formatted_address;
        });
      });

    });
  }

  setCurrentPosition() {

    if ('geolocation' in navigator) {

      navigator.geolocation.getCurrentPosition((position) => {
        this.ngZone.run(() => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;

          this.mapsAPILoader.load().then(() => {
            const loc = new google.maps.Geocoder();
            const reqjson: google.maps.GeocoderRequest = {
              'location': { 'lat': this.latitude, 'lng': this.longitude }
            };
            loc.geocode(reqjson, (results, status) => {
              this.ngZone.run(() => {
                this.address = results[0].formatted_address;
                console.log(this.address);
                this.location = this.address;
              });
            });
          });
        });


      });
    }
  }

}
