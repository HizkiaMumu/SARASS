import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HostProvider } from '../../providers/host/host';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  showSearchbar: boolean;
  trafficDone: boolean;
  infoData: any;
  trustedVideoUrl: SafeResourceUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private host: HostProvider, private domSanitizer: DomSanitizer) {
    this.getInfo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }

  getInfo(){
    this.trafficDone = false;
    this.http.get(this.host.baseUrl + '/info-rass').subscribe(response => {
      this.infoData = response;
      console.log(this.infoData);
      this.trafficDone = true;
      this.safeUrl();
    }, err => {
      console.log(err);
      this.infoData = true;
    });
  }

  safeUrl(){
    for(let i of this.infoData.info){
      i.trustedVideoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + i.yt_url);
    }
  }

  toogleSearchBar(){
    if (this.showSearchbar == true) {
      this.showSearchbar = false;
    } else {
      this.showSearchbar = true;
    }
  }

  assembleHTMLItem(html) {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }

}
