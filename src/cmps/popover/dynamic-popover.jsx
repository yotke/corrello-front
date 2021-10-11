

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
import { PopoverImagePicker } from './popover-image-picker.jsx'


function _DynamicPopover({ currPopover }) {

  const { name, props, isNewPop } = currPopover

//   if(isNewPop) {
//     console.log('is new pop!!!!');
 
//     return <section>
//  <PopoverCreateBoard {...props}
//  />
// <PopoverImagePicker {...props}/>
//     </section>  

//   }

  switch (name) {
    //card popovers
    case 'LABELS': return <PopoverLabels {...props} />; 
    case 'DATE': return <PopoverDate {...props} />;
    case 'MEMBERS': return <PopoverMembers {...props} />; 
    case 'COVER': return <PopoverCover {...props} />; 
    case 'CREATE_BOARD': return <PopoverCreateBoard {...props} />; 
    case 'CHECKLIST': return <PopoverChecklist {...props} />; 
    case 'LIST_OPTIONS': return <PopoverList {...props} />; 
    // case 'IMAGE_PICKER': return <PopoverImagePicker {...props}/>
    //this is headers popovers
    case 'STARRED': return <PopoverStarred {...props} />; 
    case 'RECENT_BOARDS': return <PopoverRecentBoard {...props} />;
    case 'USER': return <PopoverUser {...props} />; 
    case 'ATTACHMENT': return <PopoverAttachment {...props} />;
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