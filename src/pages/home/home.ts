import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  private searchText = '';
  private eventos = ['Evento 1', 'Evento 2', 'Evento 3', 'Evento 4', 'Evento 5', 'Evento 6', 'Evento 7', 'Evento 8',  'Evento 9'];
  private eventosFiltered = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
    this.eventosFiltered = this.eventos;
  }

  onInput(){
    this.eventosFiltered = this.eventos.filter((elem) => { return elem.indexOf(this.searchText) !== -1; });
  }
}
