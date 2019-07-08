import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PeraturanRassPage } from '../peraturan-rass/peraturan-rass';
import { FasilitasRassPage } from '../fasilitas-rass/fasilitas-rass';
import { RuteRassPage } from '../rute-rass/rute-rass';
import { InfoPage } from '../info/info';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  pushRuteRassPage(){
    this.navCtrl.push(RuteRassPage);
  }

  pushPeraturanRassPage(){
    this.navCtrl.push(PeraturanRassPage);
  }

  pushInfoPage(){
    this.navCtrl.push(InfoPage);
  }

  pushFasilitasRassPage(){
    this.navCtrl.push(FasilitasRassPage);
  }

  popPage(){
    this.navCtrl.pop();
  }

}
