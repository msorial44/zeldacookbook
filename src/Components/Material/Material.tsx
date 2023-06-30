import React from 'react';
import './Material.scss';
import type { Mats } from '../MaterialSelect/MaterialSelect';


function Material(props: any) {
    function handleClickLocal() {
      props.handleClick(props.data, props.id);
    }

    return (
      <div className="Material" onClick={handleClickLocal}>
        <img src={process.env.PUBLIC_URL + props.data["Inventory Icon"] } alt="Icon"></img>
        {props.data["Cooking Effect"] !== "None" && <img className={`effect-icon ${props.data["Cooking Effect"] === 'LifeMaxUp' ? 'life-up' : ''} ${props.data["Cooking Effect"] === 'StaminaUp' ? 'stamina-up' : ''}`} src={process.env.PUBLIC_URL + "/Images/icons/" + props.data["Cooking Effect"] + ".svg" } alt=""></img>}
      </div>
    );
  }
  
  export default Material;