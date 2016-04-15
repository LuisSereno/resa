import {Page, NavController, NavParams,Alert} from 'ionic-framework/ionic';
import {Publicidad} from '../../servicio/publicidad';

@Page({
	templateUrl: 'build/pages/juego/juego.html'
})
export class Juego {

	numeroRows: Array<number>;
	
	numeroCol: Array<number>;

	puntuacion: number = 0;

	randomCol: number = 0;

	randomFil: number = 0;

	timeOut: any;

	cuentaAtras: any;

	temporizador: number=30;

	dificultad:number = 1;

	puntosTotales: number = 0;

	constructor(private nav: NavController, navParams: NavParams, private _publi:Publicidad) {
		this.numeroCol = [1, 2,3,4,5];
		this.numeroRows = [1, 2, 3, 4, 5];
		this.reiniciar();0
		this._publi.prepareInterstitial();
		window.analytics.trackView('Juego');
	}

	ngAfterViewInit() {
		console.log("EL REFLEJOMETRO ESTA CARGADO");
		this.centrarTabla();
	}

	reiniciar(){
		this.temporizador = 30;
		this.puntuacion = 0;
		this.puntosTotales = 0;
		clearTimeout(this.timeOut);
		clearInterval(this.cuentaAtras);
		this.timeOut=setTimeout(() => {this.ejecutarJuego();}, 1000);
		this.cuentaAtras = setInterval(() => this.calculoTem(), 1000);
	}

	aumentarDificultad() {
		if (this.dificultad >= 5) {
			this.dificultad = 1;
		}else{
			this.dificultad += 1;
		}
	}

	centrarTabla() {
		let celdas = document.getElementsByName("0");
		for(let el of celdas){
			el.setAttribute("class", el.className + " celdaI");
		}
		celdas = document.getElementsByName("4");
		for(let el of celdas){
			el.setAttribute("class", el.className + " celdaD");
		}
	}

	calculoTem() {
		if (this.temporizador > 0) {
			this.temporizador = this.temporizador - 1;
		} else{
			clearInterval(this.cuentaAtras);
		}
	}

	private ejecutarJuego() {
		if (this.temporizador>0){
			this.limpiarTablero();
			this.randomCol = Math.floor(Math.random() * this.numeroCol.length) + 1;
			this.randomFil = Math.floor(Math.random() * this.numeroRows.length) + 1;
			this.seleccionarCelda(this.randomFil,this.randomCol,false);
			this.puntosTotales += 7;
			this.timeOut=setTimeout(( ) => {
				this.ejecutarJuego ( );
			},  2000/this.dificultad);	
		}else{
			let textoColor = '<b style="background-color:'+this.toColor(this.puntuacion)+'">' + this.puntuacion + '</font>';
			this.doAlert("Fin", "Puntuación " + textoColor + "/" + this.puntosTotales);
			clearTimeout(this.timeOut);
		}
	}

	private limpiarTablero(){
		let elementosImagen=document.querySelectorAll("div img");
		for(let el of elementosImagen){
			el.style.display = "none";
		}
	} 

	private seleccionarCelda(fila:number,colum:number,correcto:boolean){
		let el = document.getElementById("celda" + fila + colum);
		if (correcto){
			el.children[0].style.display = "block";
		} else {
			el.children[1].style.display = "block";
		}
	}

	celdaClickada(fila: number, columna: number) {
		if (this.temporizador > 0) {
			this.limpiarTablero();
			clearTimeout(this.timeOut);
			if (this.randomFil == fila && this.randomCol == columna) {
				this.puntuacion = this.puntuacion + 7;
				this.seleccionarCelda(fila, columna, true);
				this.timeOut = setTimeout(() => {
					this.ejecutarJuego();
				}, 1300/this.dificultad);
			} else {
				this.puntuacion = this.puntuacion - 3;
				this.ejecutarJuego();
			}
			this.cambiarColorPuntuacion();
		}
	}

	private cambiarColorPuntuacion(){
		let el = document.getElementById("puntuacionId");
		let color = this.toColor(this.puntuacion);
		el.setAttribute("style", "background-color:" + color);
	}

	private toColor(num:number) {
	    if (num < 20){
			return "rgba(248, 55, 55,0.6)";
		}
		else if (num < 40) {
			return "rgba(248, 149, 55 ,0.6 )";
		}
		else if (num < 60) {
			return "rgba(248, 225, 55 , 0.6)";
		}
		else if (num < 90) {
			return "rgba(201, 248, 55  , 0.6)";
		}
		else if (num < 110) {
			return "rgba(149, 248, 55  , 0.6)";
		}
		else if (num < 180) {
			return "rgba(93, 248, 55  , 0.6)";
		}
		else if (num < 250) {
			return "rgba(55, 248, 64  , 0.6)";
		}
		else if (num < 350) {
			return "rgba(55, 248, 67 , 0.6)";
		}else{
			return "rgba(55, 248, 67 , 1)";
		}

	}

	doAlert(titulo, texto) {
	    let alert = Alert.create({
			title: titulo,
			subTitle: texto,
	      buttons: ['Ok']
	    });
		alert.onDismiss(() => {
			console.log("AQUI SE MOSTRARIA EL INTERSTICIAL");
			this._publi.showInterstitial();
		});
		this.nav.present(alert);
	}

}
