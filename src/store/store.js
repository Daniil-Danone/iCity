import {createStore} from "redux";


const defaultState = {
    user: {},
    isLogin: false,
    currentMark: null,
    isEditingMark: false,
    api: 'http://127.0.0.1:8000/'
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {...state, user: action.payload}
        case "SET_ISLOGIN":
            return {...state, isLogin: action.payload}
        case "SET_CURRENTMARK":
            return {...state, currentMark: action.payload}
        case "SET_ISEDITINGMARK":
            return {...state, isEditingMark: action.payload}
        default:
            return state
    }
}

const store = createStore(reducer);

export default store;
