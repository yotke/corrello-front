import React, { Component } from "react"
import { TextareaAutosize } from '@material-ui/core';

export class TodoPreview extends Component {

    state = {
        todo: null,
        isInputSelected: false
    }

    componentDidMount() {
        const { todo } = this.props
        this.setState({ todo })
    }

    handleChange = ({ target: { value } }) => {
        const { todo } = this.state
        todo.title = value
        this.setState({ todo })
    }

    onEditClicked = () => {
        this.setState({ isInputSelected: true }, () => {
            this.selectedInput.focus()
            this.selectedInput.select()
        })
    }

    onFinishEditing = (ev) => {
        if (ev.type === 'keydown' && ev.key !== 'Enter') return
        
        const { onSaveTodo } = this.props
        const { todo } = this.state
        this.setState({ isInputSelected: false }, () => {
            this.selectedInput.blur()
            onSaveTodo(todo)
        })
    }

    onToggleDone = () => {
        const { onSaveTodo } = this.props
        const { todo } = this.state
        todo.isDone = !todo.isDone
        this.setState({ todo }, onSaveTodo(this.state.todo))
    }

    render() {
        const { todo, isInputSelected } = this.state
        const { onRemoveTodo } = this.props
        if (!todo) return ''
        const { title, isDone } = todo
        return (
            <div className="todo-preview-container flex column">
                <div className="todo-preview flex align-center">
                    {isDone ?
                        <button className="checked" onClick={() => this.onToggleDone()}>+</button> :
                        <button className="non-checked" onClick={() => this.onToggleDone()}>-</button>}
                    <TextareaAutosize className={isDone ? 'done' : ''}
                        onFocus={this.onEditClicked}
                        onBlur={(ev) => this.onFinishEditing(ev)}
                        onKeyDown={(ev) => this.onFinishEditing(ev)}
                        onChange={this.handleChange}
                        value={title}
                        autoCorrect="false"
                        autoComplete="false"
                        ref={(input) => { this.selectedInput = input }}
                        aria-label="empty textarea" />
                    {!isInputSelected && <button className="delete-svg" onClick={() => onRemoveTodo(todo.id)}>Remove</button>}
                </div>
                <div className={`checklist-controllers flex align-center ${isInputSelected ? 'show' : 'hidden'}`}>
                    <button className="primary-btn" onClick={() => this.onFinishEditing()}>Save</button>
                </div >
            </div >
        )
    }
}