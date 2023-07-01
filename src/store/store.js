import {createStore} from "redux";


const defaultState = {
    user: {},
    isLogin: false,
    api: 'http://127.0.0.1:8000/'
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {...state, user: action.payload}
        case "SET_ISLOGIN":
            return {...state, isLogin: action.payload}
        default:
            return state
    }
}

const store = createStore(reducer);

export default store;
