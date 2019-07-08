import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HostProvider } from '../../providers/host/host';
import { HttpClient } from '@angular/common/http';

import { TransportasiPage } from '../transportasi/transportasi';

@IonicPage()
@Component({
  selector: 'page-rute-rass',
  templateUrl: 'rute-rass.html',
})
export class RuteRassPage {

  showSearchbar: boolean;
  trafficDone: boolean;
  backupData: any;
  schools: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private host: HostProvider, public http: HttpClient) {
    this.getSchools();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RuteRassPage');
  }

  getSchools(){
    this.trafficDone = false;
    this.http.get(this.host.baseUrl + '/sekolah').subscribe(response => {
      this.schools = response;
      this.backupData = response;
      console.log(this.schools);
      this.trafficDone = true;
    }, err => {
      console.log(err);
      this.trafficDone = true;
    });
  }

  pushTransportationPage(school){
    this.navCtrl.push(TransportasiPage, school);
  }

  toogleSearchBar(){
    if (this.showSearchbar == true) {
      this.showSearchbar = false;
      this.getSchools();
    } else {
      this.showSearchbar = true;
    }
  }

  initializeItems(){
    console.log("backupdata");
    console.log(this.backupData);
    this.schools = this.backupData;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.schools.sekolah = this.schools.sekolah.filter((item) => {
        return (item.nama_sekolah.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.getSchools();
    }
  }

}
