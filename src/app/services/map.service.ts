import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import { MapsAPILoader } from '@agm/core';
declare let google;

@Injectable()
export class MapService {
  filteredSubject = new BehaviorSubject([]);

  constructor(
    private httpClient: HttpClient,
    private mapsAPILoader: MapsAPILoader,
    ) {}



  /**
   * Returns event info - only relevant method
   */
  getEventInfo() {
    // URL to call this HTTP function from your published site looks like:
    // const callUrl = 'https://mysite.com/_functions/example/multiply?leftOperand=3&rightOperand=4';
    // Free site = 'https://username.wixsite.com/mysite/_functions/example/multiply?leftOperand=3&rightOperand=4';


    // URL to test this HTTP function from your saved site looks like:
    // 'https://mysite.com/_functions-dev/events'; // Premium site
    // 'https://username.wixsite.com/mysite/_functions-dev/events'; // Free site
    // const callUrl = 'https://discraftmarketing.wixsite.com/acerace/_functions-dev/events';

    return this.httpClient.get<any>(`${environment.URL}/get-events`).pipe(
      map(eventInfo => {
        return eventInfo;
      }),
      catchError((error: HttpErrorResponse) => {
          // this.errorService.handleError(error);
          return observableThrowError(error);
      })
  );
  }

  /**
   * Generate coords from Location
   */
  geoCode(searchData: string) {
    console.log('searchData', searchData);
    const callUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
    const params = new HttpParams()
      .set('address', searchData)
      .set('key', environment.APIKEY);
    console.log('params - env APIKEY', params);
    return this.httpClient.get<Response>(
      callUrl, {params}).pipe(
        map(data => {
          if (data) {
            console.log('data is of type...', typeof data);
            return data;
          } else {
            console.log('Error on GET to ' + callUrl);
            console.log('Data is ' + JSON.stringify(data));
            return null;
         }
      }),
      catchError((error: HttpErrorResponse) => {
        // this.errorService.handleError(error);
        console.log('error', error);
        return observableThrowError(error);
      })
    );
  }


  /**
   * Filter markers by distance
   */
  filterByDistance(searchCoords: {lat: number, lng: number}, filterBy: number, events: any) {
    console.log('filterByDistance Fires!!!!');
    // Looking for the Angular Google Maps ---  new google.maps.geometry.spherical.computeDistanceBetween
    // References https://developers.google.com/maps/documentation/javascript/reference/geometry
    this.mapsAPILoader.load().then(() => {
      const filteredArray = [];
      events.filter((e, i) => {
        const searchLocation = new google.maps.LatLng(searchCoords.lat, searchCoords.lng);
        const eventLocation = new google.maps.LatLng(e.latitude, e.longitude);
        const distanceInMiles = google.maps.geometry.spherical.computeDistanceBetween(searchLocation, eventLocation) / 1609.344;
        console.log('distanceInMiles', distanceInMiles);
          if (distanceInMiles < filterBy) {
            filteredArray.push(e);
          }
      });
      // return filteredArray;
      this.filteredSubject.next(filteredArray);
      return;
    });
  }
}

