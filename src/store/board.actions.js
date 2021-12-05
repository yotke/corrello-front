import { boardService } from '../services/board.service.js';
import { userService } from '../services/user.service.js';
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js';
import { socketService } from '../services/socket.service.js';
import { giphyService } from '../services/giphy.service.js';

export function loadBoards() {
    return async (dispatch) => {
        try {
            const boards = await boardService.query();
            dispatch({
                type: 'SET_BOARDS',
                boards,
            });
        } catch (err) { }
    };
}

export function loadRecentBoards() {
    return async (dispatch) => {
        try {
            const recentBoards = await boardService.queryRecentBoards();
            dispatch({
                type: 'SET_RECENT_BOARDS',
                recentBoards,
            });
        } catch (err) { }
    };
}
export function onSaveBoard(board) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.save(board);
            dispatch({ type: 'SAVE_BOARD', board: savedBoard });
            socketService.emit('SOCKET_EVENT_ON_BOARD_SAVED', board._id);
        } catch (err) { }
    };
}

export function onSaveStickers(stickers) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SAVE_STICKERS', stickers: stickers });
        } catch (err) { }
    };
}

export function loadBoard(boardId) {
    return async (dispatch) => {
        try {
            const board = await boardService.getById(boardId);
            dispatch({
                type: 'SET_BOARD',
                board,
            });
        } catch (err) {
            console.log('BoardActions: err in loadBoard', err);
        }
    };
}

export function setLabelsMode(labelsMode) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_LABELS_MODE', labelsMode });
        } catch (err) {
            console.log('BoardActions: err in loadBoard', err);
        }
    };
}

export function updateRecentBoard(boardId) {
    return async (dispatch) => {
        try {
            let board = await boardService.getById(boardId);
            board = await boardService.saveRecentBoards(board);
            dispatch({
                type: 'UPDATE_RECENT_BOARDS',
                board,
            });
        } catch (err) {
            console.log('BoardActions: err in loadBoard', err);
        }
    };
}
export function onRemoveBoard(boardId) {
    return async (dispatch) => {
        try {
            const boardId = boardService.remove(boardId);

            dispatch({
                type: 'REMOVE_BOARD',
                boardId,
            });
        } catch (err) {
            console.log('Cannot remove board', err);
        }
    };
}

export function onAddBoard() {
    return async (dispatch) => {
        try {
            const board = boardService.getEmptyBoard();

            const savedBoard = await boardService.save(board);
            dispatch({
                type: 'ADD_BOARD',
                board: savedBoard,
            });
        } catch (err) {
            console.log('Cannot add board', err);
        }
    };
}

export function onEditBoard(boardToSave) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.save(boardToSave);
            socketService.emit('SOCKET_EVENT_ON_BOARD_SAVED', savedBoard._id);
            dispatch({
                type: 'UPDATE_BOARD',
                board: savedBoard,
            });
        } catch (err) {
            console.log('Cannot save board', err);
        }
    };
}

// export function setFilterBy(filterBy) {
//     return dispatch => {
//         dispatch({ type: 'SET_FILTER_BY', filterBy })
//     }
// }

// export function loadStickers() {
//     return async (dispatch, getState) => {
//         try {
//             dispatch({ type: 'SET_STICKERS', stickers })
//         } catch (err) {
//             console.log(err);
//         }
//     }
// }
