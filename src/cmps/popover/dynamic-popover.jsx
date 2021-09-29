
import { PopoverLabels } from "../popover/PopoverLabels.jsx";
import { PopoverDate } from "./PopoverDate.jsx";
import { connect } from 'react-redux'




function _DynamicPopover({ currPopover }) {

  const { name, props } = currPopover

  switch (name) {
    case 'LABELS': return <PopoverLabels {...props} />
    case 'DATE': return <PopoverDate {...props} />
    default: return '';

  }



}




function mapStateToProps(state) {
  return {
    isOverlayOpen: state.popoverModule.isOverlayOpen,
    currPopover: state.popoverModule.currPopover
  }
}

export const DynamicPopover = connect(mapStateToProps, null)(_DynamicPopover)