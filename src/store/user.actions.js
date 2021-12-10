import { userService } from "../services/user.service.js";
import { showErrorMsg } from '../services/event-bus.service.js'
import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from "../services/socket.service.js";


export function onGoogleLogin(tokenId) {
    return async dispatch => {
        try {
            const user = await userService.googleLogin(tokenId)
            dispatch({ type: 'SET_USER', user })
            socketService.emit('user-watch', user._id)
        } catch (err) {
            console.log('UserActions: err in login', err)
        }
    }
}

export function onLogin(credentials = { username: 'koren', password: '1234' }) {
    return async dispatch => {
        try {
            const user = await userService.login(credentials)
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('UserActions: err in login', err)
        }
    }
}

export function onSignup(userInfo) {
    return async dispatch => {
        try {
            const user = await userService.signup(userInfo)
            dispatch({ type: 'SET_USER', user })
        } catch (err) {
            console.log('UserActions: err in signup', err)
        }
    }
}

export function onLogout(user) {
    return async dispatch => {
        try {
            socketService.emit('user endSession', user._id)
            await userService.logout(user)
            // dispatch({ type: 'UPDATE_ONLINE_USERS', userId })
            dispatch({ type: 'SET_USER', user: null })
        } catch (err) {
            console.log('UserActions: err in logout', err)
        }
    }
}

export function updateOnlineUsers(onlineUsers) {
    return async dispatch => {
        try {
            dispatch({ type: 'SET_ONLINE_USERS', onlineUsers })
        } catch (err) {
            console.log('UserActions: err in login', err)
        }
    }
}
