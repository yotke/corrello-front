import { userService } from '../services/user.service.js'


const initialState = {
    user: userService.getLoggedinUser(),
    users: [],
    loginErr: null,
    watchedUser: null,
    onlineUsers: [],

}
export function userReducer(state = initialState, action) {
    var newState = state;
    switch (action.type) {
        case 'SET_ONLINE_USERS':
            newState = { ...state, onlineUsers: [...action.onlineUsers] }
            break;
        case 'LOGIN_ERR':
            newState = { ...state, loginErr: action.err }
            break;
        case 'SET_USER':
            newState = { ...state, user: action.user ,  loginErr: null }
            break;
        case 'SET_WATCHED_USER':
            newState = { ...state, watchedUser: action.user }
            break;
        case 'REMOVE_USER':
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break;
        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break;

        default:
    }
    // For debug:
    window.userState = newState;
    console.log('State:', newState);
    return newState;

}
