import React, { Component } from 'react'
import jsonp from 'jsonp';

import StockActions from '../actions/StockActions';
import StockStore from '../stores/StockStore';

export default class StockInput extends Component {
  constructor() {
    super();

    this.state = {
      input: undefined,
      favorites: StockStore.getFavorites(),
    }

    this._grabInput = this._grabInput.bind(this);
    this._sendInput = this._sendInput.bind(this);
  }

  componentDidMount() {
    StockStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    StockStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      favorites: StockStore.getFavorites(),
    })
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

    StockActions.grabDataWithSymbol(newInput);
  }

  render() {
    let { favorites } = this.state;

    let Favorites = [];
    if (favorites !== undefined) {
      Favorites = favorites.map((favorite, i) => {
        return (
          <tr key={i}>
            <td>{favorite.name}</td>
            <td>{favorite.symbol}</td>
          </tr>
        )
      })
    }

    return (
      <div className='text-center'>
        <h1>Saved Stocks</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
            </tr>
          </thead>
          <tbody>
            {Favorites}
          </tbody>
        </table>
        <h3 className='text-center' >Stock Input</h3>
        <input onChange={this._grabInput} type="text" ref='stockInput' placeholder='Search with symbol'/>
        <button onClick={this._sendInput}>Add to Portfolio</button>
      </div>

    )
  }
}
