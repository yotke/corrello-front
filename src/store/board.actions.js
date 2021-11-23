import { boardService } from "../services/board.service.js";
import { userService } from "../services/user.service.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { socketService } from "../services/socket.service.js";
import { giphyService } from "../services/giphy.service.js";




export function loadBoards() {
    return (dispatch) => {
        boardService.query()
            .then(boards => {
                dispatch({
                    type: 'SET_BOARDS',
                    boards
                })
            })
            .catch(err => {
                showErrorMsg('Cannot load boards')
            })

        boardService.subscribe((boards) => {
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
                dispatch({
                    type: 'SET_RECENT_BOARDS',
                    recentBoards
                })
            })
            .catch(err => {
                showErrorMsg('Cannot load boards')
            })

        boardService.subscribe((recentBoards) => {
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
            const savedBoard = await boardService.save(board)
            dispatch({ type: 'SAVE_BOARD', board: savedBoard })
            socketService.emit('SOCKET_EVENT_ON_BOARD_SAVED', board._id)
        } catch (err) {
        }
    }
}

export function onSaveStickers(stickers) {
    return async dispatch => {
        try {
            dispatch({ type: 'SAVE_STICKERS', stickers: stickers })
        } catch (err) {
        }
    }
}

export function loadBoard(boardId) {
    return async dispatch => {
        try {
            const board = await boardService.getById(boardId)
            dispatch({
                type: 'SET_BOARD',
                board
            })
        } catch (err) {
            console.log('BoardActions: err in loadBoard', err)
        }
    }
}




export function setLabelsMode(labelsMode) {

    return async dispatch => {
        try {
            dispatch({ type: 'SET_LABELS_MODE', labelsMode })
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
                socketService.emit('SOCKET_EVENT_ON_BOARD_SAVED', savedBoard._id)
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

// export function setFilterBy(filterBy) {
//     return dispatch => {
//         dispatch({ type: 'SET_FILTER_BY', filterBy })
//     }
// }


// export function loadStickers() {
//     return async (dispatch, getState) => {
//         const { filterBy } = getState().boardModule
//         try {
//             const stickers = await giphyService.searchGiphys(filterBy)
//             dispatch({ type: 'SET_STICKERS', stickers })
//         } catch (err) {
//             console.log(err);
//         }
//     }
// }