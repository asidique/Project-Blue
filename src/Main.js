import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Marketplace from './comp/Marketplace/Marketplace.js'
import Home from './comp/Home/Home'
import User from './comp/User/User'
import Post from './comp/Post/Post'
import Scan from './comp/Scan/Scan'

class Main extends Component {
    render() {
        return (
            <main>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/Marketplace' component={Marketplace}/>
                <Route exact path='/Users' component={User} />
                <Route exact path='/Post' component={Post} />
                <Route exact path='/Scan' component={Scan} />
              </Switch>
            </main>
        )
    }
}

export default Main
