import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { FetchfirebaseapiService } from '../services/fetchfirebaseapi.service'
import { NzMessageService } from 'ng-zorro-antd/message'

interface ImageData {
  from: string;
  img: string;
}

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {
  @Input() imageList: [];
  @Input() isLoading: boolean;
  @Input() from: string;
  image_src: string;
  modalVisible: boolean = false;
  userId: string

    constructor(
      public auth: AuthService,
      private _messageService: NzMessageService,
      private _fireHttp: FetchfirebaseapiService
    ) {
      this.auth.user$.subscribe(user => this.userId = user.uid)
  }

  ngOnInit(): void {
  }

  openPictureModal(image_link: string) {
    this.image_src = image_link;
    this.modalVisible = true;
  }

  closePictureModal() {
    this.image_src = "";
    this.modalVisible = false;
  }

  saveToFav(image_data: ImageData) {
    image_data = { ...image_data, from: this.from }
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
        })
    }
    this._messageService.success('Ajouté aux favoris !', {
      nzDuration: 5000
    })
  }
}
