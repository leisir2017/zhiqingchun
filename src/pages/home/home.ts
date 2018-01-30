import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User } from '../../model/user';
import { NativeProvider } from '../../providers/native/native';
import { Geolocation } from '@ionic-native/geolocation';


@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {
    lists:any = [];
    colors:any = [];
    localtion:string = '定位';
    backgrounds = [
        'assets/imgs/background/background-1.jpg',
        'assets/imgs/background/background-2.jpg',
        'assets/imgs/background/background-3.jpg',
        'assets/imgs/background/background-4.jpg',
        'assets/imgs/background/background-5.jpg',
        'assets/imgs/background/background-6.jpg',
        'assets/imgs/background/background-7.jpg',
        'assets/imgs/background/background-8.jpg',
        'assets/imgs/background/background-9.jpg',
        'assets/imgs/background/background-10.jpg'
    ];

    constructor(public geolocation:Geolocation,
                public navCtrl:NavController,
                public nativeProvider:NativeProvider,
                public user:User,
                public storage:Storage,
                public modalCtrl:ModalController) {
        this.backgrounds = this.shuffleArray(this.backgrounds);
    }

    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    golists() {
        this.navCtrl.push('ListPage');
    }


    add() {
        let profileModal = this.modalCtrl.create('AddPage');
        profileModal.onDidDismiss(data => {
            this.getList()
        });
        profileModal.present();

    }

    info(item) {
        let modal = this.modalCtrl.create('ShowPage', {info: item});
        modal.present();
    }

    ionViewDidEnter() {

    }

    qrcanner() {
        if (this.nativeProvider.isMobile()) {
            this.nativeProvider.scan().subscribe(res => {
                if (res)
                    this.nativeProvider.alert(res);
            });
        }
    }

    game() {
        this.storage.set('adv', 1);
        this.navCtrl.push('GamePage');
    }

    local() {
        this.localtion = '定位中..';
        this.nativeProvider.getUserLocation().subscribe((resp) => {
            this.storage.set('geolocation', resp);
            this.localtion = resp.road?resp.road:'定位失败';
        }, error=> {
            this.localtion = '定位失败';
            setTimeout(() => { //2秒内没有再次点击返回则将触发标志标记为false
                this.localtion = '定位';
            }, 2000)
        });

    }


    ionViewWillEnter() {
        this.colors = [];
        for (var i = 0; i < 9; i++) {
            let num = Math.ceil(Math.random() * 9) + '';
            this.colors.push('bordercolor' + <string>num);
        }

        this.getList();

        this.storage.get('geolocation').then((val) => {
            if (val && val != '') {
                this.localtion = val.road?val.road:'定位失败';
            } else {
                this.localtion = '定位';
                this.local();
            }
        })

    }

    getList() {
        let nowdate = this.nativeProvider.getDay(0);
        this.storage.get('lists').then((val) => {
            if (val && val[nowdate])
                this.lists = val[nowdate]
            else
                this.lists = [];
        });
    }


    person() {
        this.navCtrl.push('WePage');
    }

    domenu() {
        this.modalCtrl.create('AnimatePage').present();
    }

}
