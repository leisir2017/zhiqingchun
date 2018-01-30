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
    lists:any = [];
    msg:string = '';
    username:string = '游客';
    avatar:string = '';
    isface :any = false;
    ispic :any = false;
    facetype:number = 0;
    lhttp_client:any;
    leisirtoken:string = 'F6HFnuuryAXjW4eHowgOOgMCJbGi7IF6qfFxOGdTW60P7MHU7Wd07k4twWnVWpFYUz4M9Ql8abndY+tFAjDkrA==';
    mmtoken:string = 'aSoLqSBJRQVvJ0/7XqumDO+uS+DnIyFfwyp2b6ITMR1AaU0ORSOs12UQmZNLqHN+BlZuSKon4kU=';
    constructor(public navCtrl:NavController,
                public navParams:NavParams,
                public nativeProvider:NativeProvider,
                public user:User,
                public storage:Storage) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SendPage');
        //var login_data = '{"type":"login","client_name":"'+this.username+'","room_id":"1"}';

        //this.lhttp_client = new Lhttp("ws://192.168.0.20:7272/");
        //this.lhttp_client.on_open = function(context) {
        //    context.subscribe("chatroom", "chat", null, login_data);
        //}
        //this.lhttp_client.on_message = function(context){
        //    //console.log(context);
        //    console.log('login',context.getBody());
        //    //context.send("hello, there!");
        //}

    }

    ionViewWillLoad() {
        this.username = this.user.username?this.user.username:'游客';
        this.avatar = this.user.avatar?this.user.avatar:'assets/imgs/avatar.png';
        this.getList();
    }

    send() {
        let id = new Date().getTime();
        let addtime = new Date().toLocaleDateString();
        addtime = addtime.replace("/", '-').replace("/", '-');
        if (this.msg != '') {
            this.lists.push({id: id, username: this.user.username, avatar: this.user.avatar, msg: this.msg, addtime: addtime});
            this.storage.set('feedback', this.lists);
            //this.lhttp_client.context.publish("chatroom", "chat", null, {type:'say',content:this.msg,from_client_id:this.user.username,to_client_id:'all'});
            this.msg = '';
        }
    }

    face(){
        this.isface = !this.isface;
    }
    setfacetype(n){
        this.facetype = n;
    }

    pic(){
        this.ispic = !this.ispic;
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
