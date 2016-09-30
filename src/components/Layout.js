import React, { Component } from 'react'

import { Link } from 'react-router'

export default class Layout extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='container'>
        <h1 className='text-center'>Stock Socks</h1>

        <ul>
          <li>
            <Link className='btn btn-default' to='/welcome'>
            Stock Lookup
            </Link>
          </li>
          <li>
            <Link className='btn btn-default' to='/stockinput'>
              Add Stock by Symbol
            </Link>
          </li>
          <li>
            <Link className='btn btn-default' to='/stockportfolio'>
              Stock Portfolio
            </Link>
          </li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}
