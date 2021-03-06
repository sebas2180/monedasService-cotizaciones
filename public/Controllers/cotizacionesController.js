const CotizacionService   = require ('../services/cotizacionesService');

const cotizacionesService = require('../services/cotizacionesService');

module.exports = {
    getCotizaciones : (req,res,next)=>{
        console.log(' .... get cotizaciones V1');
        cotizacionesService.getCotizaciones((callback)=>{
           console.log('COTIZACION enviado ....')
            return res.send(callback);
        });
    },
    getCotizacion  : (req,res,next)=>{
        console.log('get cotizacion .. ');
        const cotizacion = {
            proveedor : req.query.proveedor,
            symbol : req.query.symbol,
            base: req.query.base
        }
       
        CotizacionService.getCotizacion(cotizacion,(callback)=>{
            console.log('COTIZACION enviada .....')
            return res.send(callback);
        });
    },
    getCotizacionesBTCUSD:(req,res,next) => {
        cotizacionesService.getCotizacionesBTCUSD((callback)=> {
            return res.send(callback);
        })
    }
    ,getCotizacionesV2 : async    (req,res,next)=>{
        console.log('get cotizaciones ...')
        let ETHARS = [] ;  let ETHEUR = [] ;  let ETHUSD = [] ;
        let BTCARS = [] ;  let BTCEUR = [] ;  let BTCUSD = [] ;
        let LTCARS = [] ;  let LTCEUR = [] ;  let LTCUSD = [] ;
        res.setTimeout(35000, function(){
            console.log('Request has timed out.');
                res.sendStatus(408);
        });

             cotizacionesService.getCotizacionesV3().then(
                callback => {
                    console.log('largo cotizaciones : '+ callback['cotizaciones'].length);
                    for (let index = 0; index < callback['cotizaciones'].length; index++) {
                        const element = callback['cotizaciones'][index]['dataValues'];
                       if(element ['base'] === 'ARS' && element ['symbol'] === 'BTC') {
                           BTCARS.push(element);
                       }
                       if(element ['base'] === 'USD' && element ['symbol'] === 'BTC') {
                            BTCUSD.push(element);
                        }
                        if(element ['base'] === 'EUR' && element ['symbol'] === 'BTC') {
                            BTCEUR.push(element);
                        }
                        if(element ['base'] === 'ARS' && element ['symbol'] === 'ETH') {
                            ETHARS.push(element);
                        }
                        if(element ['base'] === 'USD' && element ['symbol'] === 'ETH') {
                            ETHUSD.push(element);
                         }
                         if(element ['base'] === 'EUR' && element ['symbol'] === 'ETH') {
                             ETHEUR.push(element);
                         }
                         if(element ['base'] === 'ARS' && element ['symbol'] === 'LTC') {
                            LTCARS.push(element);
                        }
                        if(element ['base'] === 'USD' && element ['symbol'] === 'LTC') {
                            LTCUSD.push(element);
                         }
                         if(element ['base'] === 'EUR' && element ['symbol'] === 'LTC') {
                             LTCEUR.push(element);
                         }
                         if(index+1 ===  callback['cotizaciones'].length ){ 
                            //console.log('ES IGUALLL');
                             resp = {
                                BTCUSD:BTCUSD,
                                BTCARS:BTCARS,
                                BTCEUR:BTCEUR,
                                ETHARS:ETHARS,
                                ETHUSD: ETHUSD,
                                ETHEUR: ETHEUR,
                                LTCARS: LTCARS,
                                LTCUSD: LTCUSD,
                                LTCEUR: LTCEUR
                             }
                             console.log('cotizacionesV2 enviado')
                            return res.send(resp);
                         }
                    }
                   }
               );
         
     },
    // getCotizacionesV2 : async  (req,res,next)=>{
    //     console.log('get cotizaciones ...')
    //     let ETHARS = [] ;  let ETHEUR = [] ;  let ETHUSD = [] ;
    //     let BTCARS = [] ;  let BTCEUR = [] ;  let BTCUSD = [] ;
    //     let LTCARS = [] ;  let LTCEUR = [] ;  let LTCUSD = [] ;
 
    //        cotizacionesService.getCotizacionesV2((callback)=>{
    //         for (let index = 0; index < callback['cotizaciones'].length; index++) {
    //             console.log(index)
    //             const element = callback['cotizaciones'][index]['dataValues'];
    //            if(element ['base'] === 'ARS' && element ['symbol'] === 'BTC') {
    //                BTCARS.push(element);
    //            }
    //            if(element ['base'] === 'USD' && element ['symbol'] === 'BTC') {
    //                 BTCUSD.push(element);
    //             }
    //             if(element ['base'] === 'EUR' && element ['symbol'] === 'BTC') {
    //                 BTCEUR.push(element);
    //             }
    //             if(element ['base'] === 'ARS' && element ['symbol'] === 'ETH') {
    //                 ETHARS.push(element);
    //             }
    //             if(element ['base'] === 'USD' && element ['symbol'] === 'ETH') {
    //                 ETHUSD.push(element);
    //              }
    //              if(element ['base'] === 'EUR' && element ['symbol'] === 'ETH') {
    //                  ETHEUR.push(element);
    //              }
    //              if(element ['base'] === 'ARS' && element ['symbol'] === 'LTC') {
    //                 LTCARS.push(element);
    //             }
    //             if(element ['base'] === 'USD' && element ['symbol'] === 'LTC') {
    //                 LTCUSD.push(element);
    //              }
    //              if(element ['base'] === 'EUR' && element ['symbol'] === 'LTC') {
    //                  LTCEUR.push(element);
    //              }
    //              if(index+1 ===  callback['cotizaciones'].length ){ 
    //                 //console.log('ES IGUALLL');
    //                  resp = {
    //                     BTCUSD:BTCUSD,
    //                     BTCARS:BTCARS,
    //                     BTCEUR:BTCEUR,
    //                     ETHARS:ETHARS,
    //                     ETHUSD: ETHUSD,
    //                     ETHEUR: ETHEUR,
    //                     LTCARS: LTCARS,
    //                     LTCUSD: LTCUSD,
    //                     LTCEUR: LTCEUR
    //                  }
    //                  console.log('cotizacionesV2 enviado')
    //                 return res.send(resp);
    //              }
    //         }
    //      });
    //  },
    getCotizacionParaMonedero : (req,res,next)=>{
         console.log('.. gett cotizaciones para monedero');
         cotizacionesService.getCotizacionParaMonedero((callback)=>{
            console.log('..   cotizaciones para monedero enviado');
             return res.send(callback);
         });
     }
}