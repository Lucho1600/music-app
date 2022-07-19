import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.createMap();
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.googleApiKey,
      config: {
        center: {
          lat: 11.012482,
          lng: -74.821506,
        },
        zoom: 14,
      }
    })
  }

}