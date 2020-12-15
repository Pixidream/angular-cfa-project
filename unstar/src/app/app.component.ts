import { Component, OnInit } from '@angular/core';
import { FetchnasaapiService } from './services/fetchnasaapi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'unstar';

  constructor(
    private picturesNasa : FetchnasaapiService
    ) { }

  ngOnInit(): void {
    this.picturesNasa.getMarsImagesFromAPI('2015-05-05')
      .subscribe(
        (response: object) => {
            console.log(response);
        },
        (error: Error) => {
          console.log('Erreur ! : ' + error);
        }
    );
  }
}
