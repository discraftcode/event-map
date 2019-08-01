import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Service
import { MapService } from './services/map.service';

// Directive
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

// Models
import { Event } from './models/event.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Discraft';
  lat: number;
  lng: number;
  searchLat: number;
  searchLng: number;
  zoom: number;
  eventStorage: Event[] = [];
  events: Event[];
  filteredEvents: any;
  showMarker = false;
  searchForm: FormGroup;
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  address: string;
  clickLabel: string;
  centered = true;
  center: {lat: number, lng: number}[];

  constructor(
    private mapService: MapService
    ) {
      this.center = [
        {
          lat: 39.809734,
          lng: -98.55562
        },
        {
          lat: 39.809733,
          lng: -98.55561
        }
      ];
    }

  ngOnInit() {
    this.mapService.getEventInfo().subscribe((data) => {
      this.eventStorage = data.events;
      this.events = data.events;
      this.lat = this.center[0].lat;
      this.lng = this.center[0].lng;
      this.zoom = 4;
      this.mapService.filteredSubject.next(data.events);
      this.mapService.filteredSubject.subscribe((e) => this.events = e);
    });

    this.searchForm = new FormGroup({
      'search': new FormControl('', [Validators.required ]),
      'miles': new FormControl('5',  [Validators.required ])
    });
  }

/**
 * Centers viewport on Marker
 */
  centerAndMark(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
    this.searchLat = lat;
    this.searchLng = lng;
  }

  /**
   * Clears your marker and shows all events && controls general zoom
   */
  restart() {
    const magnification = (this.zoom === 4) ? 3 : 4;
    this.zoom = magnification;
    this.centered = !this.centered;
    if (this.centered === false) {
      this.centerAndMark(this.center[1].lat, this.center[1].lng);
    } else {
      this.centerAndMark(this.center[0].lat, this.center[0].lng);
    }
    this.events = this.eventStorage;
    this.showMarker = false;
  }

  /**
   * Creates marker when you click on the map
   */
  onChosenLocation(event) {
    this.centerAndMark(event.coords.lat, event.coords.lng);
    this.showMarker = true;
    this.clickLabel = `${event.coords.lat}, ${event.coords.lng}`;
  }

  /**
   * Translate grabs autocomplete info
   */
  public handleAddressChange(address: any) {
    this.searchForm.controls['search'].setValue(address.formatted_address);
  }

  onSubmit() {
    if (this.searchForm.value.search !== '') {
      this.showMarker = false;
      this.mapService.geoCode(this.searchForm.value.search).subscribe((data: any) => {
        console.log('data.results[0]', data.results[0]);
        const coordsObj = data.results[0].geometry.location;
        this.mapService.filterByDistance(
        {lat: coordsObj.lat, lng: coordsObj.lng},
        this.searchForm.value.miles,
        this.events);
        this.mapService.filteredSubject.subscribe((e) => this.events = e);
        this.centerAndMark(coordsObj.lat, coordsObj.lng);
        this.showMarker = true;
      });
    } else {
      console.log('is blank');
    }
  }

  // ngOnDestroy() {
  //   this.events = [];
  // }

}
