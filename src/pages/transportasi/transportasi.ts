import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RuteMapPage } from '../rute-map/rute-map';

@IonicPage()
@Component({
  selector: 'page-transportasi',
  templateUrl: 'transportasi.html',
})
export class TransportasiPage {

  schoolData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.schoolData = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransportasiPage');
  }

  selectTransportation(selectedTransportation){
    this.navCtrl.push(RuteMapPage, {
      transportation: selectedTransportation,
      school_data: this.schoolData
    });
  }

}
