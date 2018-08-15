import { Component, Input } from '@angular/core';
import { Events } from 'ionic-angular';

@Component({
  selector: 'popup',
  templateUrl: 'popup.html'
})
export class PopupComponent {
  @Input('estabelecimento') estabelecimento: any;
  constructor(private events:Events) {

  }

  ngOnInit() {
    
  }

	getPopUp() {
		return document.getElementById('popup');
	}

  showPontoDetail(ponto) {
    // this.events.publish('showDetail', ponto);
  }

}
