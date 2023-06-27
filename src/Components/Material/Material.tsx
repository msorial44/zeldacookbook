import React from 'react';
import './Material.scss';
import type { Mats } from '../../App';


function Material(props: {data: Mats, handleClick: (mats: Mats) => void}) {
    function handleClickLocal() {
      props.handleClick(props.data);
    }

    return (
      <div className="Material" onClick={handleClickLocal}>
        <img src={props.data["Inventory Icon"] } alt="Icon"></img>
      </div>
    );
  }
  
  export default Material;