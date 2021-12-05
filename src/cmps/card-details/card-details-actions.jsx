import { Component } from 'react';
import { openPopover, closePopover } from '../../store/popover.actions.js'
import { onSaveBoard } from '../../store/board.actions.js';
import { connect } from 'react-redux';
import { Loader } from '../loader.jsx'
import { ReactComponent as MemberIcon } from '../../assets/img/cmps/card-details/icon-members.svg'
import { ReactComponent as CheckListIcon } from '../../assets/img/cmps/card-details/icon-checklists.svg'
import { ReactComponent as LabelIcon } from '../../assets/img/cmps/card-details/icon-labels.svg'
import { ReactComponent as CoverIcon } from '../../assets/img/cmps/card-details/icon-cover.svg'
import { ReactComponent as AttachmentIcon } from '../../assets/img/cmps/card-details/icon-attachment.svg'
import { ReactComponent as DateIcon } from '../../assets/img/cmps/card-details/icon-dates.svg'
import { utilService } from '../../services/util.service.js'
import { boardService } from '../../services/board.service.js'
import { activityService } from '../../services/activity.service';
import {socketService} from '../../services/socket.service'
import MinusIcon from '@material-ui/icons/RemoveOutlined';
import CopyIcon from '@material-ui/icons/FileCopyOutlined';
import { ElementOverlay } from '../popover/ElementOverlay'

class _CardDetailsActions extends Component {

  onOpenPopover = (ev, PopoverName) => {
    //debugger
    const elPos = ev.target.getBoundingClientRect();
    const props = {
      card: this.props.card,
      addFile: this.addFile
    };
    this.props.openPopover(PopoverName, elPos, props);
  };

   addFile = (fileUrl) => {
    const { card, onSaveBoard, closePopover, board } = this.props
    if (!card.attachs) card.attachs = []
    const attach = {
      id: utilService.makeId(),
      fileName: `${utilService.makeId(12)}.jpg`,
      url: fileUrl,
      createdAt: Date.now()
    }

    card.attachs.push(attach)
    let updatedBoard = boardService.updateCardInBoard(board, card)
    updatedBoard = activityService.addActivityToBoard(updatedBoard, 'attached', attach.fileName, card)
    onSaveBoard(updatedBoard)
    closePopover()
  }

  joinCard = () => {
    if (this.isUserMember()) return
    const { card, user, onSaveCardFromActions, onSaveBoard, board } = this.props
    card.members.push(user)
    onSaveCardFromActions(card)
    const savedActivity = activityService.createActivity('joined', '', card)
    socketService.emit('app newActivity', savedActivity)
    board.activities.unshift(savedActivity)
    onSaveBoard(board)
}

toggleArchive = () => {
    const { card, onSaveCardFromActions } = this.props
    card.isArchived = !card.isArchived;
    onSaveCardFromActions(card)
}

isUserMember = () => {
    const { card, user } = this.props
    console.log('user', user)
    const idx = card.members.findIndex(member => member._id === user._id)
    if (idx !== -1) return true
    return false
}

removeCard = () => {
  const { board, onSaveBoard, card } = this.props
  board.lists.forEach(list => {
      list.cards.forEach((boardCard, idx) => {
          if (boardCard.id === card.id) list.cards.splice(idx, 1)
      })
  })
  onSaveBoard(board)
  this.props.goBackToBoard()
}


  render() {
    const { card } = this.props;
    if (!card) return <Loader />


    return (
      <div className="details-actions-wrapper flex column">
                {!this.isUserMember() && <div className="suggested flex column"> <h4>SUGGESTED</h4>
                <button className="secondary-btn actions-btn "
                    onClick={this.joinCard}>
                    <div className="actions-btn-content flex align-center">
                    <MemberIcon className="action-logo" />
                        <span>Join</span>
                    </div>
                </button></div>}
        <div className="add-section flex column">
          <h4>ADD TO CARD</h4>

          {/* members side button   */}
          <button
            className="actions-btn secondary-btn"
            onClick={(ev) => this.onOpenPopover(ev, 'MEMBERS')}
          >
            <div className="actions-btn-content flex align-center">
              <MemberIcon className="action-logo" />
              <span>Members </span>
            </div>

          </button>

          {/* labels side button  */}
          <button
            className="secondary-btn actions-btn"
            onClick={(ev) => this.onOpenPopover(ev, 'LABELS')}
          >
            <div className="actions-btn-content flex align-center">
              <LabelIcon className="action-logo" />
              <span>Labels</span>
            </div>

          </button>

          {/* checklist side button  */}

          <button
            className="secondary-btn actions-btn"
            onClick={(ev) => this.onOpenPopover(ev, 'CHECKLIST')}
          >
            <div className="actions-btn-content flex align-center">
              <CheckListIcon className="action-logo" />
              <span>Checklist</span>
            </div>

          </button>

          {/* due date side button  */}
          <button
            className="secondary-btn actions-btn"
            onClick={(ev) => this.onOpenPopover(ev, 'DATE')}
          >
            <div className="actions-btn-content flex align-center">
              <DateIcon className="action-logo" />
              <span>Date</span>
            </div>

          </button>

          {/* attach side button  */}
          <button

            className="secondary-btn actions-btn"
            onClick={(ev) => this.onOpenPopover(ev, 'ATTACHMENT')}
          >
            <div className="actions-btn-content flex align-center">
              <AttachmentIcon className="action-logo" />
              <span>Attachment</span>
            </div>

          </button>

          {/* cover side button  */}
          <button
            className="secondary-btn actions-btn"
            onClick={(ev) => this.onOpenPopover(ev, 'COVER')}
          >
            <div className="actions-btn-content flex align-center">
              <CoverIcon className="action-logo" />
              <span>Cover</span>
            </div>

          </button>
        </div>

        <div className="actions-section flex column">
          <h4>ACTIONS</h4>
          <button className="secondary-btn actions-btn"
                    onClick={(ev) => this.onOpenPopover(ev, 'MOVE')}>
                    <div className="actions-btn-content flex align-center">
                        <i className="fas fa-arrow-right icon-sm action-logo"></i>
                        <span>Move</span>
                    </div>
                </button>


                <button className="secondary-btn actions-btn"
                    onClick={(ev) => this.onOpenPopover(ev, 'COPY')}>
                    <div className="actions-btn-content flex align-center">
                        <CopyIcon  className="action-logo"  />
                        <span>Copy</span>
                    </div>
                </button>

                {!card.isArchived ?
                    <button className="secondary-btn actions-btn"
                        onClick={this.toggleArchive}>
                        <div className="actions-btn-content flex align-center">
                            <i className="fas fa-archive icon-sm action-logo"></i>
                            <span>Archive</span>
                        </div>
                    </button>
                    :
                    <>
                        <button className="secondary-btn actions-btn"
                            onClick={this.toggleArchive} >
                            <div className="actions-btn-content flex align-center">
                                <i className="fas fa-undo icon-sm action-logo"></i>
                                <span>Return To Board</span>
                            </div>
                        </button>
                        <button className="secondary-btn actions-btn danger-btn" onClick={this.removeCard} >
                            <div className="actions-btn-content  flex align-center">
                                <MinusIcon className="remove action-logo" />
                                <span>Delete</span>
                            </div>
                        </button>
                    </>}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    currPopoverName: state.popoverModule.currPopover.name,
    user: state.userModule.user
  };
}

const mapDispatchToProps = {
  openPopover,
  closePopover,
  onSaveBoard,
};

export const CardDetailsActions = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CardDetailsActions);
