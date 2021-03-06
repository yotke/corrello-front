import React, { Component } from 'react';
import { connect } from 'react-redux';
import { boardService } from '../services/board.service';
import { utilService } from '../services/util.service';
import { CardDetailsActions } from '../cmps/card-details/card-details-actions';
import { onSaveBoard } from '../store/board.actions.js';
import { openPopover, closePopover } from '../store/popover.actions.js';
import { Loader } from '../cmps/loader.jsx';
import { CardDetailsLabels } from '../cmps/card-details/card-details-labels.jsx';
import { DueDateDisplay } from '../cmps/card-details/card-details-dates.jsx';
import { Description } from '../cmps/card-details/card-details-discription.jsx';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { TextareaAutosize } from '@material-ui/core';
import { ScreenOverlay } from '../cmps/screen-overlay.jsx';
import { CardDetailsMembers } from '../cmps/card-details/card-details-members.jsx'
import { CardDetailsCover } from '../cmps/card-details/card-details-cover'
import { CardChecklists } from '../cmps/card-details/card-details-checklists';
import { ReactComponent as HeaderIcon } from '../assets/img/cmps/card-details/icon-header.svg'
import { socketService } from '../services/socket.service.js';
import { Activities } from '../cmps/activities.jsx'

import {CardAttachments} from '../cmps/card-details/card-attachments.jsx'

class _CardDetails extends React.Component {
  state = {
    list: null,
    card: null,
  };

  componentDidMount() {
        // SETTING LIST AND CARD FROM PARAMS
        const { board: { lists }, closePopover } = this.props
        const { cardId, listId } = this.props.match.params
        closePopover()
        const list = lists.find(list => list.id === listId)
        const { cards } = list;
        const card = cards.find(card => card.id === cardId)
        this.setState({ card, list })
  }

  onDeleteCardAttachment = (ev, attachId) => {
    ev.preventDefault()
    let { card, card: { attachs } } = this.state
    attachs = attachs.filter(currAttach => currAttach.id !== attachId)
    card.attachs = attachs
    
    this.setState({ card }, this.onSaveCard())
}


  onSaveCard = () => {
    const { card } = this.state;
    const { board } = this.props;
    const updatedBoard = boardService.updateCardInBoard(board, card);
    this.props.onSaveBoard(updatedBoard);
  };

  onSaveCardFromActions = (card) => {
    this.setState({ card }, this.onSaveCard());
  };

  get cardLabels() {
    var cardLabels = []
    const {
      card: { labelIds },
    } = this.state;
    if (!labelIds) return cardLabels;
    const {
      board: { labels },
    } = this.props;
    cardLabels = labels.reduce((acc, label) => {
      if (labelIds.find((labelId) => labelId === label.id)) acc.push(label);
      return acc;
    }, []);
    return cardLabels;
  }


  goBackToBoard = () => {
    const { board } = this.props
    this.props.closePopover()
    this.props.history.push(`/board/${board._id}`)
  }


  onSaveCardChecklists = (checklists) => {
    const { card } = this.state;
    card.checklists = checklists;
    this.setState({ card }, this.onSaveCard());
  };

  render() {
    const { board, board: { activities }, onSaveBoard, openPopover } = this.props;
    const { card, list } = this.state;
    if (!card) return <Loader />;
    const { title, members, description, checklists, dueDate, style, attachs} = card;
    //debugger
    return (
      <section className="card-details-container flex">
        <ScreenOverlay goBack={this.goBackToBoard} styleMode="darken" />

        <div className="card-details  flex column">
          {style.coverMode && <CardDetailsCover style={style} openPopover={openPopover} card={card} />}
          <button
            onClick={() => this.goBackToBoard()}
            className='close-window-btn'

          >
            <CloseRoundedIcon />
          </button>


          <div className="title-section">
            <HeaderIcon className="title-svg-logo" />
            <h1 className="card-details-title">{title}</h1>

          </div>


          <main className="card-details-main-container">
            <div className="card-details-main flex column">

              <div className="card-details-content flex">

                {!!(members && members.length) && <CardDetailsMembers
                  members={members}
                  openPopover={openPopover}
                  card={card} />}

                {!!this.cardLabels.length && (
                  <CardDetailsLabels
                    labels={this.cardLabels}
                    openPopover={openPopover}
                    card={card}
                  />
                )}

                {!!dueDate && (
                  <DueDateDisplay card={card} openPopover={openPopover} board={board} onSaveBoard={onSaveBoard} />
                )}
              </div>

              <Description
                description={description}
                card={card}
                board={board}
                onSaveBoard={onSaveBoard}
                />
{attachs && !!attachs.length &&
             <CardAttachments
                 attachs={attachs}
                 onDeleteCardAttachment={this.onDeleteCardAttachment}
                 openPopover={openPopover}
                 card={card}
             />}

              <CardChecklists
                card={card}
                board={board}
                checklists={checklists}
                onSaveBoard={onSaveBoard}
              />

              {!!(activities && activities.length) &&
                <Activities 
                  card={card} 
                  activities={activities}
                  isInCardLocation={true} 
               />}
            </div>

            <div className="card-details-sidebar flex column full">
              <CardDetailsActions
              goBackToBoard={this.goBackToBoard}
                board={board}
                card={card}
                onSaveBoard={onSaveBoard}
                onSaveCardFromActions={this.onSaveCardFromActions}
              />
            </div>
          </main>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  };
}

const mapDispatchToProps = {
  onSaveBoard,
  closePopover,
  openPopover,
};

export const CardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CardDetails);