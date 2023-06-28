import React from 'react';
import './Material.scss';
import type { Mats } from '../../App';


function Material(props: any) {
    function handleClickLocal() {
      props.handleClick(props.data, props.id);
    }

    return (
      <div className="Material" onClick={handleClickLocal}>
        <img src={process.env.PUBLIC_URL + props.data["Inventory Icon"] } alt="Icon"></img>
      </div>
    );
  }
  
  export default Material;