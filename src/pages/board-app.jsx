import React from 'react'
import { connect } from 'react-redux'
import {CardDetails} from '../pages/card-details.jsx'
import { Route } from 'react-router'
import {Loader} from '../cmps/Loader.jsx'
import {ListPreview} from '../cmps/list-preview.jsx'
import { MainBoardHeader } from '../cmps/main-board-header.jsx'
import { ListAdd } from '../cmps/list-add.jsx'


import { loadBoard, onAddBoard, onRemoveBoard , loadBoards, onSaveBoard} from '../store/board.actions.js'
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
        catch (err){
console.log(err);
        }
    }

    onRemoveBoard = (boardId) => {
        this.props.onRemoveBoard(boardId)
    }
    onAddBoard = () => {
       this.props.onAddBoard()
    }

    render() {
        const {board} = this.props
        const {onSaveBoard} = this.props;
        console.log('curr board',board);
        if (!board) return <Loader />

        return (
            <>

  
                
                 <main>
                     <section className="main-board"> 
                     <MainBoardHeader board={board} onSaveBoard={onSaveBoard} />
                     <Route path="/board/:boardId/:listId/:cardId" component={CardDetails} />
                    <div className="lists-container">
                        {board.lists.map((currList,listIdx ) => 
                 <ListPreview board={board} key={listIdx} listIdx={listIdx} currList={currList} onSaveBoard={onSaveBoard}/>)}
                <ListAdd board={board} onSaveBoard={onSaveBoard} />

                    </div>
                     </section>
                </main> 
                
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
    onAddBoard,
    loadBoards,
    onSaveBoard

}


export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)