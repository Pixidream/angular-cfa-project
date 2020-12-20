import { Component, OnInit } from '@angular/core';
import { FetchnasaapiService } from '../services/fetchnasaapi.service'
import { FetchfirebaseapiService } from '../services/fetchfirebaseapi.service'
import { AuthService } from '../services/auth.service'
import { NzMessageService } from 'ng-zorro-antd/message'

interface AstroData {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

@Component({
  selector: 'app-astronomi-pict',
  templateUrl: './astronomi-pict.component.html',
  styleUrls: ['./astronomi-pict.component.css']
})
export class AstronomiPictComponent implements OnInit {
  isLoadingAstronomiePict = false;
  astronomiePict: AstroData = {
    date : "",
    explanation : "",
    hdurl : "",
    media_type : "",
    service_version : "",
    title : "",
    url : ""
  };
  dateFormat ='yyyy-MM-dd';
  date: Date | null;
  userId: string

  constructor(
    private _astronomieApi: FetchnasaapiService,
    private _fireHttp: FetchfirebaseapiService,
    private message: NzMessageService,
    public auth: AuthService
  ) {
    this.auth.user$.subscribe(user => this.userId = user.uid)
  }

  ngOnInit(): void {
  }

  onDateChange() {
    if (this.date != null) {
      this.isLoadingAstronomiePict = true;
      this._astronomieApi.getApodImagesFromAPI(this.date.toISOString().slice(0, 10))
        .subscribe(
          (data: any) => {
          this.astronomiePict = data;
          this.isLoadingAstronomiePict = false;
          },
          (error: any) => {
            console.error(error)
            this.isLoadingAstronomiePict = false
          }
        )
    } else {
      this.astronomiePict = {
        date : "",
        explanation : "",
        hdurl : "",
        media_type : "",
        service_version : "",
        title : "",
        url : ""
      };
    }
  }

  saveToFav() {
    const image_data = { ...this.astronomiePict, from: "astronomie" }
    if (this.userId == null) {
    let storage = JSON.parse(window.localStorage.getItem('fav_pict'));
    if (storage == null) storage = {
      picture: {
        mars: [],
        astronomie: []
      }
    };
    if (image_data.from === 'mars') {
      storage.picture.mars.push(image_data)
    } else if (image_data.from === 'astronomie') {
      storage.picture.astronomie.push(image_data)
    }
    window.localStorage.setItem('fav_pict', JSON.stringify(storage))
    }
    else if (this.userId != null) {
      this._fireHttp.postFavPict(image_data)
        .subscribe(data => {
          console.log(data)
        })
    }
    this.message.success('Ajouté aux favoris', {
      nzDuration: 5000
    })
  }
}
