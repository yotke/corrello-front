import React, { useState } from 'react'
import { connect } from 'react-redux'
import { CardDetails } from '../pages/card-details.jsx'
import { Route } from 'react-router'
import { Loader } from '../cmps/Loader.jsx'
import { ListPreview } from '../cmps/list-preview.jsx'
import { MainBoardHeader } from '../cmps/main-board-header.jsx'
import { ListAdd } from '../cmps/list-add.jsx'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { loadBoard, onAddBoard, onRemoveBoard, loadBoards, onSaveBoard ,onEditBoard} from '../store/board.actions.js'
import { boardService } from '../services/board.service.js'
// import { showSuccessMsg } from '../services/event-bus.service.js'

class _BoardApp extends React.Component {
    state = {
    }

    async componentDidMount() {
        try {
            console.log('board componnet mounted')
            const { boardId } = this.props.match.params
            await this.props.loadBoard(boardId)
            // this.props.loadBoards()

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

    handleOnDragEnd = (result) => {
      
        const  { lists } = this.props.board
        console.log('lists',lists)
        if (!result.destination) return;
        const items = Array.from(lists);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        console.log('items',items)
        this.props.board.lists=items
        this.props.onEditBoard(this.props.board)
    }


    render() {

        const { board } = this.props
        const { onSaveBoard } = this.props;
        console.log('curr board', board);
        if (!board) return <Loader />

        return (
            <>
                <div className="board-background" style={{
                    backgroundImage: "url(" + board.style.background + ")",
                    backgroundSize: 'cover',
                    height: '100vh',
                    overflow: 'hidden',
                    backgroundPosition: '50%'

                }}>

                    <main>
                            <DragDropContext onDragEnd={this.handleOnDragEnd}>
                        <section className="main-board">
                            <MainBoardHeader board={board} onSaveBoard={onSaveBoard} />
                            <Route path="/board/:boardId/:listId/:cardId" component={CardDetails} />
                                <Droppable droppableId="characters">
                                    {(provided) => (
                                        <ul className="lists-container" {...provided.droppableProps} ref={provided.innerRef}>
                                            {board.lists.map((currList, listIdx) =>
                                                <Draggable key={currList.id} draggableId={currList.id} index={listIdx}>
                                                    {(provided) => (
                                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                            <ListPreview board={board} key={listIdx} listIdx={listIdx} currList={currList} onSaveBoard={onSaveBoard} />
                                                        </li>
                                                    )}
                                                </Draggable>
                                            )}
                                            {provided.placeholder}
                                        </ul>
                                    )}
                                </Droppable>
                            <ListAdd board={board} onSaveBoard={onSaveBoard} />

                        </section>
                            </DragDropContext>
                    </main>
                </div>
            </>
        )
    }
}


function mapStateToProps(state) {
    return {
        board: state.boardModule.board
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