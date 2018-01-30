import { Injectable } from '@angular/core';
import { Response } from "@angular/http";
import 'rxjs/add/operator/map';
import { HttpserviceProvider } from '../httpservice/httpservice';
/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {


  constructor(public httpService:HttpserviceProvider) {
  }

  get(url) {
    return this.httpService.get(url).map((res:Response) => res.json());
  }

  post(url,param) {
    return this.httpService.post(url,param).map((res:Response) => res.json());
  }

}
