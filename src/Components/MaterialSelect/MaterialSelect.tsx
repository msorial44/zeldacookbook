import React from 'react';
import materials from '../../data/materials.json';
import {lazy, Suspense} from 'react';
import { Input } from 'antd';
import { useState } from 'react';
import './MaterialSelect.scss';

const Material = lazy(() => import('../Material/Material'));

export type Mats = typeof materials[0];

function MaterialSelect(props: any) {
  const [materialList, setMaterialList] = useState(materials);

  const filteredMaterialList = materialList.map((material) => {
    return (
      <Suspense>
      {/* @ts-ignore */}
      <Material effect={props.icons[material["Cooking Effect"] + ".svg"]} image={props.items[material['Inventory Icon'].split("Items/")[1]]} key={material['Inventory Order (By type)']} data={material} {...props}/>
      </Suspense>
      );
  });

  const onChange = (e: any) => {
    setMaterialList(materials.filter((material: Mats) => material["Name"].toLowerCase().includes(e.target.value.toLowerCase())));
  }

  return (
    <div className="MaterialSelect">
      <Input placeholder="Search Materials..." onChange={onChange} size='large' bordered={false}/>
      <div className='MaterialList'>
        {filteredMaterialList}
      </div>
    </div>
  );
}

export default MaterialSelect;
