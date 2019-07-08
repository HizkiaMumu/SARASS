import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';

import { HostProvider } from '../../providers/host/host';

declare var GMaps;
declare var google;

@IonicPage()
@Component({
  selector: 'page-fasilitas-rass',
  templateUrl: 'fasilitas-rass.html',
})
export class FasilitasRassPage {

  @ViewChild('map') mapElement: ElementRef;
  latUser: any;
  lngUser: any;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, public http: HttpClient, private host: HostProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FasilitasRassPage');
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
    this.getHalte();
  }

  locateUser(){
    this.geolocation.getCurrentPosition().then((resp) => {
     this.latUser = resp.coords.latitude;
     this.lngUser = resp.coords.longitude;
     this.map.setCenter(this.latUser, this.lngUser);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getHalte(){
    this.http.get(this.host.baseUrl + '/halte').subscribe(response => {
      console.log(response);
      this.halte = response;
      this.setHalteMarkers();
    }, err => {
      console.log(err);
    });
  }

  setHalteMarkers(){
    for(let i = 0; i < this.halte.halte.length; i++){
      console.log('marker added');
      this.map.addMarker({
        lat: this.halte.halte[i].lat,
        lng: this.halte.halte[i].lng,
        icon: "assets/icon/bus-stop.png",
        infoWindow: {
          content: '<p>' + this.halte.halte[i].nama_halte + '</p>'
        },
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
      });
    }
  }

}
