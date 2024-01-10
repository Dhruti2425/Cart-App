import './App.css';
import React, { useContext } from 'react';
import Product from './component/Product';

import 'bootstrap/dist/css/bootstrap.min.css';

export const productContext = React.createContext();

function App() {
  return (
    <div className="App">
      <productContext.Provider value={"Product"}>
        <Product />
      </productContext.Provider>
    </div>
  );
}

export default App;
