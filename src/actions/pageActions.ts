import axios from "axios";

import {
    GET_COMPONENT_LIST,
    LOADING_PAGE,
    GET_ERRORS
} from "./types";

export const getComponentList = () => (dispatch: any) => {
    dispatch(setPageLoading());

    axios
        .get("/private-api/composer/list")
        .then( res => {
            dispatch({
                type: GET_COMPONENT_LIST,
                payload: res.data
            });
        })
        .catch( (err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
        });
};

export const setPageLoading = () => {
    return {
        type: LOADING_PAGE
    };
};