import {combineReducers} from "redux";
import {USER_INFORMATION_ADDED, APPROVE_PHONE} from "./action";

const signup = (state = {firstName: "", fatherName: "", phones: "", password: ""},action) =>{
    switch(action.type){
        case USER_INFORMATION_ADDED:
            return {...action.payload};
        case APPROVE_PHONE:
            return {...state, phoneApprove: true};
        default: 
            return {...state}
    }
}
export default combineReducers({
    signup
});