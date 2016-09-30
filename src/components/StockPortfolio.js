import React, { Component } from 'react'
import jsonp from 'jsonp';

import StockActions from '../actions/StockActions';
import StockStore from '../stores/StockStore';

export default class StockPortfolio extends Component {
  constructor() {
    super();

    this.state = {
      stocks: StockStore.getStocks(),
    }

    this._deleteStock = this._deleteStock.bind(this);
    this._onChange = this._onChange.bind(this);
    this._addFavorite = this._addFavorite.bind(this);
    this._refresh = this._refresh.bind(this);
  }

  componentDidMount() {
    StockStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    StockStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      stocks: StockStore.getStocks(),
    })
  }

  _deleteStock(id) {
    StockActions.deleteStock(id);
  }

  _addFavorite(symbol, name) {
    StockActions.addFavorite(symbol, name);
  }

  _refresh(symbol, id) {
    StockActions.grabDataWithSymbol(symbol);
    StockActions.deleteStock(id);
  }

  render() {
    let { stocks } = this.state;

    let Stocks = [];
    if (stocks !== undefined) {
      Stocks = stocks.map(stock => {
        return (
          <div className='inline' key={stock.id}>
            <h2>{stock.name} ({stock.symbol})</h2>
            <div className="row">
              <h3 className='bold'>Price: {stock.price}</h3>
              <h4 className='blue'>Open: {stock.open}</h4>
              <h4 className='green'>High: {stock.high}</h4>
              <h4 className='red'>Low: {stock.low}</h4>
            </div>
            <button className='btn btn-default' onClick={() => this._refresh(stock.symbol, stock.id)}>Refresh</button>
            <button className='btn btn-default btn-success' onClick={() => this._addFavorite(stock.symbol, stock.name)}>Add to Favorites</button>
            <button className='btn btn-default btn-danger' onClick={() => this._deleteStock(stock.id)}>X</button>
          </div>
        )
      })
    }

    return (

      <div>
        <h1 className='text-center' >Stock Portfolio</h1>
        <div>
          {Stocks}
        </div>
      </div>

    )
  }
}
