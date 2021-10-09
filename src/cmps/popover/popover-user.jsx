
import { connect } from 'react-redux';
import { utilService } from '../../services/util.service';
import { Component } from 'react';
import { boardService } from '../../services/board.service';
import { closePopover } from '../../store/popover.actions';
import { onSaveBoard } from "../../store/board.actions";
import { Popover } from './popover';
import { onLogin, onSignup, onGoogleLogin, onLogout } from '../../store/user.actions.js'
class _PopoverUser extends Component {

    state = {
        title: ''
    }

    handlechange = ({ target }) => {
        this.setState({ title: target.value })
    }

    addChecklist = (ev) => {
        ev.preventDefault()
        const { card, onSaveBoard, board } = this.props
        if (!card.checklists) card.checklists = []
        const checklist = {
            id: utilService.makeId(),
            title: this.state.title,
            todos: []
        }
        card.checklists.push(checklist)
        const updatedBoard = boardService.updateCardInBoard(board, card)
        
        //todo
        onSaveBoard(updatedBoard)
        this.props.closePopover()
    }

    render() {
        return <Popover title={"Account"}>
            {/* <hr /> */}
    
            <button className="logout-btn-user-popover btn" onClick={() => {
                this.props.onLogout()
                this.props.closePopover()
            }}>Log out</button>
        </Popover>
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        loggedInUser: state.userModule.loggedInUser,
        loginErr: state.userModule.loginErr
    }
}

const mapDispatchToProps = {
    onLogin,
    onSignup,
    onGoogleLogin,
    onSaveBoard,
    closePopover,
    onLogout
}


export const PopoverUser = connect(mapStateToProps, mapDispatchToProps)(_PopoverUser)

