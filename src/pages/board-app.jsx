import React from 'react'
import { connect } from 'react-redux'


import { loadBoard, onAddBoard, onRemoveBoard , loadBoards} from '../store/board.actions.js'
// import { showSuccessMsg } from '../services/event-bus.service.js'

class _BoardApp extends React.Component {
    state = {
    }
    componentDidMount() {
        console.log('board componnet mounted')
        // const { boardId } = this.props.match.params
        // const boardId = 'b101'
        // this.props.loadBoard(boardId)
        this.props.loadBoards()
    }

    onRemoveBoard = (boardId) => {
        this.props.onRemoveBoard(boardId)
    }
    onAddBoard = () => {
       this.props.onAddBoard()
    }

    render() {
        const { board} = this.props
        return (
            <div>
                <h3>Boards App</h3>
                 {/* <main>
                    <button onClick={this.onAddBoard}>Add Board ⛐</button>
                    <ul className="Board-list">
                        {board.lists.map((currList, idx) =>
                            <li className="Board-preview" key={idx}>
                                <h4>{currList.title}</h4>
                            </li>)}
                    </ul>
                </main>  */}
            </div>
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