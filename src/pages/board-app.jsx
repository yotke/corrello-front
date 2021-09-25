import React from 'react'
import { connect } from 'react-redux'
import {CardDetails} from '../pages/card-details.jsx'
import { Route } from 'react-router'
import {Loader} from '../cmps/Loader.jsx'


import { loadBoard, onAddBoard, onRemoveBoard , loadBoards} from '../store/board.actions.js'
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
        console.log('curr board',board);
        if (!board) return <Loader />

        return (
            <>
            <div className="board-background" style={{
                backgroundImage:"url(" + board.style.background + ")",
                backgroundSize:'cover',
                height:'100vh',
                overflow: 'hidden',
                backgroundPosition: '50%'

            }}>

                
                 <main>
                     <section className="main-board"> 
                     <Route path="/board/:boardId/:listId/:cardId" component={CardDetails} />
                    <ul className="lists-container">
                        {board.lists.map((currList, idx) =>
                            <li className="list-preview" key={idx}>
                                <div className="list-header">
                                <h2>{currList.title}</h2>
                                </div>
                                {console.log('curr list',currList)}
                                {currList.cards.map((currCard, cardId) => 
                                <ul key={cardId} className="card-container">
                                  <li className="card-preview" key={cardId}>
                                  <h4>{currCard.title}</h4>
                                  </li>  
                                  </ul>
                                 ) }
                            </li>)}
                    </ul>
                     </section>
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
    onAddBoard,
    loadBoards
    // onSaveBoard

}


export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)