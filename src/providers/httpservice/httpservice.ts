import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs, RequestMethod } from '@angular/http';

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/timeout";
import { APP_SERVE_URL, REQUEST_TIMEOUT } from "../Constants";
import { UtilsProvider } from "../utils/utils";
import { NativeProvider } from "../native/native";


@Injectable()
export class HttpserviceProvider {

    public token:string = 'leisir';
    public token_expires:number = 0;


    constructor(public nativeProvider:NativeProvider, public http:Http) {
        console.log('Hello Httpservice Provider');
    }

    public getToken(url:string, paramMap:any = {}) {
        //let selfs = this;
        url = UtilsProvider.formatUrl(url.startsWith('http') ? url : APP_SERVE_URL + url);
        let options = new RequestOptions({
            method: RequestMethod.Get
        });
        this.http.request(url, options).timeout(REQUEST_TIMEOUT).subscribe(res => {

            if (res['_body'] == '') {
                res['_body'] = null;
            }
            let results = JSON.parse(res['_body']);
            if (results.code == 0) {
                this.token = results.value.token;
                this.token_expires = results.value.expires;
                this.nativeProvider.hideLoading();
                this.nativeProvider.showToast("令牌过期，请重新操作！");
                /*
                 url = paramMap.url;
                 options = paramMap.options;
                 url = UtilsProvider.formatUrl(url.startsWith('http') ? url : APP_SERVE_URL + url);
                 selfs.optionsAddToken(options);
                 selfs.http.request(url, options).timeout(REQUEST_TIMEOUT).subscribe(res => {

                 if (res['_body'] == '') {
                 res['_body'] = null;
                 }
                 this.nativeProvider.hideLoading();
                 this.nativeProvider.showToast("令牌过期，请重新操作！");
                 return JSON.parse(res['_body']);
                 }, err => {
                 selfs.requestFailed(url, options, err);//处理请求失败
                 });
                 */
            } else {
                return {code: 500, message: '请求错误！'};
            }
        }, err => {
            this.requestFailed(url, options, err);//处理请求失败
        });
    }

    public request(url:string, options:RequestOptionsArgs):Observable<Response> {
        let oldurl = url;
        let oldoptions = options;

        url = UtilsProvider.formatUrl(url.startsWith('http') ? url : APP_SERVE_URL + url);
        this.optionsAddToken(options);
        return Observable.create(observer => {

            this.http.request(url, options).timeout(REQUEST_TIMEOUT).subscribe(res => {

                if (res['_body'] == '') {
                    res['_body'] = null;
                }
                let results = JSON.parse(res['_body']);
                if (results.code == 403) {
                    this.getToken('index/token', {url: oldurl, options: oldoptions});
                } else {
                    this.nativeProvider.hideLoading();
                    observer.next(res);
                }
            }, err => {
                this.requestFailed(url, options, err);//处理请求失败
                observer.error(err);
            });
        });
    }

    public get(url:string, paramMap:any = null):Observable<Response> {
        this.nativeProvider.showLoading();
        return this.request(url, new RequestOptions({
            method: RequestMethod.Get,
            search: HttpserviceProvider.buildURLSearchParams(paramMap)
        }));
    }

    public post(url:string, body:any = {}):Observable<Response> {
        this.nativeProvider.showLoading();
        return this.request(url, new RequestOptions({
            method: RequestMethod.Post,
            body: body,
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8',
                'token': this.token + ''
            })
        }));
    }

    /**
     * 将对象转为查询参数
     * @param paramMap
     * @returns {URLSearchParams}
     */
    private static buildURLSearchParams(paramMap):URLSearchParams {
        let params = new URLSearchParams();
        if (!paramMap) {
            return params;
        }
        for (let key in paramMap) {
            let val = paramMap[key];
            if (val instanceof Date) {
                val = UtilsProvider.dateFormat(val, 'yyyy-MM-dd hh:mm:ss')
            }
            params.set(key, val);
        }
        return params;
    }

    /**
     * 处理请求失败事件
     * @param url
     * @param options
     * @param err
     */
    private requestFailed(url:string, options:RequestOptionsArgs, err:Response):void {
        this.nativeProvider.hideLoading();

        //err数据类型不确定,判断消息体是否有message字段,如果有说明是后台返回的json数据
        let index = JSON.stringify(err['_body']).indexOf('message');
        if (index != -1) {
            this.nativeProvider.showToast(err.json().message || '请求发生异常');
            return;
        }
        if (!this.nativeProvider.isConnecting()) {
            this.nativeProvider.showToast('请连接网络');
            return;
        }
        let status = err.status;
        let msg = '请求发生异常';
        if (status === 0) {
            msg = '请求失败，请求响应出错';
        } else if (status === 404) {
            msg = '请求失败，未找到请求地址';
        } else if (status === 500) {
            msg = '请求失败，服务器出错，请稍后再试';
        }
        this.nativeProvider.showToast(msg);
    }

    private optionsAddToken(options:RequestOptionsArgs):void {
        let token = this.token;

        if (options.headers) {

            options.headers = new Headers({
                'token': token + '',
                'Content-Type': 'application/json; charset=UTF-8'
            });

        } else {
            options.headers = new Headers({
                'token': token + ''
            });
        }
    }

}
