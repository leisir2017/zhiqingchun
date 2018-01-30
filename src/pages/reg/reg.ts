import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NativeProvider } from '../../providers/native/native';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the RegPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-reg',
    templateUrl: 'reg.html',
})
export class RegPage {
    id:number;
    username:string = '';
    password:string = '';
    gender:number = 1;
    age:number;
    intro:string = '';
    email:string = '';
    phone:string = '';
    location:string = '';
    avatar:string = 'assets/imgs/avatar.png';

    constructor(public navCtrl:NavController,
                public storage:Storage,
                public viewCtrl:ViewController,
                public navParams:NavParams,
                public nativeProvider:NativeProvider) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegPage');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    sex(type) {
        this.gender = type;
        if (type == 1) {
            this.avatar = 'assets/imgs/gg.jpg';
        } else {
            this.avatar = 'assets/imgs/mm.jpg';
        }
    }

    reg() {
        if (this.username == '') {
            this.nativeProvider.showToast('请输入用户名');
            return false;
        }
        if (this.password == '') {
            this.nativeProvider.showToast('请输入密码');
            return false;
        }
        if (this.phone == '') {
            this.nativeProvider.showToast('请输入手机号');
            return false;
        }

        let regdata = {
            id: new Date().getTime(),
            username: this.username,
            avatar: this.avatar,
            password: this.password,
            phone: this.phone,
            email: this.email,
            intro: this.intro,
            age: this.age,
            gender: this.gender
        }

        this.storage.get('regList')
            .then((val)=> {
                if (val) {
                    if (val[regdata.username]) {
                        this.nativeProvider.showToast("用户名已存在~")
                        return;
                    }

                    let v = val;
                    v[regdata.username] = regdata;

                    this.storage.set('regList', v);
                } else {
                    let datas = {};
                    datas[regdata.username] = regdata;
                    this.storage.set('regList', datas);
                }
                this.nativeProvider.showToast("注册成功")
                this.viewCtrl.dismiss();
            });


    }


}
