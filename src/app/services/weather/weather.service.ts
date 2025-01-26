import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super()
  }

  get(endpoint: string, arrayParams: any[]): Observable<any> {
    let params = this.getParams(arrayParams);
    return this.http.get(`${environment.apiUrl}/${endpoint}`, {params})
  }
}
