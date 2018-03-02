import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Marketplace from './comp/Marketplace/Marketplace.js'
import Home from './comp/Home/Home'

class Main extends Component {
    render() {
        return (
            <main>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/Marketplace' component={Marketplace}/>
              </Switch>
            </main>
        )
    }
}

export default Main
