import React from "react"
import { Link, NavLink } from 'react-router-dom'
import { boardService } from "../../services/board.service";
import { PopoverDate } from "../popover/PopoverDate";

export class DueDateDisplay extends React.Component {
    state = {
        isChecked: false,
    }

    componentDidMount() {
        const { card } = this.props
        if (card.dueDateDone) {
            this.setState({ isChecked: true })
        }
    }
    render() {
        const { card, onSaveBoard, board } = this.props
        const { isChecked } = this.state
        return (
            <section className="date-card-details-container ">
                <h3>Due date</h3>

                <div>
                    <input type="checkbox" defaultChecked={card.dueDateDone} onChange={(ev) => {
                        card.dueDateDone = ev.target.checked ? true : false
                        const updatedBoard = boardService.updateCardInBoard(board, card)
                        onSaveBoard(updatedBoard)
                        //onSaveBoard(board);
                        this.setState({ isChecked: !isChecked })
                    }} />
                    <button className="due-date-change-btn secondary-btn" onClick={(ev) => {

                        const elPos = ev.target.getBoundingClientRect();
                        const props = {
                            card: this.props.card,
                        };
                        this.props.openPopover('DATE', elPos, props);
                    }
                    }>

                        <span className="due-date-date-btn">{new Date(card.dueDate).toLocaleString()}</span>
                        {!isChecked && <span className="due-date-status-btn due-soon" >Due Soon</span>}
                        {isChecked && <span className="due-date-status-btn due-complete">Complete</span>}
                        {<span className="buttom-arrow">
                            <svg width="15" height="15" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                                    fill="currentColor">
                                </path>
                            </svg>
                        </span>}
                    </button>

                </div>
            </section>
        )
    }
}