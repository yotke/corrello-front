
import { PopoverLabels } from "../popover/PopoverLabels.jsx";
import { PopoverDate } from "./PopoverDate.jsx";
import { PopoverMembers } from "../popover/popover-members.jsx";
import { connect } from 'react-redux'
import { PopoverCover } from '../popover/PopoverCover.jsx'
import { PopoverCreateBoard } from '../popover/PopoverCreateBoard.jsx'
import { PopoverChecklist } from '../popover/PopoverChecklist.jsx'
import { PopoverStarred } from "./PopoverStarred.jsx";




function _DynamicPopover({ currPopover }) {

  const { name, props } = currPopover

  switch (name) {
    //card popovers
    case 'LABELS': return <PopoverLabels {...props} />; break;
    case 'DATE': return <PopoverDate {...props} />; break;
    case 'MEMBERS': return <PopoverMembers {...props} />; break;
    case 'COVER': return <PopoverCover {...props} />; break;
    case 'CREATE_BOARD': return <PopoverCreateBoard {...props} />; break;
    case 'CHECKLIST': return <PopoverChecklist {...props} />; break;
    //this is headers popovers
    case 'STARRED': return <PopoverStarred {...props} />; break;
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