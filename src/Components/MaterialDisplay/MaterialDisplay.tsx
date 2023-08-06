import React from 'react';
import { lazy, Suspense } from 'react';
import type { Mats } from '../MaterialSelect/MaterialSelect';
import "./MaterialDisplay.scss";

const Material = lazy(() => import('../Material/Material'));


function MaterialDisplay(props: any) {
    const materiaDisplay = props.data.map((x: Mats, pos: number, self: Mats[]) => {
        /* @ts-ignore */
        return (
            <Suspense>
                <Material effect={props.icons[x["Cooking Effect"] + ".svg"]} image={props.items[x['Inventory Icon'].split("Items/")[1]]} key={pos} id={pos} data={x} handleClick={props.handleClick}/>
            </Suspense>
        )
    });

    return (
        <div className="MaterialDisplay">
            {materiaDisplay}
        </div>
    )
}
export default MaterialDisplay;