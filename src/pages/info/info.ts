import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ActionSheetController } from 'ionic-angular';
import { User } from '../../model/user';
import { NativeProvider } from '../../providers/native/native';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-info',
    templateUrl: 'info.html',
})
export class InfoPage {
    info:any = {};

    constructor(public navCtrl:NavController,
                public navParams:NavParams,
                public nativeProvider:NativeProvider,
                public actionSheetCtrl:ActionSheetController,
                public storage:Storage,
                public user:User) {
        this.info = this.user
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad InfoPage');
    }

    upAvater() {
        let actionSheet = this.actionSheetCtrl.create({
            title: '选择照片',
            buttons: [
                {
                    text: '相册',
                    handler: () => {
                        this.upImgs(2)
                    }
                }, {
                    text: '拍照',
                    handler: () => {
                        this.upImgs(1)
                    }
                }, {
                    text: '取消',
                    role: 'destructive',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    }

    // 选择上传事件
    upImgs(type) {

        let that = this;

        //拍照
        if (type == 1) {
            that.nativeProvider.getPictureByCamera({
                destinationType: 1//期望返回的图片格式,1图片路径
            }).subscribe(img => {
                that.getPictureSuccess(img);
            });
        }

        //手机相册选择
        if (type == 2) {
            that.nativeProvider.getMultiplePicture({//从相册多选
                maximumImagesCount: 12,
                destinationType: 1//期望返回的图片格式,1图片路径
            }).subscribe(imgs => {
                for (let img of <string[]>imgs) {
                    that.getPictureSuccess(img);
                }
            });
        }
    }

    private getPictureSuccess(img) {
        if (img) {
            this.user.avatar = img;
            this.storage.get('user').then(val=> {
                let u = val;
                u.avatar = img;
                this.storage.set('user', u);
            })
            this.storage.get('regList').then(val=> {
                let ulist = val;
                ulist[this.info.username].avatar = img;
                this.storage.set('regList', ulist);
            })
        }
    }

}
