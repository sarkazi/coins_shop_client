

import Main from '../src/components/Main'
import Header from './components/Header';


import { createContext, useState } from 'react';

export const AppContext = createContext();

function App() {

   const [isCloseCart, setIsCloseCart] = useState(false)
   const [isAuthUser, setIsAuthUser] = useState(false)
   const [inputData, setInputData] = useState('')


   return (
      <AppContext.Provider value={{ isCloseCart, setIsCloseCart, isAuthUser, setIsAuthUser, inputData, setInputData }}>
         <div style={{ position: 'relative' }}>
            <Header />
            <Main />
         </div>
      </AppContext.Provider>

   );
}

export default App;