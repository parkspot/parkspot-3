//React imports
import React from 'react'
import Routes from './components/Routes/Routes'

/**
 * @class Main
 * Root of App, this is used to not directly edit the 'App.js' file in the root folder
 */
export default class Main extends React.Component {
  /**
   * @function render
   * Returns View of the Screen
   */
  render() {
    return(
      <Routes />
    )
  }
}