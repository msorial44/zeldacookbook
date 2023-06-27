import React from 'react';
import { useState } from 'react';
import MaterialSelect from './Components/MaterialSelect/MaterialSelect';
import MaterialDisplay from './Components/MaterialDisplay/MaterialDisplay';
import './App.scss';

type Mats = {
  "Name": string;
  "Inventory Icon": string;
  "Caption": string;
  "Hearts Recovered": string;
  "Cooking Effect": string;
  "Cooking Effect Level": string;
  "Cooking Effect Time Boost Duration (Raw)": number;
  "Cooking Tag 1": string;
  "Cooking Tag 2": string;
  "Cooking Tag 3": string;
  "Cooking Tag (Custom)": string;
  "Cooking Tag (Custom) 2": string;
  "MaterialCategory": string;
  "Inventory Order (By type)": number;
};
export type { Mats };

function App() {
  const [Ingredients, setIngredients] = useState<Mats[]>([]);

  function handleAdd(mats: Mats): void {
    if (Ingredients.includes(mats)) { 
      return;
    }
    if (Ingredients.length >= 5) {
      return;
    }
    setIngredients(Ingredients => [...Ingredients, mats]);
  }

  function handleRemove(mats: Mats): void {
    setIngredients(Ingredients => Ingredients.filter(item => item !== mats));
  }

  function handleClick() {
    console.log(Ingredients);
  }
  return (
    <div className="App">
      <MaterialSelect handleClick={handleAdd} />
      <div className="Result" onClick={handleClick}>
        <MaterialDisplay data={Ingredients} handleClick={handleRemove}/>
      </div>
    </div>
    
  );
}

export default App;
