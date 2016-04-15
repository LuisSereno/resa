import {Injectable} from 'angular2/core';
import {BBDD} from './bbdd'

@Injectable()
export class Alcohol {

	private fechaResaca: string;

	private contadorBirras: number;
	
	private contadorCopas:number;
	
	private contadorChupitos: number;

	private copasTotal:number;
	
	private acciones: Array<{ foto: string, reco: string}>;

	private consejos: Array<string>;

	private nivelBorrachera: number;

	private birrasTotales: number;
	
	private copasTotales: number;

	private chupitosTotales: number;
	
	private detalleBebido: Array<{ tipo: number, hora:Date}> ;

	public static BIRRA = 1;
	
	public static COPA = 2;

	public static CHUPITO = 3;

	constructor(private _bbdd:BBDD) {
		this.contadorBirras = 0;
		this.contadorCopas = 0;
		this.contadorChupitos = 0;
		this.nivelBorrachera = 0;
		this.acciones = [
			{ foto: "./img/primera.png", reco:"Ya vas piripi ¡Piripi!" },
			{ foto: "./img/segunda.png", reco: "Exaltación de la amistad aumentando..." },
			{ foto: "./img/cuarta.png", reco: "Se te ha ido de las manos" },
			{ foto: "./img/quinta.png", reco:  "Parecía que no, pero va a ser una noche mítica" },
			{ foto: "./img/sexta.png", reco: "Si sigues así, la B12 no tardará en llegar" }
		];
		this.consejos = ["Si no bebes más, mañana estarás como una rosa.", "Cuando llegues a casa bébete un vaso de agua antes de dormir",
			"Al llegar a casa bebe 1 litro de agua antes de dormir.", "Mañana por la mañana tómate una infusión cuando te levantes e hidrátate bien.",
			"Mañana día de hidratos (pastas o arroz).", "Mañana será día de sofa y con agua fría", 
			"Cuando te despiertes tómate una aspirina con un refresco azucarado.", "Cuando lleges a casa come alimentos grasientos y mañana un Resalim",
			"Cando te levantes un buen litro de gazpacho y tócate"];
		this.birrasTotales = 0;
		this.copasTotales = 0;
		this.chupitosTotales = 0;
		this.detalleBebido = new Array();
	}

	public getBirrasTotales(){
		return this.birrasTotales;
	}

	public setBirrasTotales(birritas:number){
		this.birrasTotales=birritas;
	}

	public getCopasTotales(){
		return this.copasTotales;
	}

	public setCopasTotales(copitas:number){
		this.copasTotales=copitas;
	}

	public getChupitosTotales(){
		return this.chupitosTotales;
	}

	public setChupitosTotales(chupi:number){
		this.chupitosTotales=chupi;
	}

	public getContadorBirras(){
		return this.copasTotales;
	}

	public setContadorBirras(birritas:number){
		this.contadorBirras=birritas;
	}

	public getContadorCopas(){
		return this.contadorCopas;
	}

	public setContadorCopas(copitas:number){
		this.contadorCopas=copitas;
	}

	public getContadorChupitos(){
		return this.contadorChupitos;
	}

	public setContadorChupitos(chupi:number){
		this.contadorChupitos=chupi;
	}

	public getTodoBebido(){
		return this.detalleBebido.length ;
	}

	public getDetalleBebido(){
		return this.detalleBebido;
	}

	public setDetalleBebido(datoEntrada: Array<{ tipo: number, hora:Date}>){
		this.detalleBebido = datoEntrada;
	}

	public setNivelBorrachera(borracho:number){
		this.nivelBorrachera = borracho;
	}

	public getFechaResaca(){
		return 	this.fechaResaca;
	}

	public setFechaResaca(fecha:any){
		try{
			let fechaAux = fecha.toISOString();
			let fechaAuxArray = fechaAux.substring(0, fechaAux.indexOf("T")).split("-");
			this.fechaResaca = fechaAuxArray[2] + "/" + fechaAuxArray[1] + "/" + fechaAuxArray[0];
		} catch(e){
			this.fechaResaca = fecha;
		}
	}

	public sumaBirra() {
		let hora = new Date();
		this._bbdd.ejecutarQuery("INSERT INTO copas(tipo,hora,fechaEntrada) values (?,?,?)", [Alcohol.BIRRA, hora, this.getFechaResaca()]).then((data) => {
			console .log("INSERTA");
			window.analytics.trackEvent("ServicioCopas", "Suma", "Birra", 1);
		}, (error) => {
			console.log("ERROR INSERTA -> " + error.err.message);
		   });
		this.contadorBirras = this.contadorBirras + 1;
		this.birrasTotales += 1;
		this.detalleBebido.push({ tipo: Alcohol.BIRRA, hora: hora});
		console.log("El contador de birras es: " + this.birrasTotales);
	}

	public sumaCopa(){
		let hora = new Date();
		this._bbdd.ejecutarQuery("INSERT INTO copas(tipo,hora,fechaEntrada) values (?,?,?)", [Alcohol.COPA, hora, this.getFechaResaca()]).then((data) => {
			console .log("INSERTA");
			window.analytics.trackEvent("ServicioCopas", "Suma", "Copa", 1);
		}, (error) => {
			console.log("ERROR INSERTA -> " + error.err.message);
		  });
	  	this.contadorCopas = this.contadorCopas + 1;
		this.copasTotales += 1;
		this.detalleBebido.push({ tipo: Alcohol.COPA, hora: hora});
		console.log("El contador de copas es: " + this.copasTotales);
	}


	public sumaChupito(){
		let hora = new Date();
		this._bbdd.ejecutarQuery("INSERT INTO copas(tipo,hora,fechaEntrada) values (?,?,?)", [Alcohol.CHUPITO, hora, this.getFechaResaca()]).then((data) => {
			console .log("INSERTA");
			window.analytics.trackEvent("ServicioCopas", "Suma", "Chupito", 1);
		}, (error) => {
			console.log("ERROR INSERTA -> " + error.err.message);
		});
		this.contadorChupitos = this.contadorChupitos + 1;
		this.chupitosTotales += 1;
		this.detalleBebido.push({ tipo :  Alcohol.CHUPITO, hora: hora});
		console.log("El contador de chupitos es: " + this.chupitosTotales);
	}

	public sumaTotal() {
		console.log("mira este vector raruno");
		console.log(this.detalleBebido);
		var verbo= null;
		var copasTotal = (this.contadorBirras) / 2 + (this.contadorChupitos) / 1.3+ this.contadorCopas;
		if (copasTotal >= 3) {
		   console.log(this.nivelBorrachera);
		   console.log(this.acciones.length);
	   	   if (this.nivelBorrachera>=this.acciones.length){
				verbo=this.acciones[this.acciones.length-1];
	   	   }else{
				verbo=this.acciones[this.nivelBorrachera];
		   }
		   this.contadorCopas = 0;
		   this.contadorBirras = 0;
		   this.contadorChupitos = 0;
		   this.nivelBorrachera += 1;
	   } else{
		   console.log("no resaca");
	   }
	   console.log("Es aqui null el verbo? " + verbo);

	   return verbo;
   }

   public darConsejos(){
	    if (this.nivelBorrachera >= this.consejos.length) {
			return this.consejos[this.consejos.length-1];
		} else {
			return this.consejos[this.nivelBorrachera];
		}
	}

}