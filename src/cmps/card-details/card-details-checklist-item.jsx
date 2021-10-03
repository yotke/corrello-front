import React from "react"
import { Link, NavLink } from 'react-router-dom'
import { boardService } from "../../services/board.service"
import { ReactComponent as IconDescription } from '../../assets/img/cmps/card-details/icon-description.svg'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

export class CardChecklistItem extends React.Component {
    state = {
        checklistItem: 'new',
        isOnEditState: false
    }
    componentDidMount() {
        const { checklistItem } = this.props
        if (checklistItem) {
            this.setState({ checklistItem })
        }
        else {
            this.setState({ isOnEditState: true })
        }
    }
    onSaveChecklistItem = () => {
        const { onAddingListItem } = this.props
        const { checklistItem } = this.state
        onAddingListItem(checklistItem)
    }

    handleChange = (ev) => {
        console.log(ev);
        if (ev.keyCode === 13) {
            ev.preventDefault();
            this.onSaveChecklistItem();
            return;
        }
        this.setState({ checklistItem: ev.target.value });
    };
    render() {
        const { isOnEditState, checklistItem } = this.state
        return (
            <section className="checklist-item-container">
                <input type="checkbox" className="checklist-item-checkbox" id="subscribeNews" name="subscribe" value="newsletter" />
                {isOnEditState ? (
                    <div className="checklist-item-input-container">
                        <textarea
                            type="text"
                            className="card-checklist-item-input"
                            value={checklistItem}
                            autoFocus
                            onChange={this.handleChange}
                            onKeyDown={this.handleChange}
                            onBlur={() => {
                                this.onSaveChecklistItem()
                                this.setState({ isOnEditState: !isOnEditState })
                            }} />
                        <div className="checklist-item-textarea-btns">
                            <button className="save-checklist-item button--primary" onClick={() => {
                                this.onSaveDescription()
                            }}>Save</button>
                            <button
                                onClick={() => this.goBackToCard()}
                                className='close-window-btn-textarea'
                            >
                                <CloseRoundedIcon />
                            </button>
                        </div>
                    </div>
                )
                    : (
                        <p dir="auto" onClick={() => {
                            this.setState({ isOnEditState: !isOnEditState })
                        }}>{checklistItem}</p>
                    )}
            </section>
        )
    }

}