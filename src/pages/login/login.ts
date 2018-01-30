import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { User } from '../../model/user';
import { NativeProvider } from '../../providers/native/native';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    username:string = '';
    password:string = '';

    constructor(public user:User,
                public navCtrl:NavController,
                public viewCtrl:ViewController,
                public storage:Storage,
                public navParams:NavParams,
                public nativeProvider:NativeProvider) {
    }

    ionViewDidLoad() {
        let regList = this.storage.get('regList');
        console.log(regList);
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    login() {
        if (this.username != '' && this.password != '') {


            this.storage.get('regList').then(reg=> {
                if (reg && reg[this.username]) {
                    let user = reg[this.username];
                    if (this.password != user.password) {
                        return this.nativeProvider.showToast('密码错误！')
                    }

                    this.storage.set('user', user);
                    this.user.id = user.id;
                    this.user.username = user.username;
                    this.user.avatar = user.avatar;
                    this.user.password = user.password;
                    this.user.phone = user.phone;
                    this.user.email = user.email;
                    this.user.intro = user.intro;
                    this.user.age = user.age;
                    this.user.gender = user.gender;
                    this.viewCtrl.dismiss(user);
                } else {
                    return this.nativeProvider.showToast('用户不存在！')
                }
            })

        }
    }

}
