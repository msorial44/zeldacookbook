import React from 'react';
import { lazy } from 'react';
import materials from '../../data/materials.json';
import { Input } from 'antd';
import { useState } from 'react';
import './MaterialSelect.scss';

const Material = lazy(() => import('../Material/Material'));


export type Mats = typeof materials[0];

function MaterialSelect(props: any) {
  const [materialList, setMaterialList] = useState(materials);

  const filteredMaterialList = materialList.map((material) => {
    return <Material key={material['Inventory Order (By type)']} data={material} {...props}/>
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
