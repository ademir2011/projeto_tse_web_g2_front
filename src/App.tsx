import Header from "./components/Header"
import Pautas from "./pages/Pautas"
import { useState } from 'react'
import { Dialog, Transition  } from '@headlessui/react'


function App() {
  

  return (
    <div className="App">
      <Header logado={false} ></Header>

      <Pautas/>
              
      
        
    </div>
  )
}

export default App
