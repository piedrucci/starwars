import React from 'react';
import { Provider } from 'react-redux'
import configureStore from './store'

import Header from './header'
import Container from './container'

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <div className="jumbotron">
      <Header />
      <Container />
    </div>
  </Provider>
)

export default App