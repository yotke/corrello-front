import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { boardService } from '../../services/board.service';
import { closePopover } from '../../store/popover.actions';
import { connect } from 'react-redux';
import { onSaveBoard } from '../../store/board.actions';
import React, { Component } from 'react';
import { Popover } from './popover';
import { activityService } from '../../services/activity.service';

class _PopoverDate extends Component {

    state = {
        date: null
    }

    componentDidMount() {

        const date = this.props.card.dueDate ? new Date(this.props.card.dueDate).toLocaleString() : new Date()
        this.setState({ date })
    }


    handleChange = (ev) => {
        this.setState({ date: ev._d })
    }

    saveDueDate = (date) => {
        const { card, onSaveBoard, closePopover, board } = this.props
        const dueDateBefore = card.dueDate

        card.dueDate = date ? Date.parse(date) : 0;
        
        let updatedBoard = boardService.updateCardInBoard(board, card)
        if(dueDateBefore) {
            if(card.dueDate) { updatedBoard = activityService.addActivityToBoard(updatedBoard, 'changed-duedate', new Date(card.dueDate).toLocaleString(), card) }
            else { updatedBoard = activityService.addActivityToBoard(updatedBoard, 'removed', 'due date', card) }
        }
        onSaveBoard(updatedBoard)
        closePopover()
    }

    onRemoveDate = () => {
        this.saveDueDate(null)
    }

    render() {
        const { date } = this.state
        if (!date) return ''//loading
        return <Popover title="Date">
            <div className="date-pop-over-content">
 
            <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                        autoOk
                        variant="static"
                        openTo="date"
                        value={date}
                        onChange={this.handleChange}

                    />
                </MuiPickersUtilsProvider>

                <div className="btn-container flex column">
                    <button className="primary-btn" onClick={() => this.saveDueDate(date)} >Save</button>
                    <button className="secondary-btn" onClick={this.onRemoveDate}>Remove</button>
                </div>
            </div>

        </Popover>
    }
}
function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        user: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    onSaveBoard,
    closePopover
}


export const PopoverDate = connect(mapStateToProps, mapDispatchToProps)(_PopoverDate)
