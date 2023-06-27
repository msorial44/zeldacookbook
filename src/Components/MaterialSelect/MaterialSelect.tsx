import React from 'react';
import materials from '../../data/materials.json';
import Material from '../Material/Material';
import './MaterialSelect.scss';

function MaterialSelect(props: any) {
  const materialList = materials.map((material) => {
    return <Material data={material} {...props}/>
  });

  return (
    <div className="MaterialSelect">
      {materialList}
    </div>
  );
}

export default MaterialSelect;
