import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store.js'
import {Provider} from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* provided store to access all state to entire application
    from imported redux */}
    <Provider store={store}>
    <App/>
    </Provider>
  </StrictMode>,
)
