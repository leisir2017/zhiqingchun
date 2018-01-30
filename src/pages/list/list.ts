import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeProvider } from '../../providers/native/native';

@IonicPage()
@Component({
    selector: 'page-list',
    templateUrl: 'list.html'
})
export class ListPage {
    lists:any = [];
    nowdate:string = '';
    day:number = 0;

    constructor(public storage:Storage,
                public nativeProvider:NativeProvider,
                public modalCtrl:ModalController,
                public navCtrl:NavController) {

    }

    ionViewDidEnter() {

    }

    ionViewWillEnter() {
        this.nowdate = this.nativeProvider.getDay(0);
        console.log(this.nowdate)
        this.getList(this.nowdate);
    }

    info(item) {
        let modal = this.modalCtrl.create('ShowPage', {info: item});
        modal.present();
    }

    getList(nowdate) {
        this.storage.get('lists').then((val) => {
            if (val && val[nowdate]) {
                for (var i = 0; i < val[nowdate].length; i++) {
                    val[nowdate][i]['time'] = this.nativeProvider.getLocalTime(val[nowdate][i]['id']);
                    this.lists.push(val[nowdate][i])
                }
            } else {
                this.nativeProvider.showToast('没有数据~')
            }
        });
    }

    // 下拉刷新
    doRefresh(refresher) {
        this.nowdate = this.nativeProvider.getDay(0);
        this.storage.get('lists').then((val) => {
            if (val && val[this.nowdate]) {
                this.lists = val[this.nowdate];
            } else {
                this.nativeProvider.showToast('没有数据~')
            }
        });
        setTimeout(() => {
            refresher.complete();
        }, 1000);

    }

    // 上拉加载更多
    doInfinite(infiniteScroll) {
        this.day = this.day - 1;
        this.nowdate = this.nativeProvider.getDay(this.day);
        this.getList(this.nowdate);
        setTimeout(() => {
            infiniteScroll.complete();
        }, 500);
    }

    // btn 加载更多
    loading() {
        this.day = this.day - 1;
        this.nowdate = this.nativeProvider.getDay(this.day);
        this.getList(this.nowdate);
    }


}
