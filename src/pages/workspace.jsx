import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

import { loadBoards, onAddBoard, onEditBoard, onRemoveBoard, onSaveBoard, updateRecentBoard } from '../store/board.actions.js'
import { BoardPreview } from '../cmps/board-preview.jsx'
import { SideNav } from '../cmps/sidenav.jsx';
import { WorkspaceHeader } from '../cmps/workspace-header.jsx'
import { WorkspaceNavBar } from '../cmps/workspace-nav-bar.jsx'
import { SearchNavBar } from '../cmps/search-nav-bar.jsx';
import {Loader} from '../cmps/loader'

class _Workspace extends React.Component {
    state = {
        isMainBoard: false,
        boardsToShow: [],
        boards: []
    }
     async componentDidMount () {
    await this.props.loadBoards()
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
        const { boards } = this.props
        if (filterBy) {
            let { title } = filterBy
            const boardsToShow = boards.filter(board => {
                return board.title.toUpperCase().includes(title.toUpperCase())
            })
            this.setState({ boardsToShow })
        }
    }

    render() {
        const { onAddBoard , boards} = this.props
        let {user} = this.props
        const boardsToShow = this.state.boardsToShow.length ? this.state.boardsToShow : boards
        if(!user)  user = {fullname: 'guest', username: 'guest'}
        if(!boards.length) return <Loader/>
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
                            <BoardPreview boards={boardsToShow} onSaveBoard={this.props.onSaveBoard} updateRecentBoard={this.props.updateRecentBoard} />
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
    onSaveBoard,
    loadBoards,
    onRemoveBoard,
    onAddBoard,
    onEditBoard,
    updateRecentBoard
}

export const Workspace = connect(mapStateToProps, mapDispatchToProps)(_Workspace)