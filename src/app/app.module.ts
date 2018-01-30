import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AppMinimize } from "@ionic-native/app-minimize";
import { AppVersion } from "@ionic-native/app-version";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Network } from "@ionic-native/network";
import { Toast } from "@ionic-native/toast";
import { IonicStorageModule } from '@ionic/storage';
import { Diagnostic } from "@ionic-native/diagnostic";
import { Geolocation } from '@ionic-native/geolocation';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { MyApp } from './app.component';

import { Camera } from "@ionic-native/camera";
import { File } from "@ionic-native/file";
import { FileTransfer } from "@ionic-native/file-transfer";
import { FileOpener } from "@ionic-native/file-opener";
import { ImagePicker } from "@ionic-native/image-picker";
import { HttpModule } from "@angular/http";
import { StreamingMedia } from '@ionic-native/streaming-media';
import { Media } from '@ionic-native/media';
import { MusicControls } from '@ionic-native/music-controls';
import { NativeAudio } from '@ionic-native/native-audio';

import { NativeProvider } from '../providers/native/native';
import { UsertableProvider } from '../providers/usertable/usertable';
import { User } from '../model/user';
import { UtilsProvider } from '../providers/utils/utils';
import { HelperProvider } from '../providers/helper/helper';
import { HttpserviceProvider } from '../providers/httpservice/httpservice';
import { HttpClientModule } from "@angular/common/http";
import { ApiProvider } from '../providers/api/api';

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        HttpModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp, {
            backButtonText: "",
            iconMode: "ios",
            modalEnter: "modal-slide-in",
            modalLeave: "modal-slide-out",
            tabsPlacement: 'bottom',
            pageTransition: 'ios',
            'mode': 'ios'
        }),
        IonicStorageModule.forRoot(),
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AppMinimize,
        InAppBrowser,
        AppVersion,
        Network,
        Toast,
        Camera,
        File,
        FileTransfer,
        FileOpener,
        ImagePicker,
        Media,
        MusicControls,
        NativeAudio,
        StreamingMedia,
        Diagnostic,
        Geolocation,
        BarcodeScanner,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        NativeProvider,
        UsertableProvider,
        User,
        UtilsProvider,
        HelperProvider,
        HttpserviceProvider,
    ApiProvider
    ]
})
export class AppModule {
}
