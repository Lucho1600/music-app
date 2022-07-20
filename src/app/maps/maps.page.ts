import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { Ptor } from 'protractor';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  center={
    lat: 0,
    lng: 0
  }

  markerId;
  coordinates: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  async ionViewDidEnter(){
    await this.getCurrentPosition();
    this.watchPosition();
  }

  async createMap() {
    this.newMap = await GoogleMap.create({
      id: 'my-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.googleApiKey,
      config: {
        center: this.center,
        zoom: 14,
      }
    });
    //this.newMap.enableCurrentLocation(true);
    this.addMarket(this.center.lat,this.center.lng);
    this.addListeners();
    //this.newMap.enableTrafficLayer (true);
    
  }

  async getCurrentPosition(){
    const coordinates = await Geolocation.getCurrentPosition();
    this.center = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    }
    this.createMap();
  }

  async addMarket(lat,lng){
    this.markerId = await this.newMap.addMarker({
      coordinate: {
        lat: lat,
        lng: lng
      },
      draggable: true,
      opacity: 0.5,
      iconUrl: 'assets/images/music-icon.png'
    });
  }

  async watchPosition(){
    await Geolocation.watchPosition({},position=>{
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      this.setCamera(this.center.lat,this.center.lng);
      this.coordinates.push({coordinates:{
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      })
    });
  }

  setCamera(lat,lng){
    this.removeMarker();
    this.addMarket(lat,lng);
    this.newMap.setCamera ({
      coordinate:{
        lat:lat,
        lng:lng
      },
      animate:true,
      animationDuration: 100
    });
  }
  async removeMarker(id?){
    await this.newMap.removeMarker(id ? id : this.markerId);
  }

  async addListeners(){
    await this.newMap.setOnMarkerClickListener((event)=>{
      this.removeMarker(event.markerId)
    })

    await this.newMap.setOnMapClickListener((event)=>{
      this.addMarket(event.latitude, event.longitude)
    })
  }

  async showCoordsHistory(){
    //console.log(this.coordinates)
    //this.coordinates.forEach(coord => {
    //  this.addMarket(coord.lat,coord.lng);
    //});

    await this.newMap.addMarkers(this.coordinates)
  }
}