import { GET_COMPONENT_LIST, LOADING_PAGE, ADD_COMPONENT, MODIFY_COMPONENT } from "../actions/types"

const initialState = {
    list: {
        components: []
    },
    structure: [
      
    ]
};

const updatedStructure = (structure: any[], component: any) => {
  return structure.map( (cp: any) => {
    if(cp.id === component.id){
      return component;
    } else {
      return cp;
    }
  });
};

export default function(state = initialState, action: any) {
  switch (action.type) {
    case GET_COMPONENT_LIST:
      return {
        ...state,
        list: action.payload,
        loading: false
      };
    case LOADING_PAGE:
      return {
        ...state,
        loading: true
      };
    case ADD_COMPONENT:
      return {
        ...state,
        structure: [
          ...state.structure,
          action.payload
        ]
      };
    case MODIFY_COMPONENT:
      return {
        ...state,
        structure: updatedStructure(state.structure, action.payload)
      };
    default:
      return state;
  }
}