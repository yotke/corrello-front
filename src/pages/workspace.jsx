import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import { loadBoards, onAddBoard, onEditBoard, onRemoveBoard, addToCart } from '../store/board.actions.js'
import { showSuccessMsg } from '../services/event-bus.service.js'
import { BoardPreview } from '../cmps/board-preview.jsx'

class _Workspace extends React.Component {
    state = {
        isOpen: false,
    }
    componentDidMount() {
        this.props.loadBoards()
        
    }

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
        const { isOpen } = this.state
        const { boards, user } = this.props


        return (
            <section className="workspace-container">
                <div className="tabbed-pane-header">
                    <div className="tabbed-pane-header-wrapper">
                        <div className="tabbed-pane-header-conten flex">
                            <h1>header of Workspace </h1>
                        </div>
                    </div>
                    <ul><li className="tabbed-pane-nav-item"><a className="tabbed-pane-nav-item-button js-org-profile active" data-tab="boards" href={`/${user}`}>Boards</a></li></ul>
                </div>
                <main>
                    <div className="nav-bar-workspace-container">
                        workspace view
                        <br />
                        <div className="small-nav-bar-workspace">
                            Your boards
                            <div className="small-nav-bar-btn-container">
                                <button className="" onClick={this.onAddBoard}><svg width="15" height="15" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z" fill="currentColor"></path></svg></button>
                                <button className="btn-workspace-views" onClick={() => {
                                    this.setState({ isOpen: !isOpen })
                                }}>
                                    <span className="sc-bdVaJa dWodlR" role="img" aria-label="UpIcon">
                                        {isOpen && <svg width="15" height="15" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.7071 7.29289L19.7782 14.364C20.1687 14.7545 20.1687 15.3876 19.7782 15.7782C19.3877 16.1687 18.7545 16.1687 18.364 15.7782L12 9.41421L5.63606 15.7782C5.24554 16.1687 4.61237 16.1687 4.22185 15.7782C3.83132 15.3877 3.83132 14.7545 4.22185 14.364L11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289Z" fill="currentColor">
                                            </path>
                                        </svg>}
                                        {!isOpen && <svg width="15" height="15" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" fill="currentColor">
                                            </path>
                                        </svg>}
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="board-preview-bar">
                            <ul className="board-list">
                                {boards.map(board => {
                                  return   <Link key={board._id} to={`/board/${board._id}`}>
                                        <li className="board-preview" key={board._id}>
                                            {board._id}
                                        </li>
                                    </Link>
                                })}
                            </ul>
                        </div>
                    </div>
                    {/* <div className="board-preview"> */}
                    <BoardPreview boards={boards} />
                    {/* </div> */}
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