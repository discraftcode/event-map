import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule, ClusterManager  } from '@agm/js-marker-clusterer';
import { AgmSnazzyInfoWindowModule, AgmSnazzyInfoWindow } from '@agm/snazzy-info-window';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';

// Components
import { AppComponent } from './app.component';

// Services
import { MapService } from './services/map.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBZLeYkJbooJmk0dQ9ALuTX7mo23zO-iwc'
      // libraries: ['geometry', 'places']
    }),
    AgmJsMarkerClustererModule,
    AgmSnazzyInfoWindowModule,
    GooglePlaceModule,
    BrowserAnimationsModule,
    // Material
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  providers: [
    MapService,
    ClusterManager ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
