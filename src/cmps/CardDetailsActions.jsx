import { Component } from 'react';
import { openPopover, closePopover } from '../store/popover.actions.js'
import { onSaveBoard } from '../store/board.actions.js';
import { connect } from 'react-redux';
import {Loader} from '../cmps/Loader.jsx'
import { Button } from "@material-ui/core";

class _CardDetailsActions extends Component {

  onOpenPopover = (ev, PopoverName) => {
    //debugger
    const elPos = ev.target.getBoundingClientRect();
    const props = {
      card: this.props.card,
    };
    console.log("PROPS", props)
    this.props.openPopover(PopoverName, elPos, props);
  };



  render() {
    const { card } = this.props;
    if (!card) return <Loader />


    return (
      <div className="details-actions-wrapper flex column">
        <div className="add-section flex column">
          <h4>ADD TO CARD</h4>

          {/* members side button   */}
          <button
            className="secondary-btn actions-btn "
            onClick={(ev) => this.onOpenPopover(ev, 'MEMBERS')}
          >
            <div className="actions-btn-content flex align-center">
              <span>Members</span>
            </div>
         
          </button>

          {/* labels side button  */}
          <button
            className="secondary-btn actions-btn"
            onClick={(ev) => this.onOpenPopover(ev, 'LABELS')}
          >
            <div className="actions-btn-content flex align-center">
              <span>Labels</span>
            </div>
         
          </button>

          {/* checklist side button  */}

          <button
            className="secondary-btn actions-btn"
            onClick={(ev) => this.onOpenPopover(ev, 'CHECKLIST')}
          >
            <div className="actions-btn-content flex align-center">
              <span>Checklist</span>
            </div>
         
          </button>

          {/* due date side button  */}
          <button
            className="secondary-btn actions-btn"
            onClick={(ev) => this.onOpenPopover(ev, 'DATE')}
          >
            <div className="actions-btn-content flex align-center">
              <i className="far fa-clock icon-sm "></i>
              <span>Date</span>
            </div>
         
          </button>

          {/* attach side button  */}
          <button
          
            className="secondary-btn actions-btn"
            onClick={(ev) => this.onOpenPopover(ev, 'ATTACH')}
          >
            <div className="actions-btn-content flex align-center">
              <i className="fas fa-paperclip icon-sm"></i>
              <span>Attachment</span>
            </div>
         
          </button>

          {/* cover side button  */}
          <button
            className="secondary-btn actions-btn"
            onClick={(ev) => this.onOpenPopover(ev, 'COVER')}
          >
            <div className="actions-btn-content flex align-center">
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
