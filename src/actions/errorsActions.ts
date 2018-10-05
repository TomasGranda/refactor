import {
    GET_ERRORS
} from "./types";

export const getErrors = (err: any) => (dispatch: any) => {
    dispatch({
        type: GET_ERRORS,
        payload: err
    });
};