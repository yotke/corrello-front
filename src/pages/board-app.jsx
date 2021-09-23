import React from 'react'
import { connect } from 'react-redux'


import { loadBoards, onAddBoard, onRemoveBoard, onSaveBoard } from '../store/board.actions.js'
// import { showSuccessMsg } from '../services/event-bus.service.js'

class _BoardApp extends React.Component {
    state = {
    }
    componentDidMount() {
        this.props.loadBoard()
    }

    onRemoveBoard = (boardId) => {
        this.props.onRemoveBoard(boardId)
    }
    onAddBoard = () => {
       this.props.onAddBoard()
    }

    render() {
        const { Boards } = this.props
        return (
            <div>
                <h3>Boards App</h3>
                <main>
                    <button onClick={this.onAddBoard}>Add Board ⛐</button>
                    <ul className="Board-list">
                        {Boards.map(Board =>
                            <li className="Board-preview" key={Board._id}>
                                <h4>{Board.vendor}</h4>
                                <h1>⛐</h1>
                                <p>Price: <span>${Board.price.toLocaleString()}</span></p>
                                <p>Owner: <span>{car.owner && car.owner.fullname}</span></p>
                                <div>
                                    <button onClick={() => {
                                        this.onRemoveCar(car._id)
                                    }}>x</button>
                                    <button onClick={() => {
                                        this.onEditCar(car)
                                    }}>Edit</button>
                                </div>
                                <button className="buy" onClick={() => {
                                    this.addToCart(car)
                                }}>Add to Cart</button>

                            </li>)}
                    </ul>
                </main>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        cars: state.carModule.cars
    }
}
const mapDispatchToProps = {
    loadBoards,
    onRemoveBoard,
    onAddBoard,
    onSaveBoard

}


export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)