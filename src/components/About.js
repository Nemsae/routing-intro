import React, { Component } from 'react'
import jsonp from 'jsonp';

import StockActions from '../actions/StockActions';
import StockStore from '../stores/StockStore';

export default class About extends Component {
  constructor() {
    super();

    this.state = {
      stocks: StockStore.getStocks(),
      input: undefined,
    }

    this._grabData = this._grabData.bind(this);
    this._grabInput = this._grabInput.bind(this);
    this._deleteStock = this._deleteStock.bind(this);
    this._sendInput = this._sendInput.bind(this);
    this._onChange = this._onChange.bind(this);
  }


  componentDidMount() {
    console.log('about did mount')
    StockStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    console.log('about did unmount')
    StockStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      stocks: StockStore.getStocks(),
    })
  }

  _grabData() {
    StockActions.grabDataWithSymbol();
  }

  _grabInput(e) {
    let input = e.target.value;

    this.setState({
      input,
    })
  }

  _sendInput() {
    let { input } = this.state;

    let newInput = input.toUpperCase();
    StockActions.sendInput(newInput);
  }

  _deleteStock(id) {
    StockActions.deleteStock(id);
  }

  render() {
    let { stocks } = this.state;

    let Stocks = [];
    if (stocks !== undefined) {
      Stocks = stocks.map((stock,i) => {
        return (
          <div key={stock.id}>
            <h2>{stock.name} ({stock.symbol})</h2>
            <div className="row">
              <h3 className='bold'>Price: {stock.price}</h3>
              <h4 className='blue'>Open: {stock.open}</h4>
              <h4 className='green'>High: {stock.high}</h4>
              <h4 className='red'>Low: {stock.low}</h4>
            </div>
            <button className='btn btn-default btn-danger' onClick={() => this._deleteStock(stock.id)}>X</button>
          </div>
        )
      })
    }
    console.log('stocks in about: ',stocks);
    // console.log('stocks in about: ',stocks[0].Name);
    return (

      <div className='text-center'>
        <h1 className='text-center' >Stock Input</h1>
        <input onChange={this._grabInput} type="text" ref='stockInput'/>
        <button onClick={this._grabData}>Apple</button>
        <button onClick={this._sendInput}>Add to Portfolio</button>
        <div>
          {Stocks}
        </div>
      </div>

    )
  }
}
