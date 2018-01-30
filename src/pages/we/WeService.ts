import { Injectable } from "@angular/core";
import { Response, Http } from "@angular/http";
import 'rxjs/add/operator/map';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';

@Injectable()
export class WeService {
    constructor(public http:Http, public httpService:HttpserviceProvider) {
    }


    //版本检测
    getVersion() {
        return this.httpService.get('version/index').map((res:Response) => res.json());
    }

    testApi() {
        return this.httpService.get('demand/demandcount').map((res:Response) => res.json());
    }

}
