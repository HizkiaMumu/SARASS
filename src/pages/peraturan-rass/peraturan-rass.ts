import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HostProvider } from '../../providers/host/host';
import { HttpClient } from '@angular/common/http';

import { DetailPeraturanPage } from '../detail-peraturan/detail-peraturan';

@IonicPage()
@Component({
  selector: 'page-peraturan-rass',
  templateUrl: 'peraturan-rass.html',
})
export class PeraturanRassPage {

  showSearchbar: boolean;
  trafficDone: boolean;
  peraturanRass: any;
  backupData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private host: HostProvider) {
    this.getPeraturan();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PeraturanRassPage');
  }

  getPeraturan(){
    this.trafficDone = false;
    this.http.get(this.host.baseUrl + '/peraturan-rass').subscribe(response => {
      this.peraturanRass = response;
      this.backupData = response;
      console.log(this.peraturanRass);
      this.trafficDone = true;
    }, err => {
      console.log(err);
      this.trafficDone = true;
    });
  }

  toogleSearchBar(){
    if (this.showSearchbar == true) {
      this.showSearchbar = false;
      this.getPeraturan();
    } else {
      this.showSearchbar = true;
    }
  }

  pushDetailPeraturanPage(data){
    this.navCtrl.push(DetailPeraturanPage, {
      peraturan: data
    });
  }

  initializeItems(){
    console.log("backupdata");
    console.log(this.backupData);
    this.peraturanRass = this.backupData;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.peraturanRass.peraturan = this.peraturanRass.peraturan.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.getPeraturan();
    }
  }

}
