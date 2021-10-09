import React from "react"
import { Link, NavLink } from 'react-router-dom'
import { boardService } from "../../services/board.service"
import { ReactComponent as IconDescription } from '../../assets/img/cmps/card-details/icon-description.svg'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { onSaveBoard } from "../../store/board.actions";
export class CardChecklistItem extends React.Component {
    state = {
        checklistItem: 'new',
        isOnEditState: false
    }
    componentDidMount() {
        const { todo } = this.props
        if (todo) {
            this.setState({ checklistItem: todo.title })
        }
        else {
            this.setState({ isOnEditState: true })
        }
    }
    onSaveChecklistItem = () => {
        const { onAddingListItem, todo } = this.props
        const { checklistItem } = this.state
        if (todo) {

            onAddingListItem(checklistItem, todo.id)
        }
        else {
            onAddingListItem(checklistItem)
        }
    }
    goBackToCard = () => {

    }
    handleChange = (ev) => {
        if (ev.keyCode === 13) {
            ev.preventDefault();
            this.onSaveChecklistItem();
            return;
        }
        this.setState({ checklistItem: ev.target.value });
    };
    render() {
        const { onBoxChecked, todo, updateTodoCheckedBox } = this.props
        const { isOnEditState, checklistItem } = this.state
        return (
            <section className="checklist-item-container">
                <input type="checkbox" defaultChecked={todo && todo.isChecked} className="checklist-item-checkbox" id="subscribeNews" name="subscribe" value="newsletter" onChange={(ev) => {

                    if (ev.target.checked) {

                        onBoxChecked(1)
                        todo.isChecked = true
                        updateTodoCheckedBox(todo, 'completed', ev.target.value)
                    }
                    else {
                        todo.isChecked = false
                        updateTodoCheckedBox(todo, 'incomplete', ev.target.value)
                        onBoxChecked(-1)
                    }
                   
                }} />
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
                        
                            }
                            
                            } />
                        {/* <div className="checklist-item-textarea-btns">
                            <button className="save-checklist-item button--primary" onClick={() => {
                                this.onSaveChecklistItem()
                            }}>Save</button>
                            <button
                                onClick={() => this.goBackToCard()}
                                className='close-window-btn-textarea'
                            >
                                <CloseRoundedIcon />
                            </button>
                        </div> */}
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