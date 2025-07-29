
import './index.scss'
import ReactDOM from 'react-dom/client'

import {  BrowserRouter} from 'react-router-dom'

import { AuthProvider } from './context/authContext'

import App from './App'






ReactDOM.createRoot(document.getElementById('root')!).render(

  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
  
)