import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../model/user';
import { Storage } from '@ionic/storage';
import { NativeProvider } from '../../providers/native/native';

/**
 * Generated class for the SendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-send',
  templateUrl: 'send.html',
})
export class SendPage {
	lists : any = [];
	msg : string = '';
  constructor(public navCtrl: NavController,
   	public navParams: NavParams,
   	public nativeProvider: NativeProvider,
   	public user: User,
   	public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendPage');
  }
  ionViewWillLoad() {
     this.getList();
  }

  send(){
  	let id =  new Date().getTime();
  	let addtime = new Date().toLocaleDateString();
        addtime = addtime.replace("/",'-').replace("/",'-');
  	if(this.msg!=''){
  		this.lists.push({id:id,username:this.user.username,msg:this.msg,addtime:addtime});
  		this.storage.set('feedback',this.lists);
  		this.nativeProvider.showToast('反馈成功');
  		this.msg = '';
  	}
  }

  getList(){
    this.storage.get('feedback').then((val) => {
        if(val && val != '')
          this.lists = val
        else
          this.lists = [];
    });
  }

}
