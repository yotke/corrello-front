
import { connect } from 'react-redux';
import { utilService } from '../../services/util.service';
import { Component } from 'react';
import { boardService } from '../../services/board.service';
import { closePopover } from '../../store/popover.actions';
import { onSaveBoard } from "../../store/board.actions";
import { Popover } from './popover';

class _PopoverChecklist extends Component {

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
        return <Popover title={"Add A Checklist"}>
            <div className="checklist-pop-over-content">
                <form onSubmit={this.addChecklist}>
                    <label htmlFor="checklist-input" className="pop-over-label">Title</label>
                    <input className="pop-over-input" id="checklist-input" type="text" value={this.state.title} onChange={this.handlechange} placeholder="Enter a title..." autoFocus />
                    <button className="primary-btn wide-btn">Add</button>
                </form>
            </div>
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


export const PopoverChecklist = connect(mapStateToProps, mapDispatchToProps)(_PopoverChecklist)

