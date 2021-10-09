import React from "react"
import { Link, NavLink } from 'react-router-dom'
import { boardService } from "../../services/board.service"
import { utilService } from "../../services/util.service"
import { CardChecklistItem } from "./card-details-checklist-item"
import { ProgressBar } from "./progress-bar"
import { ReactComponent as CheckIcon } from '../../assets/img/cmps/card-details/icon-checklist.svg'
import { ThreeSixty } from "@material-ui/icons"

export class CardChecklist extends React.Component {
    state = {
        isOnEditState: false,
        doneTodos: 0,
        percentComplite: 0
    }
    componentDidMount() {
        const { checklist } = this.props
        let counter = 0;
        checklist.todos.forEach(todo => {
            counter = todo.isChecked ? counter + 1 : counter
        })
        console.log(counter);
        this.setState({doneTodos:counter})
        const totTodo = checklist.todos.length
        const complite = counter / totTodo
        console.log('complite',complite);
        this.setState({ percentComplite: complite * 100 })
    }


    onBoxChecked = (diff) => {
        const { checklist } = this.props
        const doneTodos = this.state.doneTodos + diff
        const totTodo = checklist.todos.length
        const complite = doneTodos / totTodo
        this.setState({ doneTodos })
        this.setState({ percentComplite: complite * 100 })
    }


    updateTodoCheckedBox = (todo, activityType, ) => {
        const { checklist, onSaveChecklist } = this.props
        const todoId = todo.id
        const todoIdx = checklist.todos.findIndex(todo => {
            return todo.id === todoId
        })
        checklist.todos[todoIdx] = todo
        onSaveChecklist(checklist, activityType)

    }

    onEditlistItem = (checklistItem, todoId) => {
        const { checklist, onSaveChecklist } = this.props
        const todoIdx = checklist.todos.findIndex(todo => {
            return todo.id === todoId
        })
        checklist.todos[todoIdx].title = checklistItem
        const activityType = 'onEditlistItem'
        onSaveChecklist(checklist, activityType)
        this.setState({ isOnEditState: false })
    }

    onSaveChecklistItem = (checklistItem) => {
        const todo = {}
        todo.id = utilService.makeId()
        todo.isChecked = false
        todo.title = checklistItem
        const { checklist, onSaveChecklist } = this.props
        checklist.todos.push(todo)
        const activityType = 'onSaveChecklistItem'
        onSaveChecklist(checklist, activityType)
        this.setState({ isOnEditState: false })
    }

    render() {
        const { card, checklist } = this.props
        const { isOnEditState, percentComplite } = this.state
        return (
            <section className="checklist-container" >
                <div className="checklist-header">
                    <CheckIcon className="checklist-logo" />
                    {checklist && <h3>{checklist.title}</h3>}
                    {!checklist && <h3>checklist</h3>}
                    <button className="checklist-delete-btn checklist-btn" onClick={() => {
                        this.props.onDeleteChecklist(checklist)
                    }}>Delete</button>
                </div>
                <div className="checklist-wrapper">

                    <div className="progress-bar-container">
                        {console.log('percentComplite',percentComplite)}
                        <ProgressBar completed={percentComplite} />
                    </div>
                    <div className="checklist-list-container">
                        {checklist && checklist.todos.map((todo, itemIdx) =>
                            <div className="card-checklist-item-div" key={itemIdx}>
                                <CardChecklistItem
                                    onBoxChecked={this.onBoxChecked}
                                    todo={todo}
                                    updateTodoCheckedBox={this.updateTodoCheckedBox}
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