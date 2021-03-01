import React from 'react'
import ReactDom from 'react-dom'

// Routes
import Routes from './router'
// global styles
import './styles/Css/index.css'
// Redux setup
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducer'
import initialStore from './store'

const store = createStore(
  reducer,
  initialStore,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDom.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.querySelector('#root')
)
