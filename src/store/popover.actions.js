export function openPopover(popoverName, elPos, props) {
  return dispatch => {
    const action = {
      type: 'SET_POPOVER',
      popoverName,
      elPos,
      props
    }
    dispatch(action)
  }
}

export function closePopover() {
  return dispatch => {
    const action = {
      type: 'CLOSE_POPOVER',
    }
    dispatch(action)
  }
}
