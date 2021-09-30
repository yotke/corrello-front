import React from "react"
import { Link, NavLink } from 'react-router-dom'
import { PopoverDate } from "../popover/PopoverDate";

export class DueDateDisplay extends React.Component {
    state = {
        isChecked: false,
    }
    render() {
        const { card } = this.props
        const { isChecked } = this.state
        return (
            <section className="date-card-details-container ">
                <h3>Due date</h3>

                <div>
                <input type="checkbox" onChange={() => {
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
                    {!isChecked && <span className="due-date-status-btn" >Due Soon</span>}
                    {isChecked && <span className="due-date-status-btn">Complete</span>}
                </button>

                </div>
            </section>
        )
    }
}