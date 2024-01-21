import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  
  api_url = environment.api_url;
  responceData: any[] = []

  get(endpoint: string, params?: any,): Observable<any> {
    return this.http.get(this.api_url + endpoint, { params: params }).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  post(endpoint: string, body: Object): Observable<any> {
    return this.http.post(this.api_url + endpoint, body).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

    put(endpoint: string, body: Object = null, params?: any): Observable<any> {
    return this.http
      .put(this.api_url + endpoint, body, { params: params })
      .pipe(
        catchError((error) => {

          return throwError(() => error);
        })
      );
  }
// &key=${this.apiKey}
  getAddress(latitude: number, longitude: number): Observable<any> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}`;
    return this.http.get(url);
  }


}
