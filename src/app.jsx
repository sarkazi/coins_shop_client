

import Main from '../src/components/Main'
import Header from './components/Header';


import { createContext, useState } from 'react';

export const AppContext = createContext();

function App() {

   const [isCloseCart, setIsCloseCart] = useState(false)


   return (
      <AppContext.Provider value={{ isCloseCart, setIsCloseCart }}>
         <div style={{ position: 'relative' }}>
            <Header />
            <Main />
         </div>
      </AppContext.Provider>

   );
}

export default App;