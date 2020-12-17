import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListImagesComponent } from './list-images/list-images.component';
import { ListImagesApodComponent } from './list-images-apod/list-images-apod.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: 'list-images', component: ListImagesComponent},
  {path: 'list-images-apod', component: ListImagesApodComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
