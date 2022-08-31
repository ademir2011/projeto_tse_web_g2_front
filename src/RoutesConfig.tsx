import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";

import { render } from 'react-dom';
import App from './App';
import Login from './pages/Login';


export default function RoutesConfig(){
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<App />} />
                    <Route path="login" element={<Login />} />

                </Route>
            </Routes>
        </BrowserRouter>
     
    )
}