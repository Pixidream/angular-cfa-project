import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchnasaapiService } from '../services/fetchnasaapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-images-apod',
  templateUrl: './list-images-apod.component.html',
  styleUrls: ['./list-images-apod.component.css']
})
export class ListImagesApodComponent implements OnInit {

  resForm !: FormGroup;
  img !: any ;
  rep !: any;
  imghd !: any;
  title !: any;
  flag : boolean = false;
  dateimg !: any;
  explanation !: any;

  constructor(
    private formbuilder : FormBuilder,
    private router: Router,
    private picturesNasa : FetchnasaapiService
  ) { }

  ngOnInit(): void {
    this.initSigninForm();
}

  initSigninForm(){
    this.resForm = this.formbuilder.group({
      year:['',Validators.required],
      month:['',Validators.required],
      day:['',Validators.required]
    });
    }

  onSubmitDate(){
    const year = this.resForm.get('year')?.value;
    const month = this.resForm.get('month')?.value;
    const day = this.resForm.get('day')?.value;
    var hd = false;
    var date = `${year}-${month}-${day}`;
    this.picturesNasa.getApodImagesFromAPI(date, hd)
    .subscribe(
      (response: object) => {
        this.img = response;
        this.imghd = this.img['hdurl'];
        this.title = this.img['title'];
        this.explanation = this.img['explanation'];
        this.dateimg = this.img['date'];
        console.log(this.img);
        this.flag = true;
      },
      (error: Error) => {
        console.log('Erreur ! : ' + error);
      }
  );
  }
}
