import { EventEmitter } from 'events';
import AppDispatcher from '../AppDispatcher';
import Storage from '../Storage';

let _stocks = Storage.read('stocks') || [];
// let _stocks = [];
let _lookups = [];
let _favorites = Storage.read('favorites') || [];

class StockStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'SEND_DATA':
          let { dataPackage } = action.payload;
          _stocks.push(dataPackage);
          this.emit('CHANGE');
          break;

        case 'DELETE_STOCK':
          let { id } = action.payload;
          let newStocks = _stocks.filter(stock => {
            if (stock.id === id) {
              return;
            } else {
              return stock;
            }
          });
          _stocks = newStocks;
          this.emit('CHANGE');
          break;

        case 'SEND_LOOKUP':
          let { data } = action.payload;
          _lookups = data;
          this.emit('CHANGE');
          break;

        case 'ADD_FAVORITE':
          let { symbol, name } = action.payload;
          let myPackage = {symbol,name};
          console.log('myPackage: ',myPackage);
          _favorites.push(myPackage);
          console.log('_favorites: ',_favorites);
          this.emit('CHANGE');
          break;

      }
    });

    this.on('CHANGE', () => {
      Storage.write('stocks',_stocks);
      Storage.write('favorites',_favorites); 
    })
  }

  startListening(cb) {
    this.on('CHANGE',cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE',cb);
  }

  getStocks() {
    return _stocks;
  }

  getLookups() {
    return _lookups;
  }

  getFavorites() {
    return _favorites;
  }
}

export default new StockStore();
