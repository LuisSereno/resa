import {App, IonicApp, Platform} from 'ionic-framework/ionic'
import {Resacometro} from './pages/resacometro/resacometro';
import {Detalles} from './pages/detalles/detalles';
import {Alcohol} from './servicio/copas';
import {Juego} from './pages/juego/juego';
import {CargaInicial} from './pages/inicial/inicial';
import {BBDD} from './servicio/bbdd';
import {Publicidad} from './servicio/publicidad';


// https://angular.io/docs/ts/latest/api/core/Type-interface.html
import {Type, OnInit} from 'angular2/core';


@App({
  templateUrl: 'build/app.html',
  providers: [Alcohol, BBDD,Publicidad],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})

class MyApp implements OnInit{
  // make HelloIonicPage the root (or first) page
  rootPage: Type = CargaInicial;
  pages: Array<{title: string, component: Type}>;
  resacometro: Alcohol= null;

  constructor(private app: IonicApp, private platform: Platform, private _copasService: Alcohol, private _bbdd: BBDD, private _publi:Publicidad) {

    console.log("El constructor de app.ts");
    
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Resacometro', component: Resacometro },
      { title: 'Detalles de la noche', component: Detalles },
      { title: 'Reflejometro', component: Juego }
    ];
    this._publi.createBanner();
  }

  initializeApp() {

    this.platform.ready().then(() => {
        // Do any necessary cordova or native calls here now that the platform is ready
          // select the right Ad Id according to platform
         
        this._publi.showBanner("bottom");
        window.analytics.startTrackerWithId("UA-75877281-2");
    });

  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.app.getComponent('leftMenu').close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }

 ngOnInit() {
   console.log("Se inicializala apliciacion con el ngOnInit");

 }

}
