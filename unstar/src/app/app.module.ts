import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListImagesComponent } from './list-images/list-images.component';

import { FetchnasaapiService } from './services/fetchnasaapi.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component'

import { GalleryModule } from 'ng-gallery';

import { MatToolbarModule } from '@angular/material/toolbar';
@NgModule({
  declarations: [
    AppComponent,
    ListImagesComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    GalleryModule
  ],
  providers: [
    FetchnasaapiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
