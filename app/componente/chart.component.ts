import {Component, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from 'angular2/common';
import {Alcohol} from '../servicio/copas';
import {CHART_DIRECTIVES} from 'ng2-charts';

//let template = require('./pie-chart-demo.html');

@Component({
  selector: 'graficoBarras',
  template:'<base-chart class="chart"'+
           '[data]="datos"'+
           '[labels]="barraHoras"'+
           '[options]="barChartOptions"'+
           '[series]="barChartSeries"'+
           '[legend]="barChartLegend"'+
           '[colours]="colores"' +
           '[chartType]="barChartType"></base-chart>',
      directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class Grafica {

  private barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel %>: <%}%><%= value %>'
  };
  private barraHoras : Array <string>;
  private barChartSeries = ['Copas', 'Birras','Chupitos'];
  public barChartType = 'Bar';
  private barChartLegend:boolean = false;



  private colores =  [
      {
      fillColor: '#795548',
    strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,0.8)',
          color: '#795548',
        highlight: 'rgba(151,187,205,0.8)'
      }, {
        fillColor: '#FF9800' ,
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,0.8)',
        color: '# 9800',
        highlight: 'rgba(220,220,220,0.8)'
      },
      {
        fillColor: '#32DB3F',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(247,70,74,1)',
        pointStrokeColor: '#fff',
         pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(247,70,74 ,0.8)',
        color: '#32DB3F',
        highlight: 'rgba(247,70,74,0.8)'
      }
    ];


  private datos: Array<any>;

  constructor(private _copasService: Alcohol) {
    console.log('bar demo');
    this.barraHoras = new Array;
    this.datos = new Array;
    this.calcularGrafica(_copasService)
  }

  private calcularGrafica(servicioCopas:  Alcohol){
    var arrayCopas = new Array<number>();
    var arrayBirras = new Array<number>();
    var arrayChupitos = new Array<number>();
    var datosAlcohol: any = servicioCopas.getDetalleBebido();
    var calculaHora = null;
    var sumaCopa:  number = 0;
    var sumaBirra: number = 0;
    var sumaChupito: number = 0;
    for (let dat of datosAlcohol){
      console.log(dat);
       //esto solo lo hace la primera vez
      if (calculaHora==null){
        calculaHora = dat.hora;
        this.barraHoras.push(dat.hora.getHours() + " H");
      } else {
        //las siguientes veces entra aqui
        let diferenciaTiempo = dat.hora.getHours() - calculaHora.getHours();
        console.log("La diferencia de tiempo es: " + diferenciaTiempo) ;
        if (diferenciaTiempo !=  0){
           arrayCopas.push(sumaCopa);
           arrayBirras.push(sumaBirra);
           arrayChupitos.push(sumaChupito);
           calculaHora = dat.hora;
           this.barraHoras.push(dat.hora.getHours() +  " H");
           sumaCopa = 0;
           sumaBirra = 0;
           sumaChupito = 0;
        }
      }

      if (dat.tipo == Alcohol.BIRRA) {
        sumaBirra += 1;
      } else if (dat.tipo == Alcohol.COPA){
        sumaCopa += 1;
      }  else if (dat.tipo == Alcohol.CHUPITO){
      sumaChupito += 1;
      }

    }
    if (this.datos.length==0){
      arrayCopas.push(sumaCopa);
      arrayBirras.push(sumaBirra);
      arrayChupitos.push(sumaChupito);
    }
    //this.barraHoras;
    this.datos.push(arrayCopas);
    this.datos.push(arrayBirras);
    this.datos.push(arrayChupitos);
  }

  // events
  chartClicked(e:any) {
    console.log(e);
  }
  chartHovered(e:any) {
    console.log(e);
  }

}