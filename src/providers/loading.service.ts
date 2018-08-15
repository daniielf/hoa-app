import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingService {

  private loader : any;
  constructor(private loadCtrl : LoadingController) {
    this.loader = this.loadCtrl.create({
      content: 'Aplicando Filtro',
    });
  }

  public startLoading(message){
    this.loader = this.loadCtrl.create({
      content: message,
    });
    this.loader.present();
  }

  public stopLoading(){
    if (this.loader){
      this.loader.dismiss();
    }
  }

}
