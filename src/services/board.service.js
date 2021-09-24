
import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import data from '../json/board.json'
import { useLocation } from 'react-router'
import testUtils from 'react-dom/test-utils'

const STORAGE_KEY = 'boardDB'
const listeners = []
const DATA = data;

export const boardService = {
    query,
    getById,
    save,
    remove,
    subscribe,
    removeCard,
    getEmptyBoard

}
window.cs = boardService;
_saveToLocalStorage();


//save inital data (board) to local storage
function _saveToLocalStorage() {
    console.log('DATA FROM STORAGAE', JSON.stringify(DATA))

    query().then((respone) => {
        (respone.length) ? query() : storageService.post(STORAGE_KEY, DATA);
    })
}


function query() {
    return storageService.query(STORAGE_KEY)
}
function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}
function remove(boardId) {
    // return new Promise((resolve, reject) => {
    //     setTimeout(reject, 2000)
    // })
    // return Promise.reject('Not now!');
    return storageService.remove(STORAGE_KEY, boardId)
}
function save(board) {
    if (board._id) {
        return storageService.put(STORAGE_KEY, board)
    } else {
        board.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, board)
    }
}

// function getEmptyBoard() {
//     return {
//         vendor: 'Susita-' + (Date.now() % 1000),
//         price: utilService.getRandomIntInclusive(1000, 9000),
//     }
// }

function subscribe(listener) {
    listeners.push(listener)
}

function _notifySubscribersBoardsChanged(boards) {
    console.log('Notifying Listeners');
    listeners.forEach(listener => listener(boards))
}

window.addEventListener('storage', () => {
    console.log('Storage Changed from another Browser!');
    query()
        .then(boards => {
            _notifySubscribersBoardsChanged(boards)
        })
})

// TEST DATA
// storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))




export function updateCardInBoard(board, updatedCard) {
    board.lists.forEach(list => {
        list.cards.forEach((card, idx) => {
            if (card.id === updatedCard.id) list.cards[idx] = updatedCard
        })
    })
    return { ...board }
}

function removeCard(board, card) {
    board.lists.forEach(list => {
        if (list.cards.some(boardCard => boardCard.id === card.id))
            list.cards = list.cards.filter(boardCard => boardCard.id !== card.id)
    })
    return { ...board }
}


function getEmptyBoard() {
    const board = {
        _id: utilService.makeId(),
        name:'yoyo',
        imgUrl: '',
        list: []

    }
    return board;
}