import { combineReducers } from "redux"; // rootReducer에서 하나로 합쳐준다.
import user from "./user_reducer";

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
