import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './global.css'
// import { BrowserRouter } from "react-router-dom";
import RoutesConfig from './RoutesConfig';
import Login from './pages/Login';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />}/>
        <Route index element={<App />} />
        <Route path="/login" element={<Login />} />

    </Routes>
</BrowserRouter>
)
