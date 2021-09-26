import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import { loadBoards, onAddBoard, onEditBoard, onRemoveBoard, addToCart } from '../store/board.actions.js'
import { showSuccessMsg } from '../services/event-bus.service.js'
import { BoardPreview } from '../cmps/board-preview.jsx'

class _Workspace extends React.Component {
    state = {
        isOpen: false,
        isOpenNavBar:true
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
    render() {
        const { isOpen,isOpenNavBar } = this.state
        const { boards, user } = this.props


        return (
            <section className="workspace-container">
                <div className="workspace-sticky-cotainter">
                    {isOpenNavBar&&<div className="nav-bar-workspace-container">
                        <nav className="home-left-bar">
                        <div className="nav-bar-header">
                            workspace view
                            <button className="_1ul6gs_kHQukwk _3TTqkG5muwOzqZ" data-test-id="workspace-navigation-collapse-button" type="button" onClick={() => {
                                this.setState({isOpenNavBar:!isOpenNavBar})
                            }}>
                                <img className="_1iDWq-WSaSDrjd" src="https://a.trellocdn.com/prgb/dist/images/workspace-navigation/double-chevron-close.87f7a764e600465f9077.svg" alt="Workspace navigation collapse icon" />
                            </button>
                        </div>
                        <br />
                        <div className="small-nav-bar-workspace">
                            Your boards
                            <div className="small-nav-bar-btn-container">
                                <button className="" onClick={this.onAddBoard}><svg width="15" height="15" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z" fill="currentColor"></path></svg></button>
                            </div>
                        </div>
                        <div className="all-boards">
                            <ul className="board-list">
                                {boards.map(board => {
                                    return <Link key={board._id} to={`/board/${board._id}`}>
                                        <li className="board-preview" key={board._id}>
                                            {board._id}
                                        </li>
                                    </Link>
                                })}
                            </ul>
                        </div>
                    
                    </nav>
                    </div>
                    }
                    <div className="all-boards-main"> 

                    <BoardPreview boards={boards} />
                    </div>
                </div>
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