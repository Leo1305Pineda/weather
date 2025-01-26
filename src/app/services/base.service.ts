import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }

  protected getParams(arrayParams: any[] = []): HttpParams {
    let params = new HttpParams();
    params = params.append('appid', environment.appid);
    arrayParams.forEach((x) => {
      const split: any [] = x.split('=')
      if (split.length == 2) {
        params = params.append(split[0].trim(), split[1].trim());
      } else {
        console.warn('params invalid', x)
      }
    });
    return params;
  }
}
