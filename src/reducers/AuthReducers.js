import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILD, REGISTER_FAILD, REGISTER_SUCCESS, REGISTER_START } from '../actions/types';

const INITIAL_STATE = {
    loading: false,
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_START:
            return { ...state, loading: true };
        case LOGIN_SUCCESS:
            return { ...state, loading: false };
        case LOGIN_FAILD:
            return { ...state, loading: false };
        case REGISTER_START:
            return { ...state, loading: true };
        case REGISTER_SUCCESS:
            return { ...state, loading: false };
        case REGISTER_FAILD:
            return { ...state, loading: false };
        default:
            return state;
    }
};