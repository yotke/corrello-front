//import { noteService } from '../services/note.service.js';

import React, { Component } from 'react'

export class CardDetailsChecklistTodo extends Component {

    state = {
        isChecked: false
    }

    componentDidMount() {
        const { todo } = this.props
        const isChecked = todo.isChecked
        this.setState({ isChecked })
    }

    handleOnTodoChecked = (ev) => {
        const id = ev.target.id;
        const { index, checklistId, todo, updateTodoStatusInCardChecklist} = this.props
        //const defaultChecked = ev.target.defaultChecked

        const { isChecked } = this.state
        const newIsChecked = !isChecked

        const todoId = id.split('-')[1]
    
        updateTodoStatusInCardChecklist(checklistId, todoId, isChecked)
            .then(() => {
                this.setState({ isChecked: newIsChecked })
            })
    }

    render() {
        const { isChecked } = this.state
        const { index, todo } = this.props
        if (!todo) return <div>Loading todo...</div>
        //debugger

        //console.log(' render() - const { isChecked } = this.state', isChecked);

        return (
            <span><input type="checkbox" id={`todo-${todo.id}`} name={`todo-${todo.id}`}
                // defaultChecked={isChecked}
                checked={isChecked}
                value={isChecked} onChange={this.handleOnTodoChecked} />
                <label for={`todo-${index}`}>{todo.title}</label><br /> </span>
        )
    }
}