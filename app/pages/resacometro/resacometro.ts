import {Page,NavController,Alert} from 'ionic-framework/ionic';
import {Alcohol} from '../../servicio/copas';

@Page({
	templateUrl: 'build/pages/resacometro/resacometro.html',
})
export class Resacometro {

	private deshabilitar: boolean;

	constructor(private nav: NavController, private _copasService: Alcohol) {
		this.deshabilitar = true;
		window.analytics.trackView('Resacometro');
	}

	aumentaBebida(tipo: string) {
  	   	this.deshabilitar = false;
			  	setTimeout( () => {
		this.deshabilitar = true; 
		  }, 1000);
		if (tipo=="Birra"){
			this._copasService.sumaBirra();
		} else if (tipo == "Copa") {
			this._copasService.sumaCopa();
		} else if (tipo == "Chupito"){
			this._copasService.sumaChupito();
		}
	 	 
		this.mostrarImagen();
	}

	private mostrarImagen(){
		let valorVerbo =this._copasService.sumaTotal();
		if (valorVerbo != null) {
			this.doAlert("<img src='" + valorVerbo.foto+"'>", valorVerbo.reco);
		}
	}

	doAlert(titulo, texto) {
	    let alert = Alert.create({
			title: titulo,
			subTitle: texto,
	      buttons: ['Ok']
	    });
	    this.nav.present(alert);
	  }

	darConsejo(){
		let consejo : string =this._copasService.darConsejos();
		this.doAlert("Consejo", consejo);
	}
}
