import {Injectable} from 'angular2/core';

@Injectable()
export class Publicidad {

	admobId:any;

    constructor() {
        if(/(android)/i.test(navigator.userAgent)) {
            this.admobId = {
                banner: 'ca-app-pub-6824213903400260/6049526630',
                interstitial: 'ca-app-pub-6824213903400260/1839653039'
            };
        } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            this.admobId = {
                banner: 'ca-app-pub-6824213903400260/6049526630',
                interstitial: 'ca-app-pub-6824213903400260/1839653039'
            };
        }
    }
 
    createBanner() {  
	    if(AdMob) {
	        AdMob.createBanner({
				adId: this.admobId.banner,
	            autoShow: false
	        });
	    }

    }

    prepareInterstitial() {
		if (AdMob) { 
			AdMob.prepareInterstitial({
			 	adId: this.admobId.interstitial, 
			 	autoShow: false 
			 }); 
		}
    }

    showInterstitial() {
		if (AdMob) {
			AdMob.prepareInterstitial({
				adId: this.admobId.interstitial,
	            autoShow: true
	        });
	    }
    }
 
    showBanner(position) {
        if(AdMob) {
            var positionMap = {
                "bottom": AdMob.AD_POSITION.BOTTOM_CENTER,
                "top": AdMob.AD_POSITION.TOP_CENTER
            };
            AdMob.showBanner(positionMap[position.toLowerCase()]);
        }
    }
 
    hideBanner(position) {
	    if(AdMob) {
	        AdMob.hideBanner();
	    }
    }
}