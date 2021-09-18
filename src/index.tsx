import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { store } from './store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { worker } from './mocks/browser'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
// Initialize the msw worker, wait for the service worker registration to resolve, then mount
worker.start({ quiet: true }).then(() =>
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <ToastContainer />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
  ),
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
