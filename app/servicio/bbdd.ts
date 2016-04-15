import {Injectable} from 'angular2/core';
import {Storage, SqlStorage} from 'ionic-angular';

@Injectable()
export class BBDD {

	private storage: Storage;

	constructor() {

		console.log("Entramos en el constructor de la base de datos")
	    this.storage = new Storage(SqlStorage, { name: 'Resacometro', existingDatabase:false});
		this.storage.query(
	    'CREATE TABLE IF NOT EXISTS copas (id INTEGER PRIMARY KEY AUTOINCREMENT, tipo INTEGER, hora DATETIME,fechaEntrada DATE)'
	      ).then((data) => {
	        console.log("TABLA CREADA -> " + JSON.stringify(data.res));
	      }, (error) => {
	        console.log("ERROR -> " + JSON.stringify(error.err));
	    });
	}

	obtenerDatos(clave:string){
		return this.storage.get(clave);
	}

	insertarDatos(clave:string,valor:any){
		this.storage.set(clave, valor);
	}

	ejecutarQuery(query:string, params:any){
		console.log("ejecutaquery: "  + query + "<-->" + params)
		return this.storage.query(query, params);
	}


}