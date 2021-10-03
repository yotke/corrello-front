import React from "react"
import { Link, NavLink } from 'react-router-dom'
import { boardService } from "../../services/board.service"
import { utilService } from "../../services/util.service"
import { CardChecklistItem } from "./card-details-checklist-item"

export class CardChecklist extends React.Component {
    state = {
        isOnEditState: false
    }
    onEditlistItem = (checklistItem, todoId) => {
        console.log('todoId',todoId);
        const { checklist, onSaveChecklist } = this.props
        const todoIdx = checklist.todos.findIndex(todo => {
            return todo.id === todoId
        })
        console.log('todoIdx',todoIdx);
        checklist.todos[todoIdx].title = checklistItem

        onSaveChecklist(checklist)
        this.setState({ isOnEditState: false })
    }
    onSaveChecklistItem = (checklistItem) => {
        const todo = {}
        todo.id = utilService.makeId()
        todo.title = checklistItem
        const { checklist, onSaveChecklist } = this.props
        checklist.todos.push(todo)
        onSaveChecklist(checklist)
        this.setState({ isOnEditState: false })
    }

    render() {
        const { card, checklist } = this.props
        const { isOnEditState } = this.state
        return (
            <section className="checklist-container" >
                <div className="checklist-header">
                    <h3>Checklist</h3>
                    <button className="checklist-delete-btn checklist-btn">Delete</button>
                </div>
                <div className="checklist-list-container">
                    {checklist && checklist.todos.map((todo, itemIdx) =>
                        <div className="card-checklist-item-div" key={itemIdx}>
                            <CardChecklistItem
                                todo={todo}
                                onAddingListItem={this.onEditlistItem} />
                        </div>
                    )}
                </div>
                <div className="add-checklist-item-container">
                    {isOnEditState ? (
                        <CardChecklistItem
                            onAddingListItem={this.onSaveChecklistItem} />
                    ) :
                        (
                            <button className="checklist-add-item checklist-btn" onClick={() => {
                                this.setState({ isOnEditState: true })
                            }}>Add an item</button>
                        )
                    }
                </div>

            </section>

        )
    }

}