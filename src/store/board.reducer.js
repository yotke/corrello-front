
const initialState = {
    boards: [],
    board: null,
    filterBy: 'random',
    recentBoards: [],
    lastRemoveBoard: null,
    isLabelesOpend: false,


}
export function boardReducer(state = initialState, action) {

    var newState = state
    var boards
    var recentBoards

    switch (action.type) {
        case 'SET_BOARDS':
            newState = { ...state, boards: action.boards }
            break
        case 'SET_RECENT_BOARDS':
            newState = { ...state, recentBoards: action.recentBoards }
            break

        case 'UPDATE_RECENT_BOARDS':
            recentBoards = state.recentBoards
            recentBoards.push(action.board)
            newState = { ...state, recentBoards: recentBoards }
            break
        case 'SET_BOARD':
            newState = { ...state, board: action.board }
            break
        case 'REMOVE_BOARD':
            const lastRemoveBoard = state.boards.find(board => board._id === action.boardId)
            boards = state.boards.filter(board => board._id !== action.boardId)
            newState = { ...state, boards, lastRemoveBoard }
            break
        case 'ADD_BOARD':
            newState = { ...state, boards: [...state.boards, action.board] }
            break
        case 'UPDATE_BOARD':
            boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            newState = { ...state, boards }
            break
        case 'SET_LABELS_MODE':
            newState = { ...state, isLabelesOpend: action.labelsMode }
            break;
        case 'UNDO_REMOVE_BOARD':
            if (state.lastRemoveBoard) {
                newState = { ...state, boards: [...state.boards, state.lastRemoveBoard], lastRemoveBoard: null }
            }
            break
        case 'SAVE_BOARD':
            newState = { ...state, board: { ...action.board } }
            break;
        case 'SAVE_STICKERS':
            newState = { ...state, stickers: [...action.stickers] }
            break;
        case 'SET_STICKERS':
            newState = { ...state, stickers: action.stickers }
            break;;
        default:
    }
    // For debug:
    window.boardState = newState
    console.log('Prev State:', state)
    console.log('Action:', action)
    console.log('New State:', newState)
    return newState

}
