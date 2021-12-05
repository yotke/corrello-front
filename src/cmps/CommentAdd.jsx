import React, { Component } from "react";
import { boardService } from '../services/board.service'
import { connect } from 'react-redux'
import { TextareaAutosize } from '@material-ui/core'
import { ProfileAvatar } from './profile-avatar'
import { onSaveBoard } from '../store/board.actions'
import { socketService } from "../services/socket.service";
import { activityService } from "../services/activity.service";


class _CommentAdd extends Component {

    state = {
        txt: '',
        isEdit: false
    }

    onToggleEdit = () => {
        const { isEdit } = this.state
        this.setState({ isEdit: !isEdit })
    }

    handleChange = ({ target: { value } }) => {
        this.setState({ txt: value })
    }

    onSaveComment = (ev) => {
        if (ev.type === 'keydown' && ev.key !== 'Enter') return
        if (ev.type === 'keydown') ev.preventDefault()
        const { card, board, onSaveBoard } = this.props
        const { txt } = this.state
        const updatedBoard = activityService.addActivityToBoard(board,'comment', txt, card)
  
        onSaveBoard(updatedBoard)
        this.selectedInput.blur()
        this.setState({ txt: '' })
    }

    render() {
        const { txt, isEdit } = this.state
        const { user, users } = this.props
        return (
            <div className="comment-add flex">
                <ProfileAvatar member={user} size={32} users={users} />
                <div
                    className={`comment-editor flex column justify-space-between full ${isEdit ? 'edit-open' : ''}`}>
                    <TextareaAutosize
                        onBlur={this.onToggleEdit}
                        onFocus={this.onToggleEdit}
                        onChange={this.handleChange}
                        onKeyDown={this.onSaveComment}
                        value={txt}
                        aria-label="empty textarea"
                        placeholder="Write a comment"
                        autoCorrect="false"
                        autoComplete="false"
                        ref={(input) => this.selectedInput = input}
                    />
                    {isEdit && <button
                        type="submit"
                        className="primary-btn"
                        onMouseDown={this.onSaveComment}>
                        Save
                    </button>}
                </div>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        user: state.userModule.user,
        users: state.userModule.users
    }
}

const mapDispatchToProps = {
    onSaveBoard,
}

export const CommentAdd = connect(mapStateToProps, mapDispatchToProps)(_CommentAdd)