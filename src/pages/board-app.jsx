import React from 'react'
import { connect } from 'react-redux'


import { loadBoard, onAddBoard, onRemoveBoard , loadBoards} from '../store/board.actions.js'
// import { showSuccessMsg } from '../services/event-bus.service.js'

class _BoardApp extends React.Component {
    state = {
    }
    componentDidMount() {
        console.log('componnet mounted')
        // const { boardId } = this.props.match.params
        this.props.loadBoards()
    }

    onRemoveBoard = (boardId) => {
        this.props.onRemoveBoard(boardId)
    }
    onAddBoard = () => {
       this.props.onAddBoard()
    }

    render() {
        const { Board} = this.props
        return (
            <div>
                <h3>Boards App</h3>
                {/* <main>
                    <button onClick={this.onAddBoard}>Add Board ⛐</button>
                    <ul className="Board-list">
                        {Board.list.map((currList, idx) =>
                            <li className="Board-preview" key={idx}>
                                <h4>{currList.title}</h4>
                            </li>)}
                    </ul>
                </main> */}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        cars: state.boardModule.board
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