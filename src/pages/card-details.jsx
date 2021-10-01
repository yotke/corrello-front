import React, { Component } from 'react';
import { connect } from 'react-redux';
import { boardService } from '../services/board.service';
import { utilService } from '../services/util.service';
import { CardDetailsActions } from '../cmps/CardDetailsActions';
import { onSaveBoard } from '../store/board.actions.js';
import { openPopover, closePopover } from '../store/popover.actions.js';
import { Loader } from '../cmps/Loader.jsx';
import { CardDetailsLabels } from '../cmps/card-details-labels.jsx';
import { CardChecklists } from '../cmps/card-details/checklist/card-checklists.jsx';
import { DueDateDisplay } from '../cmps/card-details/card-details-dates.jsx';
import { Description } from '../cmps/card-details/card-details-discription.jsx';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { TextareaAutosize } from '@material-ui/core';
import {ScreenOverlay} from '../cmps/ScreenOverlay.jsx';
import { CardDetailsMembers } from '../cmps/card-details-members.jsx'


class _CardDetails extends React.Component {
  state = {
    list: null,
    card: null,
  };

  componentDidMount() {
    const { listId, cardId } = this.props.match.params;

    this.setLocalState(listId, cardId);
  }

  setLocalState = (listId, cardId) => {
    //debugger
    console.log('this.props', this.props);

    const { board } = this.props;

    const list = board.lists.find((list) => list.id === listId);
    const { cards } = list;
    var card = cards.find((card) => card.id === cardId);
    this.setState({ card, list });
  };

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
    if(!labelIds) return cardLabels;
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
    const { board, onSaveBoard, openPopover } = this.props;
    const { card, list } = this.state;
    if (!card) return <Loader />;
    const { title, members, description, checklists, dueDate, style } = card;
    //debugger
    return (
      <section className="card-details-container flex">
                        <ScreenOverlay goBack={this.goBackToBoard} styleMode="darken" />

        <div className="card-details  flex column">
          <div className={`card-details-header ${(style && style.bgColor) ? 'cover-mode' : ''}`} style={(style && style.bgColor) ? {backgroundColor: style.bgColor} : {}} >
            <div clåassName="header-content flex justify-space-between">
          <button
            onClick={() => this.goBackToBoard()}
            className='close-window-btn'
             
          >
            <CloseRoundedIcon />
          </button>
          </div>

          </div>
          <h1 className="card-details-title">{title}</h1>
          <main className="card-details-main-container">
            <div className="card-details-main flex column">
           
              <div className="card-details-items flex">
                
              {(members && members.length) && <CardDetailsMembers
                                    members={members}
                                    openPopover={openPopover}
                                    card={card} />}
                
                {this.cardLabels.length && (
                  <CardDetailsLabels
                    labels={this.cardLabels}
                    openPopover={openPopover}
                    card={card}
                  />
                )}

                {dueDate && (
                  <DueDateDisplay card={card} openPopover={openPopover} />
                )}
              </div>

              {/* card description left menu side */}
              <Description
              description={description}
                card={card}
                board={board}
                onSaveBoard={onSaveBoard}
              />

              {/* <CardDescription
            description={description}
            onSaveCardDescription={this.onSaveCardDescription}
          /> */}

              {/* checkList left side section */}

              {checklists && checklists.length > 0 && (
                <CardChecklists
                  card={card}
                  checklists={checklists}
                  onSaveCardChecklists={this.onSaveCardChecklists}
                />
              )}

              {/* activities left menu */}

              {/* <CardActivities card={card} activities={activities} /> */}
            </div>

            <div className="card-details-sidebar flex column full">
              <CardDetailsActions
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