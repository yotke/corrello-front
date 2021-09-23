const initialState = {
    boards: [],
    cart:[],
    lastRemovedCar: null
}
export function boardReducer(state = initialState, action) {
    var newState = state
    var boards
    var cart
    switch (action.type) {
        case 'SET_BOARDS':
            newState = { ...state, boards: action.boards }
            break
        case 'REMOVE_BOARD':
            const lastRemovedCar = state.boards.find(board => board._id === action.boardId)
            boards = state.boards.filter(board => board._id !== action.boardId)
            newState = { ...state, boards, lastRemovedCar}
            break
        case 'ADD_BOARD':
            newState = { ...state, boards:[...state.boards, action.board]}
            break
        case 'UPDATE_BOARD':
            boards = state.boards.map(board => (board._id === action.board._id)? action.board : board)
            newState = { ...state, boards}
            break
        case 'ADD_TO_CART':
            newState = { ...state, cart:[...state.cart, action.board]}
            break
        case 'REMOVE_FROM_CART':
            cart = state.cart.filter(board => board._id !== action.boardId)
            newState = { ...state, cart}
            break
        case 'CLEAR_CART':
            newState = { ...state, cart: []}
            break
        case 'UNDO_REMOVE_BOARD':
            if (state.lastRemovedCar) {
                newState = { ...state, boards: [...state.boards, state.lastRemovedCar], lastRemovedCar: null}
            }
            break
        default:
    }
    // For debug:
    window.boardState = newState
    console.log('Prev State:', state)
    console.log('Action:', action)
    console.log('New State:', newState)
    return newState

}
