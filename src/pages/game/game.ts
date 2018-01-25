import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeProvider } from '../../providers/native/native';

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public nativeProvider: NativeProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }

  start(){
  	this.nativeProvider.showToast("开始个毛线~")
  }
}
