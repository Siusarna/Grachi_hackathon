import {combineReducers} from "redux";
import {USER_INFORMATION_ADDED, APPROVE_PHONE, CREATE_REQUEST, CLOSE_REQUEST} from "./action";

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

const requests = (state = {}, action) => {
    switch(action.type){
        case CREATE_REQUEST:
            return {...state, requestCreation: true};
        case CLOSE_REQUEST:
            return {...state, requestCreation: false};
        default: 
            return {...state}
    }
}
export default combineReducers({
    signup, requests
});