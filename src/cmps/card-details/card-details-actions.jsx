import { Component } from 'react';
import { openPopover, closePopover } from '../../store/popover.actions.js'
import { onSaveBoard } from '../../store/board.actions.js';
import { connect } from 'react-redux';
import { Loader } from '../../cmps/loader.jsx'
import { ReactComponent as MemberIcon } from '../../assets/img/cmps/card-details/icon-members.svg'
import { ReactComponent as CheckListIcon } from '../../assets/img/cmps/card-details/icon-checklists.svg'
import { ReactComponent as LabelIcon } from '../../assets/img/cmps/card-details/icon-labels.svg'
import { ReactComponent as CoverIcon } from '../../assets/img/cmps/card-details/icon-cover.svg'
import { ReactComponent as AttachmentIcon } from '../../assets/img/cmps/card-details/icon-attachment.svg'
import { ReactComponent as DateIcon } from '../../assets/img/cmps/card-details/icon-dates.svg'
import { utilService } from '../../services/util.service.js'
import { boardService } from '../../services/board.service.js'
import { activityService } from '../../services/activity.service';

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



  render() {
    const { card } = this.props;
    if (!card) return <Loader />


    return (
      <div className="details-actions-wrapper flex column">
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
          <button
            className="secondary-btn actions-btn"
            onClick={(ev) => this.onOpenPopover(ev, 'MOVE')}
          >
            <div className="actions-btn-content flex align-center">
              <i className="fas fa-arrow-right icon-sm"></i>
              <span>Move</span>
            </div>

          </button>

          <button
            className="secondary-btn actions-btn"
            onClick={(ev) => this.onOpenPopover(ev, 'COPY')}
          >
            <div className="actions-btn-content flex align-center">
              <span>Copy</span>
            </div>

          </button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    currPopoverName: state.popoverModule.currPopover.name,
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
