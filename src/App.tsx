import React from 'react';
import { useState } from 'react';
import MaterialSelect from './Components/MaterialSelect/MaterialSelect';
import MaterialDisplay from './Components/MaterialDisplay/MaterialDisplay';
import DishSelect from './Components/DishSelect/DishSelect';
import type {Mats} from './Components/MaterialSelect/MaterialSelect';
import './App.scss';

function App() {
  const [Ingredients, setIngredients] = useState<Mats[]>([]);

  function handleAdd(mats: Mats, index: number): void {
    if (Ingredients.length >= 5) {
      return;
    }
    setIngredients(Ingredients => [...Ingredients, mats]);
  }

  function handleRemove(mats: Mats, index: number): void {
    setIngredients([
      ...Ingredients.slice(0, index),
      ...Ingredients.slice(index + 1)
    ]);
  }

  return (
    <div className="App">
      <MaterialSelect handleClick={handleAdd} />
      <div className="Result">
        <MaterialDisplay key={Ingredients} data={Ingredients} handleClick={handleRemove}/>
        <DishSelect data={Ingredients}/>
      </div>
      <div className="background-image">

      </div>
    </div>
    
  );
}

export default App;
