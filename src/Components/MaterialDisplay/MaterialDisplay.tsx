import React from 'react';
import type { Mats } from '../../App';
import Material from '../Material/Material';
import "./MaterialDisplay.scss";


function MaterialDisplay(props: any) {
    const materiaDisplay = props.data.map((x: Mats) => {
        console.log(x);
        return <Material data={x} handleClick={props.handleClick}/>
    });

    return (
        <div className="MaterialDisplay">
            {materiaDisplay}
        </div>
    )
}
export default MaterialDisplay;