import {Component, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from 'angular2/common';
import {Alcohol} from '../servicio/copas';
import {CHART_DIRECTIVES} from 'ng2-charts';

// webpack html imports

@Component({
  selector: 'graficoQueso',
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
export class Cheese {

  private barraHoras : Array <string>;
  private barChartSeries = ['Copas', 'Birras','Chupitos'];
  public barChartType = 'Pie';
  private barChartLegend:boolean = false;
  private colores =  [
      {
       fillColor: 'rgba(151,187,205,0.2)',
       strokeColor: 'rgba(151,187,205,1)',
        pointColor: 'rgba(151,187,205,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(151,187,205,0.8)',
          color: '#795548',
        highlight: 'rgba(151,187,205,0.8)'
      }, {
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,0.8)',
        color: '#FF9800',
        highlight: 'rgba(220,220,220,0.8)'
      },
      {
        fillColor: 'rgba(247,70,74,0.2)',
        strokeColor: 'rgba(247,70,74,1)',
        pointColor: 'rgba(247,70,74,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(247,70,74,0.8)',
        color: '#32DB3F',
        highlight: 'rgba(247,70,74,0.8)'
      }
    ];

  private datos: Array<any>;

  constructor(private _copasService: Alcohol) {
    console.log('pie demo');
    this.datos = new Array;
    this.datos.push(_copasService.getCopasTotales());
    this.datos.push(_copasService.getBirrasTotales());
    this.datos.push(_copasService.getChupitosTotales());

  }

  // events
  chartClicked(e: any) {
    console.log(e);
  }

  chartHovered(e: any) {
    console.log(e);
  }

  // Pie
  //private pieChartLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  //private pieChartData = [300, 500, 100];
  //private pieChartType = 'Pie';

}