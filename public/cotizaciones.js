var request = require('request');
var cron = require('node-cron');
var j = request.jar();
var cotizaciones = require('../database/cotizaciones')();
var monedaModel = require('../database/monedaModel')();
const mysql = require('.././database/mysql');
connection = mysql.dbConnection();

module.exports = {

   cotizaciones:  ()=>{
       console.log('Ejecutando cotizaciones ..')
    cron.schedule('*/10 * * * * *', () => {
        //console.log('running a task every minute');
        request('https://api.bit2me.com/v1/ticker2', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }       
                    var cotizacion = new cotizaciones;
                    cotizacion.proveedor='Bit2me';
                    cotizacion.symbol= body['data'][0]['symbol'];
                    cotizacion.base= body['data'][0]['base'];
                    cotizacion.venta= body['data'][0]['sell'];
                    cotizacion.compra= body['data'][0]['buy'];
                    cotizacion.name= body['data'][0]['name'];
                    obtener_valor(body['data'][0]['symbol'],'Bit2me',body['data'][0]['base'],
                                    body['data'][0]['buy'],(cb)=>{
                        cotizacion.variacionDia = cb ;
                        obtener_valor_hora(body['data'][0]['symbol'],'Bit2me',body['data'][0]['base'],
                                    body['data'][0]['buy'],(cbHora)=>{
                            cotizacion.variacionHora = cbHora ;
                            cotizacion.save();  
                            connection.query(`UPDATE moneda SET compraEUR=${parseFloat(body['data'][0]['buy']) } WHERE symbol='BTC'`,(e,r)=>{
                            });
                        });   
                    });     
                                 
                    var cotizacion1 = new cotizaciones;
                    cotizacion1.proveedor='Bit2me';
                    cotizacion1.symbol= body['data'][1]['symbol'];
                    cotizacion1.base= body['data'][1]['base'];
                    cotizacion1.venta= body['data'][1]['sell'];
                    cotizacion1.compra= body['data'][1]['buy'];
                    cotizacion1.name= body['data'][1]['name'];
                    obtener_valor(body['data'][1]['symbol'],'Bit2me',body['data'][1]['base'],
                                    body['data'][1]['buy'],(cb)=>{
                                    cotizacion1.variacionDia = cb ;
                        obtener_valor_hora(body['data'][1]['symbol'],'Bit2me',body['data'][1]['base'],
                                    body['data'][1]['buy'],(cbHora)=>{
                                    cotizacion1.variacionHora = cbHora ;
                                    cotizacion1.save();  
                                    connection.query(`UPDATE moneda SET compraEUR=${parseFloat(body['data'][1]['buy']) } WHERE symbol='ETH'`,(e,r)=>{
                                    });
                        });   
                    });      

                    var cotizacion2 = new cotizaciones;
                    cotizacion2.proveedor='Bit2me';
                    cotizacion2.symbol= body['data'][2]['symbol'];
                    cotizacion2.base= body['data'][2]['base'];
                    cotizacion2.venta= body['data'][2]['sell'];
                    cotizacion2.compra= body['data'][2]['buy'];
                    cotizacion2.name= body['data'][2]['name'];
                    obtener_valor(body['data'][2]['symbol'],'Bit2me',body['data'][2]['base'],
                                    body['data'][2]['buy'],(cb)=>{
                                    cotizacion2.variacionDia = cb ;
                        obtener_valor_hora(body['data'][2]['symbol'],'Bit2me',body['data'][2]['base'],
                                    body['data'][2]['buy'],(cbHora)=>{
                                    cotizacion2.variacionHora = cbHora ;
                                    cotizacion2.save();  
                        });   
                    });      

        });
        request('https://api.decrypto.com.ar:8081/1.0/frontend/precios/', { json: true }, (err, res, body) => {
            try{
                if (err) { return console.log(err); }    
                //console.log(body);
                var auxiliarUSD = body['data'][0];
                var cotizacion = new cotizaciones;
                cotizacion.proveedor='DeCrypto';
                cotizacion.symbol= 'BTC';
                cotizacion.base= 'USD';
                var aux00 = parseFloat(auxiliarUSD['dca'])+(parseFloat(auxiliarUSD['dca'])*0.0035);
                cotizacion.venta= parseFloat(auxiliarUSD['dcb'])-(parseFloat(auxiliarUSD['dcb'])*0.0035);
                cotizacion.compra=  aux00;
                cotizacion.name='Bitcoin';
                obtener_valor('BTC','DeCrypto','USD',aux00,(cb)=>{
                        cotizacion.variacionDia = cb ;
                        obtener_valor_hora('BTC','DeCrypto','USD',aux00,(cbHora)=>{
                            cotizacion.variacionHora = cbHora ;
                            cotizacion.save();  
                        });    
                });  
            }catch(err) {
                obtener_ultimo_registro('DeCrypto','USD','BTC',(ca)=> {
                    console.log(ca['proveedor'] );
                var cotizacion = new cotizaciones;
                cotizacion.proveedor=ca['proveedor'];
                cotizacion.symbol= 'BTC';
                cotizacion.base= 'USD';
                cotizacion.compra=  ca['compra'];
                cotizacion.venta=  ca['venta'];
                cotizacion.name='Bitcoin';
                obtener_valor('BTC','DeCrypto','USD',ca['compra'],(cb)=>{
                        cotizacion.variacionDia = cb ;
                        obtener_valor_hora('BTC','DeCrypto','USD',ca['compra'],(cbHora)=>{
                            cotizacion.variacionHora = cbHora ;
                            cotizacion.save();  
                        });    
                });  
                });
            }
                
            try{
                var auxiliarARS = body['data'][1];
                var cotizacionARS = new cotizaciones;
                cotizacionARS.proveedor='DeCrypto';
                cotizacionARS.symbol= 'BTC';
                cotizacionARS.base= 'ARS';
                cotizacionARS.venta= parseFloat(auxiliarARS['dcb'])-(parseFloat(auxiliarARS['dcb'])*0.035);
                var aux0 = parseFloat(auxiliarARS['dca'])-(parseFloat(auxiliarARS['dca'])*0.035) ;
                cotizacionARS.compra=  aux0;
                cotizacionARS.name= 'Bitcoin';
                obtener_valor('BTC','DeCrypto','ARS',aux0,(cb)=>{
                    cotizacion.variacionDia = cb ;
                    obtener_valor_hora('BTC','DeCrypto','ARS',aux0,(cbHora)=>{
                        cotizacion.variacionHora= cbHora ;
                        cotizacion.save();  
                    }); 
                });  
            }catch(err){
                obtener_ultimo_registro('DeCrypto','USD','BTC',(ca)=> {
                    console.log(ca['proveedor'] );
                var cotizacion = new cotizaciones;
                cotizacion.proveedor='DeCrypto';
                cotizacion.symbol= 'BTC';
                cotizacion.base= 'ARS';
                cotizacion.compra=  ca['compra'];
                cotizacion.venta=  ca['venta'];
                cotizacion.name='Bitcoin';
                obtener_valor('BTC','DeCrypto','USD',ca['compra'],(cb)=>{
                        cotizacion.variacionDia = cb ;
                        obtener_valor_hora('BTC','DeCrypto','ARS',ca['compra'],(cbHora)=>{
                            cotizacion.variacionHora = cbHora ;
                            cotizacion.save();  
                        });    
                });  
                });
            }
                 
        });
        request('https://www.coinbase.com/api/v2/assets/prices?base=USD&filter=listed&resolution=latest', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }    
                var cotizacion = new cotizaciones;
                const aux = body['data'][3]['prices']
                cotizacion.proveedor='Coinbase';
                cotizacion.symbol= body['data'][3]['base'];
                cotizacion.base= body['data'][3]['currency'];
                cotizacion.venta= aux.latest;
                cotizacion.compra= aux.latest; 
                cotizacion.name='Ethereum';
                obtener_valor(body['data'][3]['base'],'Coinbase',body['data'][3]['currency'],aux.latest,(cb)=>{
                    cotizacion.variacionDia = cb ;
                    obtener_valor_hora(body['data'][3]['base'],'Coinbase',body['data'][3]['currency'],aux.latest,(cbHora)=>{
                        cotizacion.variacionHora = cbHora ;
                        cotizacion.save();  
                        connection.query(`UPDATE moneda SET compraUSD=${parseFloat(cotizacion.compra) } WHERE symbol='ETH'`,(e,r)=>{     
                        });
                    });  
                });  

                var cotizacionLTC = new cotizaciones;
                const aux2 = body['data'][5]['prices']
                cotizacionLTC.proveedor='Coinbase';
                cotizacionLTC.symbol= body['data'][5]['base'];
                cotizacionLTC.base= body['data'][5]['currency'];
                cotizacionLTC.venta= aux2.latest;
                cotizacionLTC.compra= aux2.latest;
                cotizacionLTC.name='Litecoin';
                obtener_valor(body['data'][5]['base'],'Copay',body['data'][5]['currency'],aux2.latest,(cb)=>{
                    if(cb !=null) {
                        cotizacionLTC.variacionDia = cb ;
                    }
                    obtener_valor_hora(body['data'][5]['base'],'Copay',body['data'][5]['currency'],aux2.latest,(cbHora)=>{
                        if(cbHora !=null) {
                            cotizacionLTC.variacionHora = cbHora ;
                        }
                        cotizacionLTC.save();  
                    });  
                });  
               
        });    
          
        request('https://criptoya.com/exchanges/Sesocio.php?coin=ETH&fiat=ARS&vol=5', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }    
                var cotizacion = new cotizaciones;
                cotizacion.proveedor='Sesocio';
                cotizacion.symbol= 'ETH' ;
                cotizacion.base= 'ARS';
                cotizacion.venta=  body['bid'];
                cotizacion.compra= body['ask'];
                cotizacion.name='Ethereum';
                obtener_valor('ETH','Sesocio','ARS', body['ask'],(cb)=>{
                    cotizacion.variacionDia = cb ;
                    obtener_valor_hora('ETH','Sesocio','ARS', body['ask'],(cbHora)=>{
                        cotizacion.variacionHora = cbHora ;
                        cotizacion.save();  
                    }); 
                });  
                  
        
        }); 
        request('https://criptoya.com/exchanges/Sesocio.php?coin=BTC&fiat=ARS&vol=0.1', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }    
                var cotizacion = new cotizaciones;
                cotizacion.proveedor='Sesocio';
                cotizacion.symbol= 'BTC' ;
                cotizacion.base= 'ARS';
                cotizacion.venta=  body['bid'];
                cotizacion.compra= body['ask'];
                cotizacion.name='Bitcoin';
                obtener_valor('BTC','Sesocio','ARS', body['ask'],(cb)=>{
                    cotizacion.variacionDia = cb ;
                    obtener_valor_hora('BTC','Sesocio','ARS', body['ask'],(cbHora)=>{
                        cotizacion.variacionHora = cbHora ;
                        cotizacion.save();  
                    }); 
                });  
        
        }); 
        request('https://criptoya.com/exchanges/CryptoMkt.php?coin=ETH&fiat=ARS&vol=5', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }    
                var cotizacion = new cotizaciones;
                cotizacion.proveedor='Cryptomkt';
                cotizacion.symbol= 'ETH' ;
                cotizacion.base= 'ARS';
                cotizacion.venta=  body['bid'];
                cotizacion.compra= body['ask'];
                cotizacion.name='Ethereum';
                obtener_valor('ETH','Cryptomkt','ARS', body['ask'],(cb)=>{
                    if(cb !=null) {
                        cotizacion.variacionDia = cb ;
                    }
                   
                    obtener_valor_hora('ETH','Cryptomkt','ARS', body['ask'],(cbHora)=>{
                         
                        if(cbHora !=null) {
                            cotizacion.variacionHora = cbHora ;
                        }
                        cotizacion.save();  
                        connection.query(`UPDATE moneda SET compraARS=${parseFloat(cotizacion.compra) } WHERE symbol='ETH'`,(e,r)=>{
                        });
                    }); 
                });  
                
        }); 
        request('https://criptoya.com/exchanges/Decrypto.php?coin=BTC&fiat=ARS&vol=0.1', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }    
                var cotizacion = new cotizaciones;
                cotizacion.proveedor='Cryptomkt';
                cotizacion.symbol= 'BTC' ;
                cotizacion.base= 'ARS';
                cotizacion.venta=  body['bid'];
                cotizacion.compra= body['ask'];
                cotizacion.name='Bitcoin';
                obtener_valor('BTC','Cryptomkt','ARS', body['ask'],(cb)=>{
                    cotizacion.variacionDia = cb ;
                    obtener_valor_hora('BTC','Cryptomkt','ARS', body['ask'],(cbHora)=>{
                        cotizacion.variacionHora = cbHora ;
                        cotizacion.save();  
                    }); 
                });  
 
        });    
        request('http://preev.com/pulse/units:btc+usd/sources:bitstamp+kraken', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }    
                var cotizacion = new cotizaciones;
                cotizacion.proveedor='Bitstamp';
                cotizacion.symbol= 'BTC';
                cotizacion.base= 'USD';
                var c = parseFloat(body['btc']['usd']['bitstamp']['last']);
                cotizacion.venta= parseFloat(c - (c*(0.0024)));
                cotizacion.compra=parseFloat(c - (c*(0.0024)));
                cotizacion.name='Bitcoin';
                obtener_valor('BTC','Bitstamp','USD', body['btc']['usd']['bitstamp']['last'],(cb)=>{
                    cotizacion.variacionDia = cb ;
                    obtener_valor_hora('BTC','Bitstamp','USD', body['btc']['usd']['bitstamp']['last'],(cbHora)=>{
                        cotizacion.variacionHora = cbHora ;
                        cotizacion.save();  
                        connection.query(`UPDATE moneda SET compraUSD=${parseFloat(cotizacion.compra) } WHERE symbol='BTC'`,(e,r)=>{     
                            });
                    });   
                });  
    
      });
        request('https://argenbtc.com/public/cotizacion_js.php', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }    
                var cotizacion = new cotizaciones;
                cotizacion.proveedor='ArgenBtc';
                cotizacion.symbol= 'BTC';
                cotizacion.base= 'ARS';
                cotizacion.compra= body['precio_compra'];
                cotizacion.venta= body['precio_venta'];
                cotizacion.name='Bitcoin';
                obtener_valor('BTC','ArgenBtc','ARS', body['precio_compra'],(cb)=>{
                    cotizacion.variacionDia = cb ;
                    obtener_valor_hora('BTC','ArgenBtc','ARS', body['precio_compra'],(cbHora)=>{
                        cotizacion.variacionHora = cbHora ;
                        cotizacion.save();  
                        connection.query(`UPDATE moneda SET compraARS=${parseFloat(cotizacion.compra) } WHERE symbol='BTC'`,(e,r)=>{             
                        });
                    });  
                });  
    
        });
        request('https://criptoya.com/exchanges/SatoshiTango.php?coin=BTC&fiat=ARS&vol=0.1', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }    
                var cotizacion = new cotizaciones;
                cotizacion.proveedor='Satoshitango';
                cotizacion.symbol= 'BTC' ;
                cotizacion.base= 'ARS';
                cotizacion.venta=  body['bid'];
                cotizacion.compra= body['ask'];
                cotizacion.name='Bitcoin';
                obtener_valor('BTC','Satoshitango','ARS', body['ask'],(cb)=>{
                    cotizacion.variacionDia = cb ;
                    obtener_valor_hora('BTC','Satoshitango','ARS', body['ask'],(cbHora)=>{
                        cotizacion.variacionHora = cbHora ;
                        cotizacion.save();  
                    }); 
                });  
            }); 
        request('https://criptoya.com/exchanges/SatoshiTango.php?coin=ETH&fiat=ARS&vol=5', { json: true }, (err, res, body) => {
                    if (err) { return console.log(err); }    
                        var cotizacion = new cotizaciones;
                        cotizacion.proveedor='Satoshitango';
                        cotizacion.symbol= 'ETH' ;
                        cotizacion.base= 'ARS';
                        cotizacion.venta=  body['bid'];
                        cotizacion.compra= body['ask'];
                        cotizacion.name='Ethereum';
                        obtener_valor('ETH','Satoshitango','ARS', body['ask'],(cb)=>{
                            cotizacion.variacionDia = cb ;
                            obtener_valor_hora('ETH','Satoshitango','ARS', body['ask'],(cbHora)=>{
                                cotizacion.variacionHora = cbHora ;
                                cotizacion.save();  
                            }); 
                        });  
        }); 

                    // var cotizacionKLPeso = new cotizaciones;
                    // cotizacionKLPeso.proveedor='Kuanliandp';
                    // cotizacionKLPeso.symbol= 'KL' ;
                    // cotizacionKLPeso.base= 'ARS';
                    // cotizacionKLPeso.venta=  parseFloat(132*80);
                    // cotizacionKLPeso.compra= parseFloat(132*80);
                    // cotizacionKLPeso.name='Kuanliandp';
                    // cotizacionKLPeso.save();

                    // var cotizacionKLEuro = new cotizaciones;
                    // cotizacionKLEuro.proveedor='Kuanliandp';
                    // cotizacionKLEuro.symbol= 'KL' ;
                    // cotizacionKLEuro.base= 'EUR';
                    // cotizacionKLEuro.venta=  parseFloat(1,085*80);
                    // cotizacionKLEuro.compra= parseFloat(1,085*80);
                    // cotizacionKLEuro.name='Kuanliandp';
                    // cotizacionKLEuro.save();

                    // var cotizacionKLUSD = new cotizaciones;
                    // cotizacionKLUSD.proveedor='Kuanliandp';
                    // cotizacionKLUSD.symbol= 'KL' ;
                    // cotizacionKLUSD.base= 'USD';
                    // cotizacionKLUSD.venta=  parseFloat(80);
                    // cotizacionKLUSD.compra= parseFloat(80);
                    // cotizacionKLUSD.name='Kuanliandp';
                    // cotizacionKLUSD.save();

      });
   }

}
function obtener_valor(symbol,proveedor,base,compra_hoy,cb) {
    var linea = `SELECT name,base,compra compra_ayer,venta venta_ayer, proveedor,create_at`+
                    ` FROM cotizacion WHERE CREATE_AT BETWEEN  DATE_SUB(NOW(),INTERVAL 1 day)   AND  NOW() AND `+
                    `PROVEEDOR='${proveedor}' AND symbol='${symbol}' AND base='${base}' LIMIT  1` ;
            try{
                connection.query(linea,(error,respuesta) => {
                    if( error) { 
                        console.log( error );
                    }
                    if(respuesta.length >0){
                        var A = (parseFloat((100/respuesta[0].compra_ayer)) ) ;
                        var B = (parseFloat((compra_hoy-respuesta[0].compra_ayer)) ) ;
                        var C = (A*B);
                        //var varDia  = ( parseFloat((100/respuesta[0].compra_ayer)*(compra_hoy-respuesta[0].compra_ayer)) );
                        return cb(C);
                    } else {
                        return cb(null);
                    }
 
                })
            }catch(err) {
                return cb(null);
            }
    
            }
             
            
function obtener_valor_hora(symbol,proveedor,base,compra_hoy,cb) {
    var linea = `SELECT name,base,compra compra_ayer,venta venta_ayer, proveedor,create_at`+
            ` FROM cotizacion WHERE CREATE_AT BETWEEN  DATE_SUB(NOW(),INTERVAL 1 hour)   AND  NOW() AND `+
            `PROVEEDOR='${proveedor}' AND symbol='${symbol}' AND base='${base}' LIMIT  1` ;
    connection.query(linea,(error,respuesta) => {
        try{
            if(respuesta.length === 1) {
                var A = (parseFloat((100/respuesta[0].compra_ayer)) ) ;
                var B = (parseFloat((compra_hoy-respuesta[0].compra_ayer)) ) ;
                var C = (A*B);
                return cb(C);
            } else{
                return cb(0);
            }
        }catch(err ) {
            return cb(null);
        }
    });
}
function obtener_ultimo_registro(proveedor,base,symbol,ca) {
    var linea = `SELECT * FROM cotizacion WHERE proveedor='${proveedor}' AND base='${base}' AND symbol='${symbol}' order by id DESC LIMIT 1`;
    connection.query(linea,(err,res) => {

        return ca(res[0]);
    })
}