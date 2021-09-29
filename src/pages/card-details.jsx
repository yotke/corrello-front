import React, { Component } from 'react';
import { connect } from 'react-redux';
import { boardService } from '../services/board.service';
import { utilService } from '../services/util.service';
import { CardDetailsActions } from '../cmps/CardDetailsActions';
import { onSaveBoard } from '../store/board.actions.js';
import { openPopover, closePopover } from '../store/popover.actions.js';
import { Loader } from '../cmps/Loader.jsx';
import { CardDetailsLabels } from '../cmps/card-details-labels.jsx'
<<<<<<< HEAD
import { DueDateDisplay } from '../cmps/card-details/card-details-dates';
=======
import { CardChecklists } from '../cmps/card-details/card-checklists.jsx'
>>>>>>> c6a9468cb2d707d552ec46b9ac6dc42b790414b4

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
    const { card: { labelIds } } = this.state
    const { board: { labels } } = this.props
    const cardLabels = labels.reduce((acc, label) => {
      if (labelIds.some(labelId => labelId === label.id)) acc.push(label)
      return acc
    }, [])
    return cardLabels
  }

  onSaveCardChecklists = (checklists) => {
    const { card } = this.state
    card.checklists = checklists
    this.setState({ card }, this.onSaveCard())
  }

  render() {
    const { board, onSaveBoard, openPopover } = this.props;
    const { card, list } = this.state;
    if (!card) return <Loader />;
    const { title, members, description, checklists, dueDate, style } = card;

    return (
      <section className="card-details-container flex column">
        <div className="card-details-header">Card Details</div>
        <main className="card-details-content flex justify-space-between">

          <div className="card-details-main flex column">
            <div className="card-details-items-container flex column">
              {!!this.cardLabels.length && (
                <CardDetailsLabels
                  labels={this.cardLabels}
                  openPopover={openPopover}
                  card={card}
                />
              )}

              {
                dueDate && <DueDateDisplay card={card}   openPopover={openPopover}/>
              }
            </div>

            {/* card description left menu side */}
            <p>{description}</p>
            {/* <CardDescription
            description={description}
            onSaveCardDescription={this.onSaveCardDescription}
          /> */}

            {/* checkList left side section */}

            <CardChecklists
              card={card}
              checklists={checklists}
              onSaveCardChecklists={this.onSaveCardChecklists}
            />

            {/* activities left menu */}

            {/* <CardActivities card={card} activities={activities} /> */}
          </div>

          <div className="card-details-action-container">
            <div className="card-details-sidebar flex column">
              <CardDetailsActions
                board={board}
                card={card}
                onSaveBoard={onSaveBoard}
                onSaveCardFromActions={this.onSaveCardFromActions}
              />
            </div>
          </div>

        </main>
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
