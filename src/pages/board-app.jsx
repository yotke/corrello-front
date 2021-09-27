import React, { useState } from 'react'
import { connect } from 'react-redux'
import { CardDetails } from '../pages/card-details.jsx'
import { Route } from 'react-router'
import { Loader } from '../cmps/Loader.jsx'
import { ListPreview } from '../cmps/list-preview.jsx'
import { MainBoardHeader } from '../cmps/main-board-header.jsx'
import { ListAdd } from '../cmps/list-add.jsx'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { SideNav } from '../cmps/sidenav.jsx'

import { loadBoard, onAddBoard, onRemoveBoard, loadBoards, onSaveBoard, onEditBoard } from '../store/board.actions.js'
import { boardService } from '../services/board.service.js'
// import { showSuccessMsg } from '../services/event-bus.service.js'

class _BoardApp extends React.Component {
    state = {
        isMainBoard: true
    }

    async componentDidMount() {
        try {
            console.log('board componnet mounted')
            const { boardId } = this.props.match.params
            await this.props.loadBoard(boardId)
            await this.props.loadBoards()

        }
        catch (err) {
            console.log(err);
        }
    }

    onRemoveBoard = (boardId) => {
        this.props.onRemoveBoard(boardId)
    }
    onAddBoard = () => {
        this.props.onAddBoard()
    }
    handleOnDragEndCards = (result, listIdx, cards) => {
        const { board } = this.props
        const { destination, source, draggableId } = result;
        // if (
        //     destination.droppableId === source.droppableId &&
        //     destination.index === source.index
        // ) {
        //     return;
        // }
        console.log('source', source);
        console.log('destination', destination);
        // const start = this.state.columns[source.droppableId];
        // const finish = this.state.columns[destination.droppableId];

        if (!result.destination) return;
        const items = Array.from(cards);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        console.log('items', items)
        this.props.board.lists[listIdx].cards = items
        this.props.onEditBoard(this.props.board)
    }

    handleOnDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        console.log('source', source);
        console.log('destination', destination);
        
        const { lists } = this.props.board
        console.log('lists', lists)
        if (!result.destination) return;
        const items = Array.from(lists);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        console.log('items', items)
        this.props.board.lists = items
        this.props.onEditBoard(this.props.board)
    }


    render() {

        const { board } = this.props
        const { onSaveBoard } = this.props;
        const { boards } = this.props;
        const { isMainBoard } = this.state
        if (!board) return <Loader />

        return (
            <>
                <section className="main-board flex row">
                    <SideNav boards={boards} isMainBoard={isMainBoard} />
                    <div className="board-content">
                        <MainBoardHeader board={board} onSaveBoard={onSaveBoard} />
                        <Route path="/board/:boardId/:listId/:cardId" component={CardDetails} />
                        <DragDropContext onDragEnd={this.handleOnDragEnd}>
                            <Droppable droppableId="all-lists" direction="horizontal" type="list">
                                {provided => (
                                    <ul className="lists-container clean-list flex row" {...provided.droppableProps} ref={provided.innerRef}>
                                        {board.lists.map((currList, listIdx) =>
                                            <Draggable key={currList.id} draggableId={currList.id} index={listIdx}>
                                                {(provided) => (
                                                    <li className="clean-list" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <ListPreview board={board} key={listIdx} listIdx={listIdx} currList={currList} onSaveBoard={onSaveBoard} handleOnDragEndCards={this.handleOnDragEndCards} />
                                                    </li>
                                                )}
                                            </Draggable>
                                        )}
                                        {provided.placeholder}
                                        <ListAdd board={board} onSaveBoard={onSaveBoard} />
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>

                </section>
            </>
        )
    }
}


function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        boards: state.boardModule.boards
    }
}
const mapDispatchToProps = {
    loadBoard,
    onRemoveBoard,
    onEditBoard,
    onAddBoard,
    loadBoards,
    onSaveBoard

}


export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)