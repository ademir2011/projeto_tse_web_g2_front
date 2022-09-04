import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import {
  BrowserRouter,
  Routes,
  Route,
  Router,
} from "react-router-dom";

import './global.css'
import Login from './pages/Login';
import FormProcesso from './pages/FormProcesso';
import FormJulgamentoPauta from './pages/FormJulgamentoPauta';
import VincularProcessos from './pages/VincularProcessos';
import Rotas from './Rotas';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  
  <BrowserRouter>
   <Rotas/>
  </BrowserRouter>
)
