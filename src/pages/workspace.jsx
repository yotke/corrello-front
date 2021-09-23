import React from 'react'
import { connect } from 'react-redux'


import { loadBoards, onAddBoard, onEditBoard, onRemoveBoard, addToCart } from '../store/board.actions.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

class _Workspace extends React.Component {
    // state = {
    // }
    // componentDidMount() {
    //     this.props.loadBoards()
    // }

    onRemoveBoard = (boardId) => {
        this.props.onRemoveBoard(boardId)
    }
    onAddBoard = () => {
        this.props.onAddBoard()
    }
    onEditBoard = (board) => {
        const price = +prompt('New price?')
        const boardToSave = { ...board, price }
        this.props.onEditBoard(boardToSave)
    }
    addToCart = (board) => {
        console.log(`Adding ${board.vendor} to Cart`)
        this.props.addToCart(board)
        showSuccessMsg('Added to Cart')
    }
    render() {
        const { boards, user } = this.props
        return (
            <section className="workspace-container">
                <div className="tabbed-pane-header">
                    <div className="tabbed-pane-header-wrapper">
                        <div className="tabbed-pane-header-conten flex">
                            <h1>header of Workspace </h1>
                        </div>
                    </div>
                        <ul><li class="tabbed-pane-nav-item"><a class="tabbed-pane-nav-item-button js-org-profile active" data-tab="boards" href={`/${user}`}>Boards</a></li></ul>
                </div>
                <main>
                    <button onClick={this.onAddBoard}>Add Board ⛐</button>
                    <ul className="board-list">
                        {/* {boards.map(board =>
                            <li className="board-preview" key={board._id}>

                            </li>)} */}
                    </ul>
                </main>
            </section>
        )
    }
}


function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards,
        user: state.userModule.user
    }
}
const mapDispatchToProps = {
    loadBoards,
    onRemoveBoard,
    onAddBoard,
    onEditBoard,
    addToCart
}


export const Workspace = connect(mapStateToProps, mapDispatchToProps)(_Workspace)