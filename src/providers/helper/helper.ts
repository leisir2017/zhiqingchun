import { AlertController } from "ionic-angular";
import { Injectable } from '@angular/core';
import { HttpserviceProvider } from '../httpservice/httpservice';
import { NativeProvider } from '../native/native';
import { UtilsProvider } from '../utils/utils';
import { Observable } from "rxjs/Observable";
import { Response} from "@angular/http";
import { APP_VERSION_SERVE_URL } from "../Constants";
import 'rxjs/add/operator/map';

/*
  Generated class for the HelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelperProvider {

  constructor(
  	public httpserviceProvider: HttpserviceProvider,
  	public alertCtrl: AlertController,
  	public nativeProvider: NativeProvider) {
    console.log('Hello HelperProvider Provider');
  }


   /**
   * app是否需要更新
   * @returns {any}
   */
  assertUpgrade(): Observable<any> {
    if (!this.nativeProvider.isMobile()) {
      return Observable.of({update: false, msg: '请使用真机调试'});
    }
    return Observable.create(observer => {
      this.nativeProvider.getPackageName().subscribe(packageName => {//获得app包名
        let appName = packageName.substring(packageName.lastIndexOf('.') + 1);
        let appType = this.nativeProvider.isAndroid() ? 'android' : 'ios';
        let url = UtilsProvider.formatUrl(`${APP_VERSION_SERVE_URL}/index/app/${appName}/${appType}/latest/version`);

        this.httpserviceProvider.get(url).map((res: Response) => res.json()).subscribe(res => {
            if (res.code!=0) {
              observer.next({update: false, msg: '暂无更新信息'});
              return;
            }
          

          this.nativeProvider.getVersionNumber().subscribe(currentNo => {//获得当前app版本
            //console.log('当前版本号',currentNo)
            //console.log('获取版本号',res.version)
            if (currentNo == res.version) {//比较版本号
              observer.next({update: false, msg: '已经是最新版本'});
            } else {
              if (res.isForcedUpdate == 1) {//判断是否强制更新
                this.alertCtrl.create({
                  title: '重要升级',
                  subTitle: '您必须升级后才能使用！',
                  enableBackdropDismiss: false,
                  buttons: [{
                    text: '确定', handler: () => {
                      observer.next({update: true, msg: ''});
                    }
                  }
                  ]
                }).present();
              } else {
                this.alertCtrl.create({
                  title: '升级',
                  subTitle: '发现新版本,更新安装后将自动退出，是否立即升级？',
                  enableBackdropDismiss: false,
                  buttons: [
                    {
                      text: '取消', handler: () => {
                      observer.next({update: false, msg: ''});
                    }
                    },
                    {
                      text: '确定', handler: () => {
                      observer.next({update: true, msg: ''});
                    }
                    }
                  ]
                }).present();
              }
            }
          })


        },err=>{
            console.log(err, '从版本升级服务获取版本信息失败', {
              url: url
            })
        });
        
      })
    });


  }


}
