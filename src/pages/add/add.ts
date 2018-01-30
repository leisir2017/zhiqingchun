import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController, LoadingController,ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeProvider } from '../../providers/native/native';
import { User } from '../../model/user';

@IonicPage()
@Component({
    selector: 'page-add',
    templateUrl: 'add.html',
})
export class AddPage {
    data:any = {};
    geo:any = {};
    allowDelete:any = true;

    constructor(public navCtrl:NavController,
                public actionSheetCtrl:ActionSheetController,
                public loadingCtrl:LoadingController,
                public alertCtrl:AlertController,
                public modalCtrl:ModalController,
                public storage:Storage,
                public user:User,
                public nativeProvider:NativeProvider,
                public viewCtrl:ViewController,
                public navParams:NavParams) {
    }

    ionViewDidLoad() {

    }

    local() {
        this.geo.address = '定位中..';
        this.nativeProvider.getUserLocation().subscribe((resp) => {
            this.storage.set('geolocation', resp);
            this.geo = resp;
            this.data.city = resp.province + resp.road;
            this.data.address = resp.address;
        }, error=> {
            this.data.city = '未知';
            this.data.address = '未知';
        });

    }

    ionViewWillLoad() {
        this.data.images = [];
        this.storage.get('geolocation').then((val) => {
            if (val || val != '') {
                this.geo = val;
                this.data.city = val.province + val.road;
                this.data.address = val.address;
            } else {
                this.local();
            }
        })
    }

    add() {
        if (!this.data.title || this.data.title == '') {
            this.nativeProvider.showToast("请输入标题");
            return
        }
        if (!this.data.content || this.data.content == '') {
            this.nativeProvider.showToast("请输入内容");
            return
        }
        let loader = this.loadingCtrl.create({
            content: "发布中..."
        });
        let nowdate = this.nativeProvider.getDay(0);
        loader.present();
        this.data.id = new Date().getTime();
        this.data.username = this.user.username ? this.user.username : '游客';
        this.data.avatar = this.user.avatar;
        this.data.addtime = nowdate
        this.data.like = 0;
        this.data.comment = 0;

        this.storage.get('lists')
            .then((val)=> {
                if (val) {
                    let v = val;
                    if (!val[nowdate]) {
                        v[nowdate] = [this.data];
                    } else {
                        v[nowdate].push(this.data)
                    }
                    this.storage.set('lists', v);
                } else {
                    let datas = {};
                    datas[nowdate] = [this.data];
                    this.storage.set('lists', datas);
                }
                loader.dismiss();
                this.nativeProvider.showToast("发布成功")
                this.dismiss();
            });

    }


    deletePicture(index) {
        this.alertCtrl.create({
            title: '确认删除？',
            buttons: [{text: '取消'},
                {
                    text: '确定',
                    handler: () => {
                        this.data.images.splice(index, 1);
                    }
                }
            ]
        }).present();
    }

    viewerPicture(index) {//照片预览
        let picturePaths = [];
        for (let fileObj of this.data.images) {
            picturePaths.push(fileObj);
        }
        this.modalCtrl.create('ImgviewPage', {'initialSlide': index, 'picturePaths': picturePaths}).present();
    }

    addimgs() {
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
            //this.nativeProvider.showToast(img)
            this.data.images.push(img)
        }
    }


    dismiss() {
        this.viewCtrl.dismiss();
    }

}
