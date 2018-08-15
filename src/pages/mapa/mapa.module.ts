import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaPage } from './mapa';
import { PopupComponent  } from '../../components/popup-component/popup';

@NgModule({
  declarations: [
    MapaPage,
    PopupComponent
  ],
  imports: [
    IonicPageModule.forChild(MapaPage),
  ],
  entryComponents:[
    PopupComponent
  ]
})
export class MapaPageModule {}
