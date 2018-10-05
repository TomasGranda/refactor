import { combineReducers } from "redux";

import errorsReducer from "./errorsReducer";
import pageReducer from "./pageReducer";

export default combineReducers({
    errors: errorsReducer,
    page: pageReducer
});