import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var GMaps;

@IonicPage()
@Component({
  selector: 'page-rute-map',
  templateUrl: 'rute-map.html',
})
export class RuteMapPage {

  @ViewChild('map') mapElement: ElementRef;
  transportation: any;
  schoolData: any;
  distance: any;
  latUser: any;
  lngUser: any;
  time: any;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
    console.log(this.navParams.data.school_data);
    this.transportation = this.navParams.data.transportation;
    this.schoolData = this.navParams.data.school_data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RuteMapPage');
    this.getUserLocation();
  }

  getUserLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
     this.latUser = resp.coords.latitude;
     this.lngUser = resp.coords.longitude;
     this.loadMap();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  loadMap(){
    console.log(this.latUser, this.lngUser);
    this.map = new GMaps({
      div: this.mapElement.nativeElement,
      lat: this.latUser,
      lng: this.lngUser
    });

    this.selectRoute();
  }

  selectRoute(){
    console.log("TRANSPORTATION: " + this.transportation);
    if (this.transportation == "Jalan Kaki") {
      this.showRoute('walking');
    } else if (this.transportation == "Bersepeda" || this.transportation == "Kendaraan Pribadi") {
      this.showRoute('driving');
    }
  }

  showRoute(selectedTransportation){
    this.map.addMarker({
      lat: this.latUser,
      lng: this.lngUser,
      title: 'Lokasi User'
    });

    this.map.addMarker({
      lat: this.schoolData.lat,
      lng: this.schoolData.lng,
      title: this.schoolData.nama_sekolah
    });

    this.map.drawRoute({
      origin: [this.latUser, this.lngUser],
      destination: [this.schoolData.lat, this.schoolData.lng],
      travelMode: selectedTransportation, // BICYCLING
      strokeColor: '#488aff',
      strokeOpacity: 0.6,
      strokeWeight: 6
    });

    let route = this.map.getRoutes({
      origin: [this.latUser, this.lngUser],
      destination: [this.schoolData.lat, this.schoolData.lng],
      callback: (e) => {
        var time = 0; // unconverted time
        var distance = 0; // unconverted distance

        for (var i=0; i<e[0].legs.length; i++) {
            time += e[0].legs[i].duration.value;
            distance += e[0].legs[i].distance.value;
        }

        if (time > 60 && distance > 1000) {
          this.time     = Math.round(time / 60); // converted time => second to minute
          this.distance = Math.round(distance / 1000); // converted distance => meter to kilometer
        } else {
          this.time     = time; // not converted because the value will be 0
          this.distance = distance; // not converted because the value will be 0
        }

      }
    });

  }

}
