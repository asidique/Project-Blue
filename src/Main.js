import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Marketplace from './comp/Marketplace/Marketplace.js'
import Home from './comp/Home/Home'
import User from './comp/User/User'
import Post from './comp/Post/Post'
class Main extends Component {
    render() {
        return (
            <main>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/Marketplace' component={Marketplace}/>
                <Route exact path='/Users' component={User} />
                <Route ecact path='/Post' component={Post} />
              </Switch>
            </main>
        )
    }
}

export default Main
