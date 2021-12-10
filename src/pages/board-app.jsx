import React from 'react';
import { connect } from 'react-redux';
import { CardDetails } from './card-details.jsx';
import { Route } from 'react-router';
import { Loader } from '../cmps/loader.jsx';
import { ListPreview } from '../cmps/list-preview.jsx';
import { MainBoardHeader } from '../cmps/main-board-header.jsx';
import { ListAdd } from '../cmps/list-add.jsx';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { SideNav } from '../cmps/sidenav.jsx';
import { Dashboard } from './Dashboard.jsx';
import { socketService } from '../services/socket.service.js';
import { eventBusService } from '../services/event-bus.service';
import { CardEdit } from '../cmps/CardEdit.jsx';
import $ from 'jquery';
import { Chat } from '../cmps/chat.jsx';

import {
  loadBoard,
  onAddBoard,
  onRemoveBoard,
  loadBoards,
  onSaveBoard,
  onEditBoard,
  updateRecentBoard,
} from '../store/board.actions.js';

import { SideNavRight } from '../cmps/sidenav-right.jsx';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd'; //optinal
import { activityService } from '../services/activity.service.js';

class _BoardApp extends React.Component {
  state = {
    isMainBoard: true,
    isCardClicked: false,
    isCardEditOpen: false,
    currCard: null,
    elPos: null,
    loading:true,
    EditBtnsPosition: 'right',
  };

  componentWillUnmount() {
    window.removeEventListener('mouseup', this.HandleDrop);
    this.unlisten();
  }

  componentWillMount() {
    this.unlisten = this.props.history.listen((location) => {
      const splittedPath = location.pathname.split('/');

      const boardId = splittedPath[2];
      if (!boardId || boardId === this.props.match.params.boardId) return;
      this.props.updateRecentBoard(boardId);
      // this.onBoardChange(boardId);
    });
  }

  removeEvent;

  async componentDidMount() {

this.setState({loading : true})
    //debounce loading 
    setTimeout(function() { //Start the timer
      this.setState({loading: false}) //After 1 second, set render to true
  }.bind(this), 1300)

    window.addEventListener('mouseup', this.HandleDrop);
    try {
      const { boardId } = this.props.match.params;
      window.addEventListener('popstate', function () {
        console.log('updateRecentBoard as changed');
        if (this.props) {
          const { updateRecentBoard } = this.props;
          if (updateRecentBoard) updateRecentBoard(boardId);
        }
      });

      await this.props.loadBoard(boardId);

      socketService.emit('SOCKET_EVENT_START_BOARD', boardId);
      socketService.on('SOCKET_EVENT_ON_RELOAD_BOARD', savedBoard => {
        this.props.loadBoard(boardId)
    })

      this.removeEvent = eventBusService.on('card-edit', ({ elPos, card }) => {
        let distanseFromRight = $(window).width() - elPos.left + elPos.width;
        console.log('distanse from right window , ', elPos, distanseFromRight);
        if (distanseFromRight < 700)
          this.setState({ EditBtnsPosition: 'left' });
        else this.setState({ EditBtnsPosition: 'right' });
        this.setState({ isCardEditOpen: true, currCard: card, elPos });
      });
    } catch (err) {

    }
  }

  
  componentWillUnmount() {
    this.unlisten();
  }
  
  // onBoardChange = (boardId) => {
  //   this.props.loadBoard(boardId);
  // };

  onRemoveBoard = (boardId) => {
    this.props.onRemoveBoard(boardId);
  };

  onCloseCardEdit = () => {
    this.setState({ isCardEditOpen: false });
  };

  onDragEnd = (result) => {
    let {
      board,
      board: { lists },
      onSaveBoard,
    } = this.props;
    const { destination, source, type } = result;
    if (!destination) return;
    const droppableIdStart = source.droppableId;
    const droppableIdEnd = destination.droppableId;
    const droppableIdxStart = source.index;
    const droppableIdxEnd = destination.index;

    // dragging lists around
    if (type === 'list') {
      const list = lists.splice(droppableIdxStart, 1);
      lists.splice(droppableIdxEnd, 0, ...list);
      board.lists = lists;
      onSaveBoard(board);
      return;
    }

    // in the same list
    if (droppableIdStart === droppableIdEnd) {
      const list = lists.find((list) => list.id === droppableIdStart);
      const card = list.cards.splice(droppableIdxStart, 1);
      list.cards.splice(droppableIdxEnd, 0, ...card);
      const listIdx = lists.indexOf(list);
      lists[listIdx] = list;
    }

    // other list
    if (droppableIdStart !== droppableIdEnd) {
      const listStart = lists.find((list) => list.id === droppableIdStart);
      const card = listStart.cards.splice(droppableIdxStart, 1);
      const listEnd = lists.find((list) => list.id === droppableIdEnd);
      listEnd.cards.splice(droppableIdxEnd, 0, ...card);
      const listStartIdx = lists.indexOf(listStart);
      const listEndIdx = lists.indexOf(listEnd);
      lists[listStartIdx] = listStart;
      lists[listEndIdx] = listEnd;
      const txt = `${listStart.title} to ${listEnd.title}`;
      const savedActivity = activityService.createActivity('moved', txt, ...card);
      board.activities.unshift(savedActivity);
    }
    board.lists = lists;
    onSaveBoard(board);
  };


  onCardClicked = () => {
    this.setState({ isCardClicked: true });
  };

  render() {
    const { board, onSaveBoard, boards, loggedInUser, onEditBoard } = this.props;
    const {
      isMainBoard,
      currCard,
      elPos,
      isCardEditOpen,
      EditBtnsPosition,
      loading
    } = this.state;
    if (!board) return <Loader />;
    if (loading) return <Loader />;
    const {
      board: { activities },
    } = this.props;

    return (
      <>
        <section className="main-board flex row">
          <SideNav boards={boards} isMainBoard={isMainBoard} loggedInUser={loggedInUser} />
          <div className="layout-helper flex column">
            <MainBoardHeader
              board={board}
              onEditBoard={onEditBoard}
              onSaveBoard={onSaveBoard}
              title={board.title}
            />
            <DragDropContext onDragEnd={this.onDragEnd}>
              <div className="board-content">
                <Route
                  path="/board/:boardId/:listId/:cardId"
                  exact
                  component={CardDetails}
                />
                <Route path="/board/:boardId/dashboard" component={Dashboard} />
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
                      {board.lists.map((currList, idx) => (
                        <ListPreview
                          board={board}
                          key={currList.id}
                          currListIdx={idx}
                          currList={currList}
                          onSaveBoard={onSaveBoard}
                          onCardClicked={this.onCardClicked}
                        />
                      ))}
                      {provided.placeholder}
                      <ListAdd board={board} onSaveBoard={onSaveBoard} />
                    </ul>
                  )}
                </Droppable>
              </div>
            </DragDropContext>
          </div>
          <SideNavRight
            activities={activities}
            isInCardLocation={false}
            board={board}
          />

          {isCardEditOpen && (
            <CardEdit
              board={board}
              card={currCard}
              EditBtnsPosition={EditBtnsPosition}
              elPos={elPos}
              onCloseCardEdit={this.onCloseCardEdit}
            />
          )}
          <Chat />
        </section>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    boards: state.boardModule.boards,
    loggedInUser: state.userModule.loggedInUser,
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
