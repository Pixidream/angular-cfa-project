import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthService } from './auth.service'

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PATCH",
      "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    }
  ),
  status: 200,
  resonseType: "json"
}


@Injectable({
  providedIn: 'root'
})
export class FetchfirebaseapiService {
  private _baseUrl: string = 'https://unstar-58967-default-rtdb.europe-west1.firebasedatabase.app/nasaapi/userfav'
  userId: string

  constructor(
    private _http: HttpClient,
    public auth: AuthService
  ) {
      this.auth.user$.subscribe(user => this.userId = user.uid)
  }

  postFavPict(data: any) {
    return this._http.post(`${this._baseUrl}/${this.userId}.json`, data, httpOptions)
  }

  getFavPict() {
    return this._http.get(`${this._baseUrl}/${this.userId}.json`, httpOptions)
  }
}
