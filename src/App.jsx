import React from "react";
import Pokemons from './components/Pokemons.jsx'
import generateStore from "./redux/store";
import { Provider } from 'react-redux'

function App() {
  const store = generateStore()

  return (
    <Provider store={store}>
      <div className="container mt-3">
        <Pokemons  />
      </div>
    </Provider>
  );
}

export default App;
