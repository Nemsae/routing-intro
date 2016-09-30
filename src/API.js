import jsonp from 'jsonp';
import uuid from 'uuid';

import ServerActions from './actions/ServerActions';

const API = {

  fetchData(symbol) {
    jsonp(`http://dev.markitondemand.com/MODApis/Api/v2/Lookup/jsonp?input=${symbol}`, (err, data) => {

      ServerActions.sendLookup(data);
    })

  },

  fetchWithSymbol(symbol) {
    jsonp(`http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol=${symbol}`, (err, data) => {

      let dataPackage = {
        name: data.Name,
        symbol: data.Symbol,
        price: data.LastPrice,
        open: data.Open,
        high: data.High,
        low: data.Low,
        id: uuid(),
      }

      ServerActions.sendData(dataPackage);
    })
  },


}

export default API;
