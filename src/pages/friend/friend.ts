import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User } from '../../model/user';

/**
 * Generated class for the FriendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-friend',
  templateUrl: 'friend.html',
})
export class FriendPage {
	lists:any = [];
  constructor(
  public navCtrl: NavController, 
  public storage: Storage, 
  public user: User, 
  public navParams: NavParams) {
  }

  ionViewDidLoad() {
  	this.storage.get('regList').then(reg=> {
  		if(reg){
  			console.log(reg)
  			for(var item in reg){
  				if(item){
  			console.log(reg[item])

  					this.lists.push(reg[item]);
  				}
  			}
  		}
  	});
    console.log('ionViewDidLoad FriendPage');
  }

  sendmsg(info){
  	console.log('f',info)
  	this.navCtrl.push('ChatPage',{info:info})
  }


}
