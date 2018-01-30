import { Component,ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeProvider } from '../../providers/native/native';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { MusicControls } from '@ionic-native/music-controls';
import { NativeAudio } from '@ionic-native/native-audio';

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-game',
    templateUrl: 'game.html',
})
export class GamePage {
    @ViewChildren('myMedia') mediaSouce: any;
    myMedia:any;
    myMusic:any;
    myAudio:any;
    isPlay:any = false;
    constructor(
                private media: Media,
                private file: File,
                private musicControls: MusicControls,
                private nativeAudio: NativeAudio,
                public navCtrl:NavController,
                public navParams:NavParams,
                public nativeProvider:NativeProvider) {

    }

    ionViewDidLoad() {
        let mp4 = 'assets/data/video/video.mp4';
        let mp3 = 'assets/data/music/1.mp3';
        this.myMedia = this.media.create(mp4);
        //this.initMusic();
        this.initAudio();
    }

    initAudio(){
        let audio = ['assets/data/audio/1.mp3','assets/data/audio/jgq.mp3','assets/data/audio/jq.mp3'];

        this.nativeAudio.preloadSimple('uniqueId1', audio[0]);
        this.nativeAudio.preloadComplex('uniqueId2', audio[1], 1, 1, 0);
        this.nativeAudio.preloadComplex('uniqueId3', audio[2], 1, 1, 0);

        this.myAudio = this.nativeAudio;


    }

    initMusic(){

        let self = this;

        this.musicControls.create({
            track       : 'Time is Running Out',        // optional, default : ''
            artist      : 'Muse',                       // optional, default : ''
            cover       : 'assets/imgs/avatar.png',      // optional, default : nothing
            // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
            //           or a remote url ('http://...', 'https://...', 'ftp://...')
            isPlaying   : true,                         // optional, default : true
            dismissable : true,                         // optional, default : false

            // hide previous/next/close buttons:
            hasPrev   : false,      // show previous button, optional, default: true
            hasNext   : false,      // show next button, optional, default: true
            hasClose  : true,       // show close button, optional, default: false

// iOS only, optional
            album       : 'Absolution',     // optional, default: ''
            duration : 60, // optional, default: 0
            elapsed : 10, // optional, default: 0
            hasSkipForward : true,  // show skip forward button, optional, default: false
            hasSkipBackward : true, // show skip backward button, optional, default: false
            skipForwardInterval: 15, // display number for skip forward, optional, default: 0
            skipBackwardInterval: 15, // display number for skip backward, optional, default: 0
            hasScrubbing: false, // enable scrubbing from control center and lockscreen progress bar, optional

            // Android only, optional
            // text displayed in the status bar when the notification (and the ticker) are updated, optional
            ticker    : 'Now playing "Time is Running Out"'
        });

        this.musicControls.subscribe().subscribe(action => {

            function events(action) {
                const message = JSON.parse(action).message;
                switch (message) {
                    case 'music-controls-next':
                        // Do something
                        break;
                    case 'music-controls-previous':
                        // Do something
                        break;
                    case 'music-controls-pause':
                        // Do something
                        break;
                    case 'music-controls-play':
                        // Do something
                        break;
                    case 'music-controls-destroy':
                        // Do something
                        break;

                    // External controls (iOS only)
                    case 'music-controls-toggle-play-pause' :
                        // Do something
                        break;
                    case 'music-controls-seek-to':
                        const seekToInSeconds = JSON.parse(action).position;
                        self.musicControls.updateElapsed({
                            elapsed: seekToInSeconds,
                            isPlaying: true
                        });
                        // Do something
                        break;
                    case 'music-controls-skip-forward':
                        // Do something
                        break;
                    case 'music-controls-skip-backward':
                        // Do something
                        break;

                    // Headset events (Android only)
                    // All media button events are listed below
                    case 'music-controls-media-button' :
                        // Do something
                        break;
                    case 'music-controls-headset-unplugged':
                        // Do something
                        break;
                    case 'music-controls-headset-plugged':
                        // Do something
                        break;
                    default:
                        break;
                }
            }

            this.musicControls.listen(); // activates the observable above

            this.musicControls.updateIsPlaying(true);
        });

        this.myMusic = this.musicControls;
    }

    doAudio(id){
        this.isPlay = !this.isPlay;
        if(this.isPlay){
            this.nativeAudio.play(id).then((result)=>{

            }, (error)=>{

            });
        }else{
            this.nativeAudio.stop(id).then((result)=>{

            }, (error)=>{

            });
        }

    }

    startMedia(){
        this.myMedia.play();
    }
    pauseMedia(){
        this.myMedia.pause();
    }
    stopMedia(){
        this.myMedia.stop();
    }

    startMusic(){
        this.myMusic.play();
    }
    pauseMusic(){
        this.myMusic.pause();
    }
    stopMusic(){
        this.myMusic.stop();
    }

    start() {
        this.nativeProvider.showToast("开始个毛线~")
    }

    initVideo(){
        this.mediaSouce.forEach(element => {
            element.nativeElement.width = element.nativeElement.clientWidth;
            element.nativeElement.height = element.nativeElement.clientHeight;
        });

    }
}
