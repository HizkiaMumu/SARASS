import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HostProvider {

  baseUrl: any = 'http://sarass.101creative.id/api';

  constructor(public http: HttpClient) {
    console.log('Hello HostProvider Provider');
  }

}
