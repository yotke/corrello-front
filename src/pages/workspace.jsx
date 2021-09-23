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

    // onRemoveBoard = (boardId) => {
    //     this.props.onRemoveBoard(boardId)
    // }
    // onAddBoard = () => {
    //    this.props.onAddBoard()
    // }
    // onEditBoard = (board) => {
    //     const price = +prompt('New price?')
    //     const boardToSave = { ...board, price }
    //     this.props.onEditBoard(boardToSave)
    // }
    // addToCart = (board) => {
    //     console.log(`Adding ${board.vendor} to Cart`)
    //     this.props.addToCart(board)
    //     showSuccessMsg('Added to Cart')
    // }
    render() {
        // const { boards } = this.props
        return (
            <h2>test</h2>
            // <div>
            //     <h3>Boards App</h3>
            //     <main>
            //         <button onClick={this.onAddBoard}>Add Board ⛐</button>
            //         <ul className="board-list">
            //             {boards.map(board =>
            //                 <li className="board-preview" key={board._id}>
            //                     <h4>{board.vendor}</h4>
            //                     <h1>⛐</h1>
            //                     <p>Price: <span>${board.price.toLocaleString()}</span></p>
            //                     <p>Owner: <span>{board.owner && board.owner.fullname}</span></p>
            //                     <div>
            //                         <button onClick={() => {
            //                             this.onRemoveBoard(board._id)
            //                         }}>x</button>
            //                         <button onClick={() => {
            //                             this.onEditBoard(board)
            //                         }}>Edit</button>
            //                     </div>
            //                     <button className="buy" onClick={() => {
            //                         this.addToCart(board)
            //                     }}>Add to Cart</button>

            //                 </li>)}
            //         </ul>
            //     </main>
            // </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards
    }
}
const mapDispatchToProps = {
    // loadBoards,
    // onRemoveBoard,
    // onAddBoard,
    // onEditBoard,
    // addToCart
}


export const Workspace = connect(mapStateToProps, mapDispatchToProps)(_Workspace)