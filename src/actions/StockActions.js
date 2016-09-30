import API from '../API';
import AppDispatcher from '../AppDispatcher';

const StockActions = {
  grabData(input) {
    API.fetchData(input);
  },

  grabDataWithSymbol(symbol) {
    API.fetchWithSymbol(symbol);
  },

  deleteStock(id) {
    AppDispatcher.dispatch({
      type: 'DELETE_STOCK',
      payload: { id }
    })
  },

  addFavorite(symbol, name) {
    AppDispatcher.dispatch({
      type: 'ADD_FAVORITE',
      payload: {
        symbol,
        name
      }
    })
  },

  refresh(symbol) {
    
  },

}

export default StockActions;
