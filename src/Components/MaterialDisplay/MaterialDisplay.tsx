import React from 'react';
import type { Mats } from '../MaterialSelect/MaterialSelect';
import Material from '../Material/Material';
import "./MaterialDisplay.scss";


function MaterialDisplay(props: any) {
    const materiaDisplay = props.data.map((x: Mats, pos: number, self: Mats[]) => {
        /* @ts-ignore */
        return <Material effect={props.icons[x["Cooking Effect"] + ".svg"]} image={props.items[x['Inventory Icon'].split("Items/")[1]]} key={pos} id={pos} data={x} handleClick={props.handleClick}/>
    });

    return (
        <div className="MaterialDisplay">
            {materiaDisplay}
        </div>
    )
}
export default MaterialDisplay;