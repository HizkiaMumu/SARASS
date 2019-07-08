import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailPeraturanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-peraturan',
  templateUrl: 'detail-peraturan.html',
})
export class DetailPeraturanPage {

  peraturan: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.peraturan = this.navParams.data.peraturan;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPeraturanPage');
  }

}
