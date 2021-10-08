import { socketService } from "./socket.service";
import { userService } from './user.service.js'
import { utilService } from './util.service.js'

export const activityService = {
    addActivityToBoard
}


export function addActivityToBoard(board, activityType, txt, card) {
    const savedActivity = createActivity(activityType, txt, card)
    socketService.emit('SOCKET_EVENT_ON_NEW_ACTIVITY', savedActivity)
    board.activities.unshift(savedActivity)
    return board
}

export function createActivity(activityType, txt = '', card = null) {
    // debugger
    const loggedInUser = userService.getLoggedinUser();

    let byMember
    if (loggedInUser) {
        byMember = {
            id: loggedInUser._id,
            fullname: loggedInUser.fullname,
            imgUrl: loggedInUser.imgUrl
        }
    } else {
        byMember = {
            id: 'guest',
            fullname: 'guest',
            imgUrl: ''
        }
    }


    let cardData
    if (card) {
        cardData = {
            id: card.id,
            title: card.title,
            members: card.members
        }
    }

    const activityToCreate = {
        id: utilService.makeId(),
        txt,
        createdAt: Date.now(),
        byMember,
        activityType,
        card: cardData || null
    }

    return activityToCreate
}