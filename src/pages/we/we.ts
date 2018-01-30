import { Component } from '@angular/core';
import { Platform,IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { User } from '../../model/user';
import { Storage } from '@ionic/storage';
import { NativeProvider } from '../../providers/native/native';
import { WeService } from './WeService';
import { HelperProvider } from '../../providers/helper/helper';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';

/**
 * Generated class for the WePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-we',
    templateUrl: 'we.html',
    providers: [WeService]
})
export class WePage {
    userInfo:any = {};
    versionCode:any = 1;
    isLogin:boolean = false;

    constructor(public navCtrl:NavController,
                public modalCtrl:ModalController,
                public navParams:NavParams,
                public weService:WeService,
                public user:User,
                public storage:Storage,
                public platform:Platform,
                public helperProvider:HelperProvider,
                public httpserviceProvider:HttpserviceProvider,
                public nativeProvider:NativeProvider) {

    }

    ionViewWillEnter() {
        this.storage.get('user').then(val=> {
            if (val && val.id) {
                this.userInfo = val
                this.isLogin = true;
            } else {
                this.isLogin = false;
            }
        })

        /*
         if( this.user.id )
         this.isLogin = true;
         else
         this.isLogin = false;
         */
    }

    ionViewDidLoad() {
        // this.userInfo = this.user;
        this.nativeProvider.getVersionNumber().subscribe(currentNo => {
            this.versionCode = currentNo;
        });

    }

    clearCache() {
        this.nativeProvider.showLoading('清除缓存中...')
        this.storage.remove("lists");
        this.nativeProvider.hideLoading();
        setTimeout(() => {
            this.nativeProvider.showToast('清除成功');
        }, 1000);

    }

    selectViersion() {
        this.nativeProvider.showLoading();
        this.weService.getVersion().subscribe(result => {
            this.nativeProvider.hideLoading();
            if (result.code == 0 && result.version != this.versionCode) {
                this.helperProvider.assertUpgrade().subscribe(res => {//检测app是否升级
                    res.update && this.nativeProvider.downloadApp();
                });
            } else {
                this.nativeProvider.showToast("已经是最新版本");
            }
        });


    }

    goLogin() {
        let that = this;
        let modal = this.modalCtrl.create('LoginPage');
        modal.onDidDismiss(data => {
            if (data && data.id) {
                that.nativeProvider.showLoading();
                setTimeout(() => {
                    that.userInfo = data;
                    that.isLogin = true;
                }, 800)
                setTimeout(() => {
                    that.userInfo = data;
                    that.isLogin = true;
                    that.nativeProvider.hideLoading();
                }, 1200)
            } else {
                that.isLogin = false;
            }
        });
        modal.present();

    }

    logout() {
        this.storage.remove("user");
        this.navCtrl.pop();
    }

    goReg() {
        let modal = this.modalCtrl.create('RegPage');
        modal.onDidDismiss(data => {
            this.isLogin = false;
        });
        modal.present();
    }

    mylist() {
        this.navCtrl.push('ListPage')
    }

    viewAvatar(index) {
        let picturePaths = [this.userInfo.avatar];
        this.modalCtrl.create('ImgviewPage', {'initialSlide': index, 'picturePaths': picturePaths}).present();
    }

    edit() {
        this.navCtrl.push('InfoPage')
    }

    about() {
        this.navCtrl.push('AboutPage')
    }

    send() {
        this.navCtrl.push('SendPage')
    }

    setting() {
        this.nativeProvider.showToast('sorry,no setting!');
    }

    miniSoft() {
        this.nativeProvider.minimize();
    }

    exitSoftware() {
        this.platform.exitApp();
    }

    testApi() {
        this.nativeProvider.showLoading();
        this.weService.testApi().subscribe(result => {
            this.nativeProvider.hideLoading();
            this.nativeProvider.alert("所有：" + result.value.all + " <br/>完成：" + result.value.over + "<br/>正常：" + result.value.list + "")
        });
    }
}
