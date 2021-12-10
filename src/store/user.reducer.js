import { userService } from '../services/user.service.js';

const initialState = {
    loggedInUser: userService.getLoggedinUser(),
    loginErr: null,
    watchedUser: null,
    onlineUsers: [],
};
export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, loggedInUser: action.user, loginErr: null }
        case 'SET_ONLINE_USERS':
            return { ...state, onlineUsers: [...action.onlineUsers] };
        case 'LOGIN_ERR':
            return { ...state, loginErr: action.err };
        default:
            return state;
    }
}
