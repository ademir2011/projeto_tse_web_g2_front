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


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />}/>
        <Route index element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastroProcesso" element={<FormProcesso />} />

    </Routes>
</BrowserRouter>
)
