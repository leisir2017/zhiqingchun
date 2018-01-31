import { Component,ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../model/user';
import { Storage } from '@ionic/storage';
import { NativeProvider } from '../../providers/native/native';
import { Events } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';
import { ApiProvider } from '../../providers/api/api';


@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
	lists:any = [];
    msg:string = '';
    objuser:any={};
    chatlog:any={};
    username:string = '游客';
    avatar:string = '';
  	constructor(
	  	public navCtrl: NavController, 
	  	public navParams: NavParams,
	   	public nativeProvider:NativeProvider,
	    public events:Events,
	    public apiProvider:ApiProvider,
	    public nativeAudio:NativeAudio,
	    public cd: ChangeDetectorRef,
	    public user:User,
	    public storage:Storage) {
	    this.objuser = navParams.get('info');

  	}

  
  	ionViewDidLoad() {
        this.nativeAudio.preloadSimple('msgmp3', 'assets/data/audio/msg.mp3');
        this.username = this.user.username?this.user.username:'游客';
        this.avatar = this.user.avatar?this.user.avatar:'assets/imgs/avatar.png';
        this.getList();       

    }

    ionViewWillEnter(){

        let self = this;
        this.events.subscribe('ReceiveMsg', (res) => {
            let time = new Date().toLocaleTimeString().replace('上午','').replace('下午','');
            let date = new Date().toLocaleDateString().replace("/", '-').replace("/", '-');
            let addtime = date + ' ' + time;
            self.lists.push({id: this.objuser.id, username: this.objuser.username, avatar: this.objuser.avatar, msg: res.message, addtime: addtime});

            let logs = this.chatlog;
            	logs[this.user.id+this.objuser.id] = this.lists;
            this.storage.set('chatlog', logs);
            self.msg = '';
            self.nativeAudio.play('msgmp3');
            this.cd.detectChanges();  
        });
    }

    ionViewDidLeave(){
        this.events.unsubscribe('ReceiveMsg');
    }

    send() {
        let id = this.user.id;
        let time = new Date().toLocaleTimeString().replace('上午','').replace('下午','');
        let date = new Date().toLocaleDateString().replace("/", '-').replace("/", '-');
        let addtime = date + ' ' + time;
        let username = this.user.username==''?'游客':this.user.username;
        let pushData = {
	        	alias:this.objuser.id,
	        	msg:this.msg
        	};
        	this.apiProvider.post('demand/chat',pushData).subscribe(data=>{
        		this.nativeProvider.showToast(data.http_code)
        	})
        if (this.msg != '') {
            this.lists.push({id: id, username: username, avatar: this.user.avatar, msg: this.msg, addtime: addtime});
            let logs = this.chatlog;
            	logs[this.user.id+this.objuser.id] = this.lists;
            this.storage.set('chatlog', logs);
            this.msg = '';
        }
    }

    getList() {
    	let key = this.user.id + this.objuser.id;
        this.storage.get('chatlog').then((val) => {
        	this.chatlog = val?val:{};
            if (val && val != '' && val[key])
                this.lists = val[key]
            else
                this.lists = [];
        });
    }


}
