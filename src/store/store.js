import {createStore} from "redux";


const defaultState = {
    email: '',
    name: '',
}


const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_EMAIL':
            return {...state, email: action.payload}
        case "SET_NAME":
            return {...state, name: action.payload}
        default:
            return state
    }
}

const store = createStore(reducer);

export default store;