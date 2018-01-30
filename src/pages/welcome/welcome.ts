import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html',
})
export class WelcomePage {
    @ViewChild(Slides) slides:Slides;

    constructor(public navCtrl:NavController, public navParams:NavParams, public storage:Storage) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad WelcomePage');
    }

    ngAfterViewInit() {
        this.slides.slidesPerView = "auto";
    }

    goToHome() {
        this.storage.remove('adv');
        this.navCtrl.setRoot('HomePage');

    }
}
