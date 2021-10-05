import { boardService } from "../services/board.service.js";
import { userService } from "../services/user.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { socketService } from "../services/socket.service.js";

export function loadBoards() {
    return (dispatch) => {
        boardService.query()
            .then(boards => {
                console.log('Boards from DB:', boards)
                dispatch({
                    type: 'SET_BOARDS',
                    boards
                })
            })
            .catch(err => {
                showErrorMsg('Cannot load boards')
                console.log('Cannot load boards', err)
            })

        boardService.subscribe((boards) => {
            console.log('Got notified');
            dispatch({
                type: 'SET_BOARDS',
                boards
            })
        })
    }
}


export function loadRecentBoards() {
    return (dispatch) => {
        boardService.queryRecentBoards()
            .then(recentBoards => {
                console.log('Recent Boards from DB:', recentBoards)
                dispatch({
                    type: 'SET_RECENT_BOARDS',
                    recentBoards
                })
            })
            .catch(err => {
                showErrorMsg('Cannot load boards')
                console.log('Cannot load boards', err)
            })

        boardService.subscribe((recentBoards) => {
            console.log('Got notified');
            dispatch({
                type: 'SET_RECENT_BOARDS',
                recentBoards
            })
        })
    }
}
export function onSaveBoard(board) {
    return async dispatch => {
        try {
            socketService.emit('SOCKET_EVENT_ON_BOARD_SAVED', board._id)
            const savedBoard = await boardService.save(board)
            dispatch({ type: 'SAVE_BOARD', board: savedBoard })
        } catch (err) {
            console.log('BoardActions: err in onSaveBoard', err)
        }
    }
}

export function loadBoard(boardId) {
    return async dispatch => {
        try {
            const board = await boardService.getById(boardId)
            console.log('board from get id', board)
            dispatch({
                type: 'SET_BOARD',
                board
            })
        } catch (err) {
            console.log('BoardActions: err in loadBoard', err)
        }
    }
}

export function updateRecentBoard(boardId) {
    return async dispatch => {
        try {
            let board = await boardService.getById(boardId)
            board = await boardService.saveRecentBoards(board)
            dispatch({
                type: 'UPDATE_RECENT_BOARDS',
                board
            })
        } catch (err) {
            console.log('BoardActions: err in loadBoard', err)
        }
    }
}
export function onRemoveBoard(boardId) {
    return (dispatch, getState) => {
        boardService.remove(boardId)
            .then(() => {
                console.log('Deleted Succesfully!');
                dispatch({
                    type: 'REMOVE_BOARD',
                    boardId
                })
                showSuccessMsg('Board removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove board')
                console.log('Cannot remove board', err)
            })
    }
}

export function onAddBoard() {
    return (dispatch) => {
        const board = boardService.getEmptyBoard();
        boardService.save(board)
            .then(savedBoard => {
                console.log('Added Board', savedBoard);
                dispatch({
                    type: 'ADD_BOARD',
                    board: savedBoard
                })
                showSuccessMsg('Board added')
            })
            .catch(err => {
                showErrorMsg('Cannot add board')
                console.log('Cannot add board', err)
            })
    }
}

export function onEditBoard(boardToSave) {
    return (dispatch) => {
        boardService.save(boardToSave)
            .then(savedBoard => {
                console.log('Updated Board:', savedBoard);
                dispatch({
                    type: 'UPDATE_BOARD',
                    board: savedBoard
                })
                showSuccessMsg('Board updated')
            })
            .catch(err => {
                showErrorMsg('Cannot update board')
                console.log('Cannot save board', err)
            })
    }
}

export function addToCart(board) {
    return (dispatch) => {
        dispatch({
            type: 'ADD_TO_CART',
            board
        })
    }
}
export function removeFromCart(boardId) {
    return (dispatch) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            boardId
        })
    }
}

export function togglePreviewLabels() {
    return dispatch => {
        dispatch({ type: 'TOGGLE_LABELS' })
    }
}
export function setPreviewLabelClassName(className) {
    return dispatch => {
        dispatch({ type: 'SET_LABELS_CLASSNAME', className })
    }
}

// Demo for Optimistic Mutation (IOW - Assuming the server call will work, so updating the UI first)
export function onRemoveBoardOptimistic(boardId) {

    return (dispatch, getState) => {

        dispatch({
            type: 'REMOVE_BOARD',
            boardId
        })
        showSuccessMsg('Board removed')

        boardService.remove(boardId)
            .then(() => {
                console.log('Server Reported - Deleted Succesfully');
            })
            .catch(err => {
                showErrorMsg('Cannot remove board')
                console.log('Cannot load boards', err)
                dispatch({
                    type: 'UNDO_REMOVE_BOARD',
                })
            })
    }
}