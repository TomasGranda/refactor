import axios from "axios";

import {
    GET_COMPONENT_LIST,
    ADD_COMPONENT,
    MODIFY_COMPONENT,
    GET_ERRORS
} from "./types";

import store from "../store"

import findInside from "../utils/findInside";

export const getComponentRender = async (componentType: string) => {
    // dispatch(setPageLoading());
    try {
        const response = await axios.post(`/private-api/render/${componentType}`)
        return response.data
    } catch (e) {
        console.log(e)
        return e
    }
};

export const getComponentWidgetProps = async (componentType: string, id: string) => {
    // dispatch(setPageLoading());
    try {
        const response = await axios.get(`/private-api/composer/propertyWidgets/${componentType}?id=${id}`)
        return response.data
    } catch (e) {
        console.log(e)
        return e
    }
};

export const getComponentList = () => (dispatch: any) => {
    // dispatch(setPageLoading());

    axios
        .get(`/private-api/composer/list`)
        .then(res => {
            dispatch({
                type: GET_COMPONENT_LIST,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
};

export const addComponent = (component: any, stackId: number) => (dispatch: any) => {
    let modify = false;
    let stack: any = {};
    const structure = store.getState().page.structure;
    if (!stackId) {
        component.id = structure.length + 1;
    } else {
        /*stack = structure.find((x: any) => {
            return x.id === stackId;
        });*/
        stack = findInside(structure, { id: stackId });
        console.log(stack)
        component.id = stack.children.length + 1;
        stack.children = [
            ...stack.children,
            component
        ];
        console.log(stack)
        modify = true;
    }

    if (component.type === "stack") {
        component.children = [];
    }
    component.id += (stackId / 10);
    if (modify) {
        dispatch({
            type: MODIFY_COMPONENT,
            payload: component
        });
    } else {
        dispatch({
            type: ADD_COMPONENT,
            payload: component
        });
    }
};