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
        console.log('todo', todo);
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
        console.log('TODO', todo);
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
        console.log(ev);
        if (ev.keyCode === 13) {
            ev.preventDefault();
            this.onSaveChecklistItem();
            return;
        }
        this.setState({ checklistItem: ev.target.value });
    };
    render() {
<<<<<<< HEAD
        const { onBoxChecked, todo, board, card } = this.props
=======
        const { onBoxChecked, todo,updateTodoCheckedBox } = this.props
>>>>>>> d86089fd1fc8bf73a04efaf4d3bd0ed6ebdfef48
        const { isOnEditState, checklistItem } = this.state
        return (
            <section className="checklist-item-container">
                <input type="checkbox" defaultChecked={todo && todo.isChecked} className="checklist-item-checkbox" id="subscribeNews" name="subscribe" value="newsletter" onChange={(ev) => {
                    console.log(' ev.target.checked ', ev.target.checked);

                    if (ev.target.checked) {

                        onBoxChecked(1)
                        todo.isChecked = true
                        updateTodoCheckedBox(todo)
                    }
                    else {
                        todo.isChecked = false
                        updateTodoCheckedBox(todo)
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