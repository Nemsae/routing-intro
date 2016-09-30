import React, { Component } from 'react';

import StockActions from '../actions/StockActions';
import StockStore from '../stores/StockStore';

export default class Welcome extends Component {
  constructor() {
    super();

    this.state = {
      input: undefined,
      lookups: StockStore.getLookups(),
    }

    this._grabInput = this._grabInput.bind(this);
    this._sendInput = this._sendInput.bind(this);
    this._onChange = this._onChange.bind(this);
    this._sendSymbol = this._sendSymbol.bind(this);
  }

    componentDidMount() {
      StockStore.startListening(this._onChange);
    }

    componentWillUnmount() {
      StockStore.stopListening(this._onChange);
    }

    _onChange() {
      this.setState({
        lookups: StockStore.getLookups(),
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

      StockActions.grabData(input);
    }

    _sendSymbol(symbol) {
      StockActions.grabDataWithSymbol(symbol);
    }

  render() {
    let { lookups } = this.state;

    let Lookups = [];
    if(lookups !== undefined) {
      Lookups = lookups.map((lookup, i) => {

        return (
          <div key={i}>
            <h3>{lookup.Name}</h3>
            <h4>{lookup.Exchange}</h4>
            <button onClick={() => this._sendSymbol(lookup.Symbol)}>{lookup.Symbol}</button>
          </div>

        )
      })
    }

    return (
      <div>
        <h1 className='text-center'>Stock Lookup</h1>
        <input type="text" onChange={this._grabInput} placeholder='Search by name/symbol'/>
        <button onClick={this._sendInput}>Grab List</button>
        <div>
          {Lookups}
        </div>
      </div>
    )
  }
}
