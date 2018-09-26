import * as React from 'react';
import FreeHTML from '../components/FreeHTML/FreeHTML';
import ItemTypes from '../ItemTypes/ItemTypes';

export const getComponentByType = (type: string) => {
  switch(type){
    case ItemTypes.BOX:
      return <div>Hola</div>;
    case ItemTypes.FREEHTML:
      return <FreeHTML />
    default:
      return;
  };
};