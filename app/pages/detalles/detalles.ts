import {Page, NavController, NavParams} from 'ionic-framework/ionic';
import {Grafica} from '../../componente/chart.component.ts';
import {Cheese} from '../../componente/cheese.component.ts';
import {Alcohol} from '../../servicio/copas';


@Page({
	 templateUrl: 'build/pages/detalles/detalles.html',
	 directives: [Grafica,Cheese]
})
export class Detalles {

  constructor(private nav: NavController, navParams: NavParams, private _copasService: Alcohol) {

  }




}
