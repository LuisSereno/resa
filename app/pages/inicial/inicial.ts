import {Page,NavController,Alert} from 'ionic-framework/ionic';
import {Alcohol} from '../../servicio/copas';
import {Resacometro} from '../resacometro/resacometro';
import {Storage, SqlStorage} from 'ionic-angular';
import {BBDD} from '../../servicio/bbdd';

@Page({
  templateUrl: 'build/pages/inicial/inicial.html',
})
export class CargaInicial {

  fechas: Array<string>;

  constructor(private nav: NavController, private _copasService: Alcohol , private _bbdd: BBDD) {

    console.log("entra en el constructor de inicial.ts");
    this.fechas = new Array();
    _bbdd.ejecutarQuery(
    'SELECT DISTINCT(fechaEntrada) FROM copas ORDER BY id DESC', null)
    .then((data) => {
          console.log("QUERY EJECUTADA -> " + JSON.stringify(data.res));
          for (let dato of data.res["rows"]){
            this.fechas.push(dato.fechaEntrada);
          }
        }, (error) => {
        console.log("ERROR -> "  + JSON.stringify(error.err));
      });

     window.analytics.trackView('Inicial');
  }

  cargarDatosFecha(fecha: string) {
    console.log("Carga datos fechas" + fecha);
    this._bbdd.ejecutarQuery(
     'SELECT * FROM copas WHERE fechaEntrada=?', [fecha])
    .then((data) => {
          console.log("QUERY EJECUTADA -> " + JSON.stringify(data.res));
          let tipoCopa: number = 0;
          let tipoBirra: number = 0;
          let tipoChupi: number = 0;
          let vectorDatos: Array<{ tipo: number, hora: Date }>= new Array();
          for (let dato of data.res["rows"]){
              if (Alcohol.BIRRA == dato.tipo){
                tipoBirra += 1;
              } else if (Alcohol.COPA == dato.tipo){
                tipoCopa += 1;
              }else if(Alcohol.CHUPITO==dato.tipo){
                tipoChupi += 1;
              }
              vectorDatos.push({tipo: parseInt(dato.tipo), hora: new Date(dato.hora)});
          }
          this.crearServicioCopas(tipoCopa,tipoBirra,tipoChupi,vectorDatos,fecha);
        }, (error) => {
        console.log("ERROR -> "  + JSON.stringify(error.err));
      });
  }

  private crearServicioCopas(numCopas: number, numBirras: number,numChupito:number,vector:Array<{tipo:number, hora:Date}>,fecha: string) {
      this._copasService.setFechaResaca(fecha);
      let nivBorr: number = 0;
      let copasTotal = (numBirras/2) + numCopas;
      if(copasTotal%3>0){
        this._copasService.setContadorBirras(numBirras%3);
        this._copasService.setContadorCopas(numCopas%3);
        this._copasService.setContadorChupitos(numChupito%3);
      }
      this._copasService.setBirrasTotales(numBirras);
      this._copasService.setCopasTotales(numCopas);
      this._copasService.setChupitosTotales(numChupito);
      while (copasTotal >= 3) {
        nivBorr += 1;
        copasTotal = copasTotal-3;
      }
      this._copasService.setNivelBorrachera(nivBorr);
      this._copasService.setDetalleBebido(vector)
      this.nav.setRoot(Resacometro);
  }

  cargarDatosNuevos() {
    console.log("Carga datos nuevos");
    this._copasService.setFechaResaca(new Date());
    this.nav.setRoot(Resacometro);
  }

}