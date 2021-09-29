import React, { Component } from 'react'

import { TodoPreview } from './todo-preview.jsx'
import { ChecklistDelete } from './checklist-delete.jsx';
import { TodoAdd } from './todo-add.jsx';

export class ChecklistPreview extends Component {

    state = {
        checklist: null,
        isTitleEdit: false
    }

    componentDidMount() {
        const { checklist } = this.props
        this.setState({ checklist })
    }

    onSaveTodo = (todo) => {
        const { onSaveChecklist } = this.props
        let { checklist, checklist: { todos } } = this.state
        if (!todo.title) {
            todos = todos.filter(currTodo => currTodo.id !== todo.id)
            checklist.todos = todos
            onSaveChecklist(checklist)
            return
        }
        const todoIdx = todos.findIndex(currTodo => todo.id === currTodo.id)
        todos[todoIdx] = todo
        checklist.todos = todos
        onSaveChecklist(checklist)
    }

    onCreateTodo = (todo) => {
        const { onSaveChecklist } = this.props
        const { checklist } = this.state
        if (!checklist.todos) checklist.todos = []
        checklist.todos.push(todo)
        onSaveChecklist(checklist)
    }

    onRemoveTodo = (todoId) => {
<<<<<<< HEAD
=======
        //debugger
>>>>>>> db9ada28d03581c7fde3d4e23cc3d2dcf0a2e8b4
        const { onSaveChecklist } = this.props
        let { checklist, checklist: { todos } } = this.state
        todos = todos.filter(currTodo => currTodo.id !== todoId)
        checklist.todos = todos
        onSaveChecklist(checklist)
    }

    render() {
        const { checklist, onDeleteChecklist } = this.props
        
        return (
            <div className="checklists-container" >
                <div className="checklists-preview-container">
                    <div className="flex align-center">
                        <h3>{checklist.title}</h3>
                        <ChecklistDelete checklist={checklist} onDeleteChecklist={onDeleteChecklist} />
                    </div>
                    <ul className="checklist-checks">
                        {checklist.todos.map((todo, index) =>
                            <TodoPreview todo={todo} index={index} key={index}
                                todoId={todo.id}
                                onSaveTodo={this.onSaveTodo}
                                onRemoveTodo={this.onRemoveTodo}
                            />)}
                    </ul>
                    <TodoAdd checklist={checklist} onCreateTodo={this.onCreateTodo} />
                </div>

            </div>
        )
    }
}