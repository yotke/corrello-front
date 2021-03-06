import { socketService } from "./socket.service";
import { userService } from './user.service.js'
import { utilService } from './util.service.js'

export const activityService = {
    addActivityToBoard,
    createActivity
}

export function addActivityToBoard(board, activityType, subject, card) {
    const savedActivity = createActivity(activityType, subject, card)
    socketService.emit('SOCKET_EVENT_ON_NEW_ACTIVITY', savedActivity)
    board.activities.unshift(savedActivity)
    return board
}

export function createActivity(activityType, subject = '', card = null) {

    const loggedInUser = userService.getLoggedinUser();

    let byMember
    if (loggedInUser) {
        const { _id, fullname, imgUrl } = loggedInUser;
        byMember = {
            id: _id,
            fullname,
            imgUrl
        }
    } else {
        byMember = {
            id: 'guest',
            fullname: 'guest',
            imgUrl: ''
        }
    }

    let cardData = null;
    if (card) {
        cardData = {
            id: card.id,
            title: card.title,
            members: card.members
        }
    }

    const activityToCreate = {
        id: utilService.makeId(),
        subject,
        createdAt: Date.now(),
        byMember,
        activityType,
        card: cardData
    }

    return activityToCreate
}