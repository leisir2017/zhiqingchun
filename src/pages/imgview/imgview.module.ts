import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImgviewPage } from './imgview';

@NgModule({
  declarations: [
    ImgviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ImgviewPage),
  ],
  exports: [
    ImgviewPage
  ]
})
export class ImgviewPageModule {}
