import React from 'react';
import materials from '../../data/materials.json';
import Material from '../Material/Material';
import './MaterialSelect.scss';

export type Mats = typeof materials[0];

function MaterialSelect(props: any) {
  const materialList = materials.map((material) => {
    return <Material key={material['Inventory Order (By type)']} data={material} {...props}/>
  });

  return (
    <div className="MaterialSelect">
      {materialList}
    </div>
  );
}

export default MaterialSelect;
