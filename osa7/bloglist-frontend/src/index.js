import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './redux-helper'

ReactDOM.render(
    <div class='container'>
        <Provider store={store}>
            <App />
        </Provider>
    </div>,
    document.getElementById('root'))