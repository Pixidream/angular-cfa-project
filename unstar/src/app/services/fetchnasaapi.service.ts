import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class FetchnasaapiService {
  private _apiKey : string = 'tzKyM2A1CLcJ6GnERt8x1ADIafIG9BO2eKoti7sw';
  private _apiBaseUrl: string = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=';

  constructor(
    private _http: HttpClient
  ) { }

  getMarsImagesFromAPI(date: string): Observable<object> {
    return this._http.get(`${this._apiBaseUrl}${this._apiKey}&earth_date=${date}`, httpOptions);
  }
}
