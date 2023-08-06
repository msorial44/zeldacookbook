import React from 'react';
import './Material.scss';
import { useMediaQuery } from 'react-responsive';


function Material(props: any) {
  const isMobileSmall = useMediaQuery({ maxWidth: 399})
  const isMobileLarge = useMediaQuery({ minWidth: 400, maxWidth: 799})
  const isTablet = useMediaQuery({ minWidth: 800, maxWidth: 1279 })
  const isLaptop = useMediaQuery({ minWidth: 1280, maxWidth: 1599 })
  const isLaptopBig = useMediaQuery({ minWidth: 1600 })

  function handleClickLocal() {
    props.handleClick(props.data, props.id);
  }
  
  return (
    <div className={`Material ${isLaptop && 'isLaptop'} ${isTablet && 'isTablet'} ${isMobileSmall && 'isMobileSmall'} ${isMobileLarge && 'isMobileLarge'} ${isLaptopBig && 'isLaptopBig'}`} onClick={handleClickLocal}>
      <img src={props.image} alt="Icon"></img>
      {props.data["Cooking Effect"] !== "None" && <img className={`effect-icon ${props.data["Cooking Effect"] === 'LifeMaxUp' ? 'life-up' : ''} ${props.data["Cooking Effect"] === 'StaminaUp' ? 'stamina-up' : ''}`} src={props.effect} alt=""></img>}
    </div>
  );
}
  
  export default Material;