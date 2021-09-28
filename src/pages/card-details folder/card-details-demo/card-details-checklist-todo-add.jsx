import React, { Component } from "react";
import { TextareaAutosize } from '@material-ui/core';
import { utilService } from '../../services/util.service.js';

export class CardDetailsChecklistTodoAdd extends Component {

    state = {
        isEditMode: false,
        todo: {
            title: ''
        }
    }

    onEditMode = () => {
        const { isEditMode } = this.state
        this.setState({ isEditMode: !isEditMode })
    }

    handleChange = (ev) => {
        const { value } = ev.target;
        if (ev.key === 'Enter') {
            ev.preventDefault();
            this.onAddTodo()
            return;
        }
        debugger
        this.setState({ todo: { title: value } });
    }

    onAddTodo = (ev) => {
        console.log('ev.type',ev.type,'ev.key', ev.key)

        if (ev.type === 'keydown' && ev.key !== 'Enter') return
        if (ev.type === 'keydown') ev.preventDefault()
        
        const { todo: { title } } = this.state;
        const { checklistId, onCreateNewTodo } = this.props
        
        const todo = {
            id: utilService.makeId(),
            title,
            isDone: false
        }

        onCreateNewTodo(checklistId, todo)
        .then(() => {
            this.setState({ todo: { title: '' } })
        })
    }

    render() {
        const { todo: { title }, isEditMode } = this.state
        return (<section>
            <div className="add-todo">
                <button className={`btn-add-todo ${isEditMode ? 'hidden' : 'show'}`} onClick={this.onEditMode}>Add an item</button>
                {!isEditMode && <div>
                    <TextareaAutosize className="card-add-input"
                        onBlur={() => this.onEditMode()}
                        onChange={this.handleChange}
                        onKeyDown={(ev) => this.onAddTodo(ev)}
                        value={title}
                        autoFocus
                        placeholder="Add an item"
                        autoCorrect="false"
                        aria-label="empty textarea" />
                    <button className="btn-add-todo" onClick={this.onAddTodo}>Save</button>
                </div>}
            </div>
        </section>
        )
    }
}


