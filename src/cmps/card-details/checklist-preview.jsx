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
        const { onSaveChecklist } = this.props
        let { checklist, checklist: { todos } } = this.state
        todos = todos.filter(currTodo => currTodo.id !== todoId)
        checklist.todos = todos
        onSaveChecklist(checklist)
    }

    render() {

        const { checklist, onRemoveChecklist, checklistId } = this.props

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
                                checklistId={checklistId}
                                todoId={todo.id}
                                onSaveTodo={onSaveTodo}
                                onRemoveTodo={onRemoveTodo}
                                onCreateActivity={onCreateActivity}
                            />)}
                    </ul>
                    <TodoAdd checklistId={checklistId} onCreateTodo={onCreateTodo} />
                </div>

            </div>
        )
    }
}