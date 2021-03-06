import { Component,ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../model/user';
import { Storage } from '@ionic/storage';
import { NativeProvider } from '../../providers/native/native';
import { Events } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';

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
    lists:any = [];
    msg:string = '';
    username:string = '游客';
    avatar:string = '';

    constructor(public navCtrl:NavController,
                public navParams:NavParams,
                public nativeProvider:NativeProvider,
                public events:Events,
                public nativeAudio:NativeAudio,
                public cd: ChangeDetectorRef,
                public user:User,
                public storage:Storage) {

        

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
            self.lists.push({id: 999999, username: '致青春', avatar: 'assets/imgs/avatar_logo.png', msg: res.message, addtime: addtime});
            self.storage.set('feedback', self.lists);
            self.msg = '';
            self.nativeAudio.play('msgmp3');
            this.cd.detectChanges();  
        });
    }

    ionViewDidLeave(){
        this.events.unsubscribe('ReceiveMsg');
    }

    send() {
        let id = new Date().getTime();
        let time = new Date().toLocaleTimeString().replace('上午','').replace('下午','');
        let date = new Date().toLocaleDateString().replace("/", '-').replace("/", '-');
        let addtime = date + ' ' + time;
        let username = this.user.username==''?'游客':this.user.username;
        if (this.msg != '') {
            this.lists.push({id: id, username: username, avatar: this.user.avatar, msg: this.msg, addtime: addtime});
            this.storage.set('feedback', this.lists);
            this.msg = '';
        }
    }

   

    getList() {
        this.storage.get('feedback').then((val) => {
            if (val && val != '')
                this.lists = val
            else
                this.lists = [];
        });
    }

}
