import React from 'react'
import { Switch, Route,
   // Redirect
 } from 'react-router-dom'
import ListData from './list'
import Profile from './profile'

const Container = () => (
  <main>
    <Switch>
      <Route exact path='/' component={ListData}/>
      <Route path='/people/:idProfile' component={Profile} />
    </Switch>
  </main>
)

export default Container