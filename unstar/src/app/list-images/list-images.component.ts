import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchnasaapiService } from '../services/fetchnasaapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-images',
  templateUrl: './list-images.component.html',
  styleUrls: ['./list-images.component.css']
})
export class ListImagesComponent implements OnInit {

  constructor(
    private formbuilder : FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {}

  resForm !: FormGroup;


  initSigninForm(){
    this.resForm = this.formbuilder.group({
      year:['',Validators.required],
      month:['',Validators.required],
      day:['',Validators.required]

    });
  }

  onSubmitForm(){
    const year = this.resForm.get('year')?.value;
    const month = this.resForm.get('month')?.value;
    const day = this.resForm.get('day')?.value;
    var date = `${year}-${month}-${day}`;
    return date;
  }
}
