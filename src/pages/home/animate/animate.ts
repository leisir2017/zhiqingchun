import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';
import { HttpserviceProvider } from '../../../providers/httpservice/httpservice';

/**
 * Generated class for the AnimatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-animate',
    templateUrl: 'animate.html',
})
export class AnimatePage {
    hotMovies:any = [];
    comingMovies:any = [];
    rooms:any = [];
    nextbtn:any = true;
    comingnextbtn:any = true;
    roomnextbtn:any = true;
    offset:any = 0;
    pet: string = "热映电影";
    type: string = "hot";
    constructor(public httpserviceProvider: HttpserviceProvider,
                public navCtrl:NavController,
                public modalCtrl:ModalController,
                public navParams:NavParams,
                public viewCtrl:ViewController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AnimatePage');
        this.getHotMovies();
        this.getComingMovies();
        this.getMoviesRoom();
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    getHotMovies() {
        let offset = this.offset*10;
        let hotMoviesUrl: string = "http://m.maoyan.com/movie/list.json?type=hot&offset="+offset+"&limit=10";
        this.httpserviceProvider.get(hotMoviesUrl).subscribe(data => {
           var datas = data['_body'];
            if(datas){
                datas = JSON.parse(datas);
                this.nextbtn = datas["data"]["hasNext"];
                for (var i=0;i<datas["data"]["movies"].length;i++)
                    this.hotMovies.push(datas["data"]["movies"][i]);
            }
        });
    }

    // 即将上映
    getComingMovies() {
        let offset = this.offset*10;
        let Url: string = "http://m.maoyan.com/movie/list.json?type=coming&offset="+offset+"&limit=10";
        this.httpserviceProvider.get(Url).subscribe(data => {
           var datas = data['_body'];
            if(datas){
                datas = JSON.parse(datas);
                this.comingnextbtn = datas["data"]["hasNext"];
                for (var i=0;i<datas["data"]["movies"].length;i++)
                    this.comingMovies.push(datas["data"]["movies"][i]);
            }
        });
    }
    // 影院
    getMoviesRoom() {
        let offset = this.offset*10;
        let Url: string = "http://m.maoyan.com/cinemas.json?offset="+offset+"&limit=10";
        this.httpserviceProvider.get(Url).subscribe(data => {
           var datas = data['_body'];
            if(datas){
                datas = JSON.parse(datas);
                this.roomnextbtn = false;
                var i = 0;
                for(var variable in datas["data"]){   //variable  为 index
                    if( variable ){
                        i++;
                        for (var j = 0;j<datas["data"][variable].length;j++){
                            this.rooms.push(datas["data"][variable][j]);
                        }
                        if(i>4)
                            break;
                    }

                }
            }
        });
    }
    settype(type){
        this.type = type;
    }
    loadmore(){
        this.offset = this.offset + 1;
        this.getHotMovies();
    }

    showmovie(id){
        let modal = this.modalCtrl.create('MoviePage', {"id":id});
        modal.present();
    }
    showroom(id){

    }

    viewerPicture(index) {//照片预览
        let picturePaths = [];
        for (let fileObj of this.hotMovies) {
            picturePaths.push(fileObj.img);
        }
        this.modalCtrl.create('ImgviewPage', {'initialSlide': index, 'picturePaths': picturePaths}).present();
    }


}
