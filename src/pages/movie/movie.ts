import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,Slides,ModalController } from 'ionic-angular';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';

/**
 * Generated class for the MoviePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-movie',
    templateUrl: 'movie.html',
})
export class MoviePage {
    @ViewChild(Slides) slides: Slides;

    info:any = {};
    comments:any = [];
    hasCommentNext:any = true;
    hasCommentTotal:number = 0;
    id:any;
    offset:any = 0;
    constructor(public navCtrl:NavController,
                public navParams:NavParams,
                public viewCtrl:ViewController,
                public modalCtrl:ModalController,
                public httpserviceProvider:HttpserviceProvider) {
        this.id = navParams.get('id');
    }

    ionViewDidLoad() {
        console.log('movie info')
        this.getMovieInfo();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    getMovieInfo() {
        if (!this.id)
            this.viewCtrl.dismiss();
        let hotMoviesUrl:string = "http://m.maoyan.com/movie/" + this.id + ".json";
        this.httpserviceProvider.get(hotMoviesUrl).subscribe(data => {
            var datas = data['_body'];
            if (datas)
                datas = JSON.parse(datas);
            this.info = datas["data"]["MovieDetailModel"];
            this.loadcomment();
        });
    }

    loadmorecomment(){
        this.offset = this.offset + 1;
        this.loadcomment();
    }

    loadcomment(){
        if (!this.id)
            this.viewCtrl.dismiss();

        let offset = this.offset*10;

        let Url:string = "http://m.maoyan.com/comments.json?movieid="+this.id+"&offset="+offset+"&limit=10";
        this.httpserviceProvider.get(Url).subscribe(data => {
            var datas = data['_body'];
            if (datas){
                datas = JSON.parse(datas);
                for (var i=0;i<datas["data"]["CommentResponseModel"]["cmts"].length;i++){
                    this.comments.push(datas["data"]["CommentResponseModel"]["cmts"][i]);
                }
                this.hasCommentNext = datas["data"]["hasNext"];
                this.hasCommentTotal = datas["data"]["total"];
            }
        });
    }

    viewerPicture(index) {//照片预览
        let picturePaths = [];
        for (let fileObj of this.info.photos) {
            picturePaths.push(fileObj.replace('w.h',''));
        }
        this.modalCtrl.create('ImgviewPage', {'initialSlide': index, 'picturePaths': picturePaths}).present();
    }

    viewerPictureInfo() {//照片预览
        let index = 0;
        let picturePaths = [];
            picturePaths.push(this.info.img);
        this.modalCtrl.create('ImgviewPage', {'initialSlide': index, 'picturePaths': picturePaths}).present();
    }

    viewerPictureAvatar(index) {//照片预览
        let picturePaths = [];
            picturePaths.push(this.comments[index].avatarurl);
        this.modalCtrl.create('ImgviewPage', {'initialSlide': index, 'picturePaths': picturePaths}).present();
    }

}
