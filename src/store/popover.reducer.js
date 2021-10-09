const initialState = {
  currPopover: {
    elPos: null,
    name: '',
    props: null,
    isNewPop: false
  },
  isBackScreen: false,
}

export function popoverReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_POPOVER':
      return { ...state, currPopover: { name: action.popoverName, elPos: action.elPos, props: action.props, isNewPop: action.isNewPop }, isOverlayOpen: true }
    case 'CLOSE_POPOVER':
      return { ...state, currPopover: { name: '', elPos: null, props: null }, isOverlayOpen: false }
    default:
      return state
  }
}
