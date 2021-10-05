import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import { loadBoards, onAddBoard, onEditBoard, onRemoveBoard, addToCart } from '../store/board.actions.js'
import { showSuccessMsg } from '../services/event-bus.service.js'
import { BoardPreview } from '../cmps/board-preview.jsx'
import { SideNav } from '../cmps/sidenav.jsx';
import { WorkspaceHeader } from '../cmps/workspace-header.jsx'
import { WorkspaceNavBar } from '../cmps/workspace-nav-bar.jsx'
import { SearchNavBar } from '../cmps/search-nav-bar.jsx'

class _Workspace extends React.Component {
    state = {
        isMainBoard: false,
        boards:[]
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


    onSelectSort = (boards) => {
        this.setState(boards)
    }
    onSetFilter = (filterBy) => {
        console.log('filter filter all the way',filterBy)
        
    }

    render() {
        const { boards, onAddBoard, user } = this.props
        const { isWorkSpace } = this.state;

        return (
            <section className="workspace-container">

                <div className="workspace-sticky-cotainter">

                    <SideNav boards={boards} onAddBoard={onAddBoard} user={user} />
                    <div className="main-board-preview">
                        <div className="workspace-header">
                            <WorkspaceHeader boards={boards} onAddBoard={onAddBoard} user={user} />
                            <WorkspaceNavBar />
                        </div>
                        <div className="all-boards-main">
                            <SearchNavBar boards={boards} onSelectSort={this.onSelectSort} onSetFilter={this.onSetFilter} />
                            <BoardPreview boards={boards} />
                        </div>
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