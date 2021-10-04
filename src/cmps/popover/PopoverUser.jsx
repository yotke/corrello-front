
import { connect } from 'react-redux';
import { utilService } from '../../services/util.service';
import { Component } from 'react';
import { boardService } from '../../services/board.service';
import { closePopover } from '../../store/popover.actions';
import { onSaveBoard } from "../../store/board.actions";
import { Popover } from './Popover';

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
        onSaveBoard(updatedBoard)
        this.props.closePopover()

    }

    render() {
        return <Popover title={"Account"}>
        </Popover>
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    onSaveBoard,
    closePopover
}


export const PopoverUser = connect(mapStateToProps, mapDispatchToProps)(_PopoverUser)

