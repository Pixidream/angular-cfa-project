import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { FetchfirebaseapiService } from '../services/fetchfirebaseapi.service'

@Component({
  selector: 'app-favorite-collection',
  templateUrl: './favorite-collection.component.html',
  styleUrls: ['./favorite-collection.component.css']
})
export class FavoriteCollectionComponent implements OnInit {
  pictList: Array<object> = []
  from = 'mars'
  userid: string

  constructor(
    private _fireHttp: FetchfirebaseapiService,
    public auth: AuthService
  ) {
    this.auth.user$.subscribe(user => {
      this.userid = user.uid
      if (this.userid == undefined) this.loadFromLocal()
      else this.loadFromFire()
    })
  }

  ngOnInit(): void {
  }

  loadFromFire() {
    let images: any = null
    this._fireHttp.getFavPict()
      .subscribe(data => {
        images = data
        if (this.from === 'astronomie') {
          this.from = 'mars'
          this.pictList = []
          for (let image in images) {
            if (images[image].from === 'astronomie') {
              this.pictList.push(images[image])
            }
          }
        }
        else if (this.from === 'mars') {
          this.from = 'astronomie'
          this.pictList = []
          for (let image in images) {
            if (images[image].from === 'mars') {
              this.pictList.push(images[image])
            }
          }
        } else {
          this.pictList = []
        }
      })
  }

  loadFromLocal() {
    let storage = JSON.parse(window.localStorage.getItem('fav_pict'));
    if (storage != null) {
      if (this.from === 'astronomie') {
        this.from = 'mars'
        this.pictList = []
        this.pictList = storage.picture.astronomie
      } else if (this.from === 'mars') {
        this.from = 'astronomie'
        this.pictList = []
        this.pictList = storage.picture.mars
      }
    } else {
      this.pictList = []
    }
  }

  loadPict() {
    if (this.userid == undefined) this.loadFromLocal()
    else this.loadFromFire()
  }
}
