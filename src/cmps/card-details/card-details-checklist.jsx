import React from "react"
import { Link, NavLink } from 'react-router-dom'
import { boardService } from "../../services/board.service"
import { utilService } from "../../services/util.service"
import { CardChecklistItem } from "./card-details-checklist-item"
import { ProgressBar } from "./progress-bar"
import { ReactComponent as CheckIcon } from '../../assets/img/cmps/card-details/icon-checklist.svg'

export class CardChecklist extends React.Component {
    state = {
        isOnEditState: false,
        doneTodos: 0,
        percentComplite: 0
    }

    onBoxChecked = (diff) => {
        const { checklist } = this.props
        const doneTodos = this.state.doneTodos + diff
        console.log('doneTodos', doneTodos);
        const totTodo = checklist.todos.length
        const complite = doneTodos / totTodo
        console.log('complite', complite * 100);
        this.setState({ doneTodos })
        this.setState({ percentComplite: complite * 100 })
    }

    onEditlistItem = (checklistItem, todoId) => {
        console.log('todoId', todoId);
        const { checklist, onSaveChecklist } = this.props
        const todoIdx = checklist.todos.findIndex(todo => {
            return todo.id === todoId
        })
        console.log('todoIdx', todoIdx);
        checklist.todos[todoIdx].title = checklistItem

        onSaveChecklist(checklist)
        this.setState({ isOnEditState: false })
    }

    onSaveChecklistItem = (checklistItem) => {
        const todo = {}
        todo.id = utilService.makeId()
        todo.isChecked=false
        todo.title = checklistItem
        const { checklist, onSaveChecklist } = this.props
        checklist.todos.push(todo)
        onSaveChecklist(checklist)
        this.setState({ isOnEditState: false })
    }

    render() {
        const { card, checklist } = this.props
        const { isOnEditState, percentComplite } = this.state
        return (
            <section className="checklist-container" >
                <div className="checklist-header">
                <CheckIcon className="checklist-logo"/>
                    {checklist && <h3>{checklist.title}</h3>}
                    {!checklist && <h3>checklist</h3>}
                    <button className="checklist-delete-btn checklist-btn" onClick={() => {
                        this.props.onDeleteChecklist(checklist)
                    }}>Delete</button>
                </div>
                <div className="checklist-wrapper">

                <div className="progress-bar-container">
                    <ProgressBar completed={percentComplite} />
                </div>
                <div className="checklist-list-container">
                    {checklist && checklist.todos.map((todo, itemIdx) =>
                        <div className="card-checklist-item-div" key={itemIdx}>
                            <CardChecklistItem
                                onBoxChecked={this.onBoxChecked}
                                todo={todo}
                                onAddingListItem={this.onEditlistItem} />
                        </div>
                    )}
                </div>
                <div className="add-checklist-item-container">
                    {isOnEditState ? (
                        <CardChecklistItem
                            onBoxChecked={this.onBoxChecked}
                            onAddingListItem={this.onSaveChecklistItem} />
                    ) :
                        (
                            <button className="checklist-add-item checklist-btn" onClick={() => {
                                this.setState({ isOnEditState: true })
                            }}>Add an item</button>
                        )
                    }
                </div>


</div>
            </section>

        )
    }

}