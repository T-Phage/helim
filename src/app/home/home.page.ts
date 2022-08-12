import { Component, OnInit } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  public apiKey = 'AIzaSyAuIrTrSeDJx7Fnx0ghzKdO52mipIBFQUM';

  constructor() {}

  async mapfunc() {

    const coordinates = await Geolocation.getCurrentPosition();
    
    const currentLatitude = await coordinates.coords.latitude
    const currentLongitude = await coordinates.coords.longitude
    
    const lat = await currentLatitude
    const lng = await currentLongitude

    const mapRef = await document.getElementById('map');
    const newMap = await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: mapRef, // reference to the capacitor-google-map element
      apiKey: this.apiKey, // Your Google Maps API Key
      config: {
        center: { lat: lat,  lng: lng},
        zoom: 15, // The initial zoom level to be rendered by the map
      },
    });

    const markerId = await newMap.addMarker({
      coordinate: {lat: lat, lng: lng},
      iconUrl: "assets/images/taxi.png"
    })

    // Enable marker clustering
    await newMap.enableClustering();
  }

  ngOnInit(): void {
    this.mapfunc()
  }
}
