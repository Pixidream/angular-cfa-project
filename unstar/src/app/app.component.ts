import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'unstar';
  localData = JSON.parse(localStorage.getItem('fav_pict'))

  constructor(
    private _auth: AuthService,
    private _modalService: NzModalService
  ) { }

  ngOnInit(): void {
    if (this._auth.autoLogin() == null && this.localData == null ) {
      this._modalService.info({
        nzTitle: 'Syncroniser vos image',
        nzContent: 'Par défault vos image son sauvegardé dans votre navigateur, si jamais vous voulez les syncroniser à travers vos différents appareils, n\'hésitez pas à vous connecter via votre compte Google, grâce au bouton login mis à disposition ! ATTENTION: Cela supprime vos favoris locaux'
      })
    }
  }
}
