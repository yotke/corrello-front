

import { PopoverLabels } from "../popover/popover-labels.jsx";
import { PopoverDate } from "./popover-date.jsx";
import { PopoverMembers } from "../popover/popover-members.jsx";
import { connect } from 'react-redux'
import { PopoverCover } from '../popover/popover-cover.jsx'
import { PopoverCreateBoard } from '../popover/popover-create-board.jsx'
import { PopoverChecklist } from '../popover/popover-checklist.jsx'
import { PopoverStarred } from "./popover-starred.jsx";
import { PopoverRecentBoard } from "./popover-recent-board.jsx";
import { PopoverUser } from "./popover-user.jsx";
import { PopoverAttachment } from './popover-attachment.jsx'
import { PopoverSearchAppheader } from "./popover-search-appheader.jsx";
import { PopoverList } from './popover-list.jsx'
import {PopoverMoreOptions} from './popover-more.jsx'
import { PopoverInvite } from "./PopoverInvite";
import {PopoverMoveCopy} from './popover-move-copy'
import { PopoverNotifics } from './PopoverNotifics';

 

function _DynamicPopover({ currPopover }) {

  const { name, props } = currPopover



  switch (name) {
    //card popovers
    case 'LABELS': return <PopoverLabels {...props} />; 
    case 'MORE_OPTIONS': return <PopoverMoreOptions {...props}/> 
    case 'DATE': return <PopoverDate {...props} />;
    case 'MEMBERS': return <PopoverMembers {...props} />; 
    case 'INVITE': return <PopoverInvite {...props} />
    case 'COVER': return <PopoverCover {...props} />; 
    case 'CREATE_BOARD': return <PopoverCreateBoard {...props} />; 
    case 'CHECKLIST': return <PopoverChecklist {...props} />; 
    case 'LIST_OPTIONS': return <PopoverList {...props} />; 
    case 'COPY': return <PopoverMoveCopy popoverType="copy" {...props} />;
    case 'MOVE': return <PopoverMoveCopy popoverType="move" {...props} />;    case 'STARRED': return <PopoverStarred {...props} />; 
    case 'RECENT_BOARDS': return <PopoverRecentBoard {...props} />;
    case 'USER': return <PopoverUser {...props} />; 
    case 'ATTACHMENT': return <PopoverAttachment {...props} />;
    case 'NOTIFICATIONS': return <PopoverNotifics {...props} />
    case 'SEARCH_HEADER': return <PopoverSearchAppheader {...props} />;

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