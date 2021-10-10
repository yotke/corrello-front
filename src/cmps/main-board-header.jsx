import { Component } from 'react'
import { connect } from 'react-redux'
import { NavBarBoard } from './nav-bar-board'
import { loadBoard, loadRecentBoards, loadBoards } from "../store/board.actions";

class _MainBoardHeader extends Component {

    state = {
        title: '',
    }

    componentDidMount() {
        this.props.loadRecentBoards()

        this.setState({ title: this.props.board.title })
    }

    render() {
        const { board, onSaveBoard } = this.props
        const { title } = this.state
        return (
            <div className="main-board-header">
                <NavBarBoard board={board} onSaveBoard={onSaveBoard} title={title} />
                {/* <div className="board-title" >
                    <h1>{title}</h1>
                </div> */}
                <div className="flex header-section">
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        recentBoards: state.boardModule.recentBoards,
        boards: state.boardModule.boards,
        board: state.boardModule.board,
    }
}

const mapDispatchToProps = {
    loadBoards,
    loadBoard,
    loadRecentBoards
}

export const MainBoardHeader = connect(mapStateToProps, mapDispatchToProps)(_MainBoardHeader)
