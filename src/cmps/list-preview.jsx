import { Component } from 'react';
import { connect } from 'react-redux';

import { CardAdd } from './card-add.jsx';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CardPreview } from './card-preview/card-preview.jsx';
import {MoreHoriz} from '@material-ui/icons';
import {onSaveBoard} from '../store/board.actions.js'
import {closePopover, openPopover} from '../store/popover.actions.js'
class _ListPreview extends Component {
  state = {
    isAddToggeld: false,
    cards: '',
    titleTxt: '',
    isOnEditState: false,
  };

  onOpenPopover = (ev, PopoverName) => {
    const elPos = ev.target.getBoundingClientRect()
    const { board, currList, onSaveBoard, closePopover } = this.props
    const props = {
        currList,
        board,
        onSaveBoard,
        closePopover
    }
    this.props.openPopover(PopoverName, elPos, props)
}


  toggleCardAdd = () => {
    const { isAddToggeld } = this.state;
    this.setState({ isAddToggeld: !isAddToggeld });
  };

  handleOnDragEnd = (result) => {
    const { listIdx } = this.props;
    const { cards } = this.props.currList;
    this.props.handleOnDragEndCards(result, listIdx, cards);
  };

  toggleEdit = () => {
    const { isOnEditState } = this.state;
    const { currList } = this.props;
    this.setState({ isOnEditState: !isOnEditState, titleTxt: currList.title });
  };

  onSaveTitle = () => {
    this.toggleEdit();
    const { titleTxt } = this.state;
    const { board, currList, onSaveBoard } = this.props;
    const listIdx = board.lists.findIndex((list) => list.id === currList.id);
    board.lists[listIdx].title = titleTxt;
    onSaveBoard(board);
  };

  handleChange = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      this.onSaveTitle();
      return;
    }
    this.setState({ titleTxt: ev.target.value });
  };

  render() {
    const { board, currList, onSaveBoard, listIdx } = this.props;
    const { isAddToggeld, isOnEditState, titleTxt } = this.state;
    this.state.cards = currList.cards;
    return (
      <div className="list-preview" key={listIdx}>
        <div className="list-header">
          {isOnEditState ? (
            <input
              type="text"
              className="card-list-header-input"
              value={titleTxt}
              autoFocus
              onChange={this.handleChange}
              onKeyDown={this.handleChange}
              onBlur={this.onSaveTitle}
            />
          ) : (
            <h2 onClick={this.toggleEdit}>{currList.title}</h2>
          )}{' '}

          <div onClick={(ev) => this.onOpenPopover(ev, 'LIST_OPTIONS')} className="card-list-btn-menu">
            <MoreHoriz className="list-menu"/>
                                        </div>
        </div>
        <div className="card-container">
          {/* <DragDropContext onDragEnd={this.handleOnDragEnd}> */}
          <Droppable droppableId={`${listIdx}`}>
            {(provided) => (
              <ul
                className="card-list-element clean-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {(!currList.cards.length) && <li className="dragged"></li>}
                {currList.cards.map((currCard, cardIdx) => (
                  <Draggable
                    key={currCard.id}
                    draggableId={currCard.id}
                    index={cardIdx}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onDrag={(ev) => {
                          {
                            console.log('ev', ev);
                          }
                          this.props.onCardClicked();
                        }}
                      >
                        <CardPreview
                          isDragged={this.props.isDragged}
                          key={currCard.id}
                          card={currCard}
                          cardIdx={cardIdx}
                          currList={currList}
                          board={board}
                          onSaveBoard={onSaveBoard}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          {/* </DragDropContext> */}
          {isAddToggeld && (
            <CardAdd
              board={board}
              currList={currList}
              onSaveBoard={onSaveBoard}
              toggleCardAdd={this.toggleCardAdd}
              cards={this.state.cards}
            />
          )}
        </div>
        {!isAddToggeld && (
          <div className="list-footer" onClick={this.toggleCardAdd}>
            <span className="add-icon">+</span> Add card
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {
  closePopover,
  onSaveBoard,
  openPopover
};

export const ListPreview = connect(null, mapDispatchToProps)(_ListPreview);
