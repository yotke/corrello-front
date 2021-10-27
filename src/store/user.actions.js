import { userService } from "../services/user.service.js";
import { showErrorMsg } from '../services/event-bus.service.js'
import { socketService, SOCKET_EMIT_USER_WATCH, SOCKET_EVENT_USER_UPDATED } from "../services/socket.service.js";

export function loadUsers() {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users })
        } catch (err) {
            console.log('UserActions: err in loadUsers', err)
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function removeUser(userId) {
    return async dispatch => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
        } catch (err) {
            console.log('UserActions: err in removeUser', err)
        }
    }
}

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
            socketService.emit('user-watch', user._id)
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
            await userService.logout(user)
            dispatch({ type: 'SET_USER', user: null })
        } catch (err) {
            console.log('UserActions: err in logout', err)
        }
    }
}
// export function onLogout() {
//     return  async dispatch => {
//         userService.logout()
//             .then(() => dispatch({
//                 type: 'SET_USER',
//                 user: null
//             }))
//             .catch(err => {
//                 console.log('Cannot logout', err)
//             })
//     }
// }

export function loadAndWatchUser(userId) {
    return async (dispatch) => {
        try {
            debugger
            const user = await userService.getById(userId);
            dispatch({ type: 'SET_WATCHED_USER', user })
            socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
            socketService.off(SOCKET_EVENT_USER_UPDATED)
            socketService.on(SOCKET_EVENT_USER_UPDATED, user => {
                console.log('USER UPADTED FROM SOCKET');
                dispatch({ type: 'SET_WATCHED_USER', user })
            })
        } catch (err) {
            showErrorMsg('Cannot load user')
            console.log('Cannot load user', err)
        }
    }
}

