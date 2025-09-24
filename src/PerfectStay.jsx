import React, { Component } from 'react'

export class PerfectStay extends Component {
  static propTypes = {}

  render() {
    return (
      <>
        <h1>PerfectStay</h1>
        <div>
          <input type='text' placeholder='Email'></input>
          <input type='text' placeholder='Password'></input>
          <button>Login</button>
        </div>
      </>
    )
  }
}

export default PerfectStay