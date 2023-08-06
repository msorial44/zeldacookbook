import React from 'react';
import { useState } from 'react';
import MaterialSelect from './Components/MaterialSelect/MaterialSelect';
import MaterialDisplay from './Components/MaterialDisplay/MaterialDisplay';
import DishSelect from './Components/DishSelect/DishSelect';
import type {Mats} from './Components/MaterialSelect/MaterialSelect';
import { useMediaQuery } from 'react-responsive';
import './App.scss';

function App() {
  const [Ingredients, setIngredients] = useState<Mats[]>([]);

  const isMobile = useMediaQuery({ maxWidth: 799})
  const isMobileSmall = useMediaQuery({ maxWidth: 400})
  const isMobileLarge = useMediaQuery({ minWidth: 400, maxWidth: 799})
  const isTablet = useMediaQuery({ minWidth: 800, maxWidth: 1279 })
  const isLaptop = useMediaQuery({ minWidth: 1280 })

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

  function importAll(r: __WebpackModuleApi.RequireContext) {
    let images = {};
    //@ts-ignore
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
  const items = importAll(require.context('./Images/Items', false, /\.(webp|jpe?g|svg)$/));
  const icons = importAll(require.context('./Images/icons', false, /\.(webp|jpe?g|svg)$/));

  return (
    <div className={`App ${isLaptop && 'isLaptop'} ${isTablet && 'isTablet'} ${isMobile && 'isMobile'} ${isMobileSmall && 'isMobileSmall'} ${isMobileLarge && 'isMobileLarge'}` }>
      <MaterialSelect items={items} icons={icons} handleClick={handleAdd} />
      <div className="Result">
        <MaterialDisplay items={items} icons={icons} key={Ingredients} data={Ingredients} handleClick={handleRemove}/>
        <DishSelect items={items} icons={icons} data={Ingredients}/>
      </div>
      <div className="background-image"/>
    </div>
  );
}

export default App;
