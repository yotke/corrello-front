import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
var gWatchedUser = null;

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    getById,
    remove,
    update,
    googleLogin,
}

window.userService = userService

async function getUsers() {
    try {
        return await httpService.get('user')
    } catch (err) {
        throw err
    }
}

// function getUsers() {
//     return storageService.query('user')
//     // return httpService.get(`user`)
// }

async function getById(userId) {
    try {
        return await httpService.get(`board/${userId}`)
    } catch (err) {
        throw err
    }
}

// async function getById(userId) {
//     const user = await storageService.get('user', userId)
//     // const user = await httpService.get(`user/${userId}`)
//     gWatchedUser = user;
//     return user;
// }

async function remove(userId) {
    try {
        return await httpService.delete(`user/${userId}`)
    } catch (err) {
        throw err
    }
}

// function remove(userId) {
//     return storageService.remove('user', userId)
//     // return httpService.delete(`user/${userId}`)
// }

async function update(user) {
    if (user._id) {
        try {
            return await httpService.put(`user/${user._id}`, user)
        } catch (err) {
            throw err
        }
    }
}


async function login(userCred) {

    const user = await httpService.post('auth/login', userCred)
    socketService.emit('set-user-socket', user._id);
    if (user) return _saveLocalUser(user)
}

async function signup(userCred) {
    const user = await httpService.post('auth/signup', userCred)
    socketService.emit('set-user-socket', user._id);
    return _saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    socketService.emit('unset-user-socket');
    return await httpService.post('auth/logout')
}



async function googleLogin(tokenId) {
    try {
        console.log('tokenid', tokenId)
        const user = await httpService.post('auth/googlelogin', { tokenId })
        if (user) return _saveLocalUser(user)
    } catch (err) {
        throw err
    }
}

function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}


// This IIFE functions for Dev purposes 
// It allows testing of real time updates (such as sockets) by listening to storage events
(async () => {
    var user = getLoggedinUser()
    // Dev Helper: Listens to when localStorage changes in OTHER browser

    // Here we are listening to changes for the watched user (comming from other browsers)
    window.addEventListener('storage', async () => {
        if (!gWatchedUser) return;
        const freshUsers = await storageService.query('user')
        const watchedUser = freshUsers.find(u => u._id === gWatchedUser._id)
        if (!watchedUser) return;
        if (gWatchedUser.score !== watchedUser.score) {
            //console.log('Watched user score changed - localStorage updated from another browser')
            socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedUser)
        }
        gWatchedUser = watchedUser
    })
})();

// This is relevant when backend is connected
(async () => {
    var user = getLoggedinUser()
    if (user) socketService.emit('set-user-socket', user._id)
})();

