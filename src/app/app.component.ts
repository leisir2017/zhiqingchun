import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, IonicApp, Keyboard, AlertController,ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeProvider } from '../providers/native/native';
import { Storage } from '@ionic/storage';
import { User } from '../model/user';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any = '';
    backButtonPressed:boolean = false;  //用于判断返回键是否触发
    @ViewChild('myNav') nav:Nav;

    constructor(public ionicApp:IonicApp,
                public keyboard:Keyboard,
                public alertCtrl:AlertController,
                private toastCtrl:ToastController,
                private native:NativeProvider,
                private storage:Storage,
                public platform:Platform,
                public user:User,
                private statusBar:StatusBar,
                splashScreen:SplashScreen) {

        this.storage.get("adv").then((val) => {
            if (val) {
                this.rootPage = 'WelcomePage';
            } else {
                this.rootPage = 'HomePage';
            }
        })

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.statusBar.overlaysWebView(false);
            this.statusBar.backgroundColorByHexString('#488aff');
            splashScreen.hide();
            this.registerBackButtonAction();//注册返回按键事件
            this.assertNetwork();//检测网络

            this.storage.get("user").then(user=> {
                if (user && user.id) {
                    this.user.id = user.id;
                    this.user.username = user.username;
                    this.user.avatar = user.avatar;
                    this.user.password = user.password;
                    this.user.phone = user.phone;
                    this.user.email = user.email;
                    this.user.intro = user.intro;
                    this.user.age = user.age;
                    this.user.gender = user.gender;
                }
            })


        });
    }

    assertNetwork() {
        if (!this.native.isConnecting()) {
            this.toastCtrl.create({
                message: '未检测到网络,请连接网络',
                showCloseButton: true,
                closeButtonText: '确定'
            }).present();
        }
    }

    registerBackButtonAction() {
        if (!this.native.isAndroid()) {
            return;
        }
        this.platform.registerBackButtonAction(() => {

            if (this.keyboard.isOpen()) { //如果键盘开启则隐藏键盘
                this.keyboard.close();
                return;
            }


            //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
            this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive()
            let activePortal = this.ionicApp._modalPortal.getActive() || this.ionicApp._toastPortal.getActive() || this.ionicApp._overlayPortal.getActive();
            if (activePortal) {
                activePortal.dismiss();
                return;
            }

            let activeVC = this.nav.getActive();
            let activeNav = activeVC.getNav();
            return activeNav.canGoBack() ? activeNav.pop() : this.showExit();


        }, 1);
    }

    //双击退出提示框
    showExit() {
        if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
            this.platform.exitApp();
        } else {
            this.native.showToast('再按一次退出应用');
            this.backButtonPressed = true;
            setTimeout(() => { //2秒内没有再次点击返回则将触发标志标记为false
                this.backButtonPressed = false;
            }, 2000)
        }
    }


}

