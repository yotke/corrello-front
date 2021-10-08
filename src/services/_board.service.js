
import { storageService } from './async-storage.service.js'
// import { utilService } from './util.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import data from '../json/board.json'
import { useLocation } from 'react-router'
import testUtils from 'react-dom/test-utils'

const STORAGE_KEY = 'boardDB'
const RECEBT_BOARDS_KEY = 'recentBoardsDB'
const listeners = []
const DATA = data;

export const boardService = {
    query,
    queryRecentBoards,
    saveRecentBoards,
    getById,
    save,
    remove,
    subscribe,
    removeCard,
    getEmptyBoard,
    updateCardInBoard,
    addCardToBoard,
    updateListInBoard,
    setPopoverPos
}
window.cs = boardService;
_saveToLocalStorage();


// save inital data(board) to local storage
// todo
function _saveToLocalStorage() {

    query().then((respone) => {
        if (!respone.length) storageService.postMany(STORAGE_KEY, DATA)
    })
}


function query() {
    return storageService.query(STORAGE_KEY)
}

function queryRecentBoards() {
    return storageService.query(RECEBT_BOARDS_KEY)
}

async function saveRecentBoards(board) {
    const getBoard = await getByIdRecentBoards(board._id)
    if (getBoard) {
        return
    }
    else {
        //board.owner = userService.getLoggedinUser()
        return storageService.post(RECEBT_BOARDS_KEY, board)
    }
}

function getByIdRecentBoards(boardId) {
    return storageService.get(RECEBT_BOARDS_KEY, boardId)
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
        //board.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, { _id: utilService.makeId(), ...board })
    }
}

function subscribe(listener) {
    listeners.push(listener)
}


function _notifySubscribersBoardsChanged(boards) {
    listeners.forEach(listener => listener(boards))
}

window.addEventListener('storage', () => {
    query()
        .then(boards => {
            _notifySubscribersBoardsChanged(boards)
        })
})

// TEST DATA

function updateCardInBoard(board, updateCard) {
    board = { ...board }

    board.lists.forEach(list => {
        list.cards.forEach((card, idx) => {
            if (card.id === updateCard.id) list.cards[idx] = updateCard
        })
    })
    return board
}

function addCardToBoard(board, listId, addCard) {

    board = { ...board }

    const listIdx = board.lists.findIndex(currList => currList.id === listId);

    if (listIdx === -1) return { ...board }
    else board.lists[listIdx].cards.push({ ...addCard })

    return board
}

function updateListInBoard(board, updateList) {
    board = { ...board }

    board.lists.forEach((list, idx) => {
        if (list.id === updateList.id) board.lists[idx] = updateList
    })

    return board
}

function removeCard(board, card) {
    board = { ...board }

    board.lists.forEach(list => {
        if (list.cards.some(boardCard => boardCard.id === card.id))
            list.cards = list.cards.filter(boardCard => boardCard.id !== card.id)
    })
    return board
}


function setPopoverPos(pos, elRect, diff = 38) {
    let { left, top } = pos
    top += diff
    const { height, width } = elRect
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    if (left + width > viewportWidth) left = viewportWidth - width - 10
    if (top + height > viewportHeight) top = viewportHeight - height - 10
    return { left, top, width }
}


function getEmptyBoard() {
    const board = {
        title: "",
        createdAt: Date.now(),
        createdBy: {
            _id: "",
            fullname: "",
            imgUrl: ""
        },
        style: {},
        labels: [
        ],
        members: [

        ],
        lists: [
        ],
        activities: [
        ]
    }



    return board;
}
