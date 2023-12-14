import { createContext, useState } from 'react';
import './App.css'
import Cards from './Cards'

export const CartContext = createContext(null);

function App() {
  const [open, setOpen] = useState(false);
  const [uId, setId] = useState(null);
  const [counter, setCounter] = useState(0);

  return (
    <>
      <CartContext.Provider value={{open, setOpen, uId, setId, counter, setCounter}}>
        <Cards />
      </CartContext.Provider>
    </>
  )
}

export default App
