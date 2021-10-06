import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CardDetails } from '../pages/card-details.jsx';
import { Route } from 'react-router';
import { Loader } from '../cmps/Loader.jsx';
import { ListPreview } from '../cmps/list-preview.jsx';
import { MainBoardHeader } from '../cmps/main-board-header.jsx';
import { ListAdd } from '../cmps/list-add.jsx';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { SideNav } from '../cmps/sidenav.jsx';
import { socketService } from '../services/socket.service.js';
import {
  loadBoard,
  onAddBoard,
  onRemoveBoard,
  loadBoards,
  onSaveBoard,
  onEditBoard,
  updateRecentBoard,
} from '../store/board.actions.js';
import { boardService } from '../services/board.service.js';
import { LocalGroceryStoreTwoTone, TimerSharp } from '@material-ui/icons';
// import { showSuccessMsg } from '../services/event-bus.service.js'
import { isEmpty } from 'lodash';
import { SideNavRight } from '../cmps/sidenav-right.jsx';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';

class _BoardApp extends React.Component {
  state = {
    isMainBoard: true,
    isCardClicked: false,
    isDragged: false,
  };

  async componentDidMount() {
    try {
      const { boardId } = this.props.match.params;

      await this.loadBoard(boardId);

      socketService.setup();
      socketService.emit('SOCKET_EVENT_START_BOARD', boardId);
      socketService.on('SOCKET_EVENT_ON_RELOAD_BOARD', this.props.loadBoard);
      // socketService.emit(socketService.SOCKET_EVENT_ON_BOARD_SAVED, boardId)
    } catch (err) {
      console.log(err);
    }

    this.unlisten = this.props.history.listen((location) => {
      const splittedPath = location.pathname.split('/');

      const boardId = splittedPath[2];
      if (!boardId || boardId === this.props.match.params.boardId) return;
      console.log(
        'Loading board from URL watcher - need to be ONLY on BOARD change!!!'
      );
      this.onBoardChange(boardId);
    });
  }

  loadBoard = async (boardId) => {
    console.log('loadBoard = async (boardId) => ', boardId);
    await Promise.all([
      this.props.loadBoard(boardId),
      this.props.updateRecentBoard(boardId),
      this.props.loadBoards(),
    ]);
  };

  componentWillUnmount() {
    this.unlisten();
  }

  onBoardChange = (boardId) => {
    this.props.loadBoard(boardId);
  };

  onRemoveBoard = (boardId) => {
    this.props.onRemoveBoard(boardId);
  };
  onAddBoard = () => {
    this.props.onAddBoard();
  };

  handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!result.destination) return;
    console.log('destination.droppableId', destination.droppableId);
    const { lists } = this.props.board;
    if (destination.droppableId != 'all-lists') {
      console.log('draggableId', draggableId);
      const start = lists[source.droppableId];
      const finish = lists[destination.droppableId];

      if (start === finish) {
        const cards = Array.from(start.cards);
        const [reorderedItem] = cards.splice(source.index, 1);
        cards.splice(destination.index, 0, reorderedItem);
        console.log('cards', cards);
        this.props.board.lists[source.droppableId].cards = cards;
      } else {
        var itemsArr = this.updateElemDND(
          start.cards,
          finish.cards,
          source,
          destination
        );
        this.updateBoardDND(itemsArr, source, destination);
      }
    } else {
      const items = Array.from(lists);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      this.props.board.lists = items;
      this.props.onEditBoard(this.props.board);
    }
  };

  updateBoardDND = (itemsArr, src, des) => {
    this.props.board.lists[src.droppableId].cards = itemsArr.srcItems;
    this.props.board.lists[des.droppableId].cards = itemsArr.desItems;
    this.props.onEditBoard(this.props.board);
  };

  updateElemDND = (srcItemsIn, desItemsIn, src, des) => {
    const srcItems = Array.from(srcItemsIn);
    const desItems = Array.from(desItemsIn);
    const [reorderedItem] = srcItems.splice(src.index, 1);
    desItems.splice(des.index, 0, reorderedItem);
    return { srcItems, desItems };
  };

  onCardClicked = () => {
    this.setState({ isCardClicked: true });
    console.log('isCardClicked', this.state.isCardClicked);
  };

  render() {
    const { board, onSaveBoard, boards, user } = this.props;
    const { isMainBoard } = this.state;
    if (!board) return <Loader />;

    return (
      <>
        <section className="main-board flex row">
          <SideNav boards={boards} isMainBoard={isMainBoard} user={user} />
          <div className="layout-helper flex column">
            <MainBoardHeader
              board={board}
              onSaveBoard={onSaveBoard}
              title={board.title}
            />
            <div className="board-content">
              <Route
                path="/board/:boardId/:listId/:cardId"
                exact
                component={CardDetails}
              />
              <DragDropContext onDragEnd={this.handleOnDragEnd}>
                <Droppable
                  droppableId="all-lists"
                  direction="horizontal"
                  type="list"
                >
                  {(provided) => (
                    <ul
                      className="lists-container clean-list flex row"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {board.lists.map((currList, listIdx) => (
                        <Draggable
                          key={currList.id}
                          draggableId={currList.id}
                          index={listIdx}
                        >
                          {(provided, snapshot) => (
                            <NaturalDragAnimation
                              style={provided.draggableProps.style}
                              snapshot={snapshot}
                            >
                              {(style) => (
                                <li
                                  className="list-wrapper"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={style}
                                >
                                  <ListPreview
                                    style={style}
                                    className={
                                      this.state.isDragged && 'list-dragged'
                                    }
                                    board={board}
                                    key={listIdx}
                                    listIdx={listIdx}
                                    currList={currList}
                                    onSaveBoard={onSaveBoard}
                                    handleOnDragEndCards={
                                      this.handleOnDragEndCards
                                    }
                                    onCardClicked={this.onCardClicked}
                                  />
                                </li>
                              )}
                            </NaturalDragAnimation>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      <ListAdd board={board} onSaveBoard={onSaveBoard} />
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
          <SideNavRight />
        </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    boards: state.boardModule.boards,
    user: state.userModule.user,
  };
}
const mapDispatchToProps = {
  loadBoard,
  onRemoveBoard,
  onEditBoard,
  onAddBoard,
  loadBoards,
  onSaveBoard,
  updateRecentBoard,
};

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp);
