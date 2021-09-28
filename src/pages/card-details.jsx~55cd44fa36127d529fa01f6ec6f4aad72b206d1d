<<<<<<< HEAD
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { boardService } from '../services/board.service';
import { utilService } from '../services/util.service';

class _CardDetails extends React.Component {

=======
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { boardService } from '../services/board.service'
import { utilService } from '../services/util.service'
import { loadBoard, onSaveBoard } from '../store/board.actions.js'
import { CardDetailsCover } from '../cmps/card-details-cmps/card-details-cover'
import { CardDetailsHeader } from '../cmps/card-details-cmps/card-details-header'
import { CardDetailsData } from '../cmps/card-details-cmps/card-details-data'
import { CardDetailsDesc } from '../cmps/card-details-cmps/card-details-desc'
import { CardDetailsChecklist } from '../cmps/card-details-cmps/card-details-checklist'
import { CardDetailsActivity } from '../cmps/card-details-cmps/card-details-activity'
import { IconHeader } from '../assets/img/cmps/card-details/icon-activity.png'
import CoIconHeadererIcon from '../assets/img/cmps/card-details/icon-activity.png';
import { closePopover, openPopover } from '../store/popover.actions.js'
import {CardDetailsLabels} from '../cmps/CardDetailsLabels.jsx'


class _CardDetails extends React.Component {

    state = {
        card: null,
        list: null
    }

    componentDidMount() {
        const { listId, cardId } = this.props.match.params
        this.setLocalState(listId, cardId)
    }

    setLocalState = (listId, cardId) => {
        const { board } = this.props
        const list = board.lists.find(list => list.id === listId)
        const { cards } = list
        var card = cards.find(card => card.id === cardId)
        this.setState({ card, list })
    }

    onSaveCardToBoard = () => {
        const { card } = this.state
        const { board } = this.props
        const updatedBoard = boardService.updateCardInBoard(board, card)
        this.props.onSaveBoard(updatedBoard)
    }

    onCopyCardToList = (newCard) => {
        const { list } = this.state
        const { board } = this.props
        const updatedBoard = boardService.addCardToBoard(board, list.id, newCard)
        this.props.onSaveBoard(updatedBoard)
    }

    onSaveListToBoard = () => {
        const { list } = this.state
        const { board } = this.props
        const updatedBoard = boardService.updateListInBoard(board, list)
        this.props.onSaveBoard(updatedBoard)
    }

    onSaveMembers = () => {
        const { card } = this.state
        const member = {
            _id: utilService.makeId(),
            username: prompt("Write user name"),
            fullname: prompt("Write full name"),
            imgUrl: "https://ca.slack-edge.com/T021743D5T8-U024HLL8UQZ-caf8640ec902-512"
        }

        if (!card.members) card.members = []

        card.members.push(member)
        this.setState({ card }, this.onSaveCardToBoard())
    }

    onSaveChecklist = () => {
        const { card } = this.state
        const checklist = {
            id: utilService.makeId(),
            title: prompt("Write new checklist name"),
            todos: []
        }

        const newTodosCount = +prompt("How many todos to add?")

        for (let i = 0; i < newTodosCount; i++) {
            const todo = {
                id: utilService.makeId(),
                title: prompt("Write new todo name"),
                isDone: false
            }
            checklist.todos.push(todo)
        }

        if (!card.checklists) card.checklists = []

        card.checklists.push(checklist)
        this.setState({ card }, this.onSaveCardToBoard())
    }


    get cardLabels() {
        const { card: { labelIds } } = this.state
        const { board: { labels } } = this.props
        const cardLabels = labels.reduce((acc, label) => {
            if (labelIds.some(labelId => labelId === label.id)) acc.push(label)
            return acc
        }, [])
        return cardLabels
    }


    onSaveLabels = () => {
        const { card } = this.state
        //const newCard = {...card }   
        
        const labelId = `l${utilService.makeId(3)}`
        if (!card.labelIds) card.labelIds = []
        card.labelIds.push(labelId)
>>>>>>> 8fff5b9aaad5199d924ecae8a086ae21a918af3a

  render() {

<<<<<<< HEAD
    return (
     <section className="card-details">


     </section>
    )
  }
=======
    onChangeDueDate = () => {
        const { card } = this.state
        card.dueDate = Date.now()
        this.setState({ card }, this.onSaveCardToBoard())
    }

    onChangeCardTitle = () => {
        const { card } = this.state
        card.title = prompt("Rename card title")
        this.setState({ card }, this.onSaveCardToBoard())
    }


    onDeleteChecklist = (checklistId) => {
        const { card } = this.state

        const checkListIdx = card.checklists.findIndex(checkList => checkList.id === checklistId)
        if (checkListIdx === -1) return

        card.checklists.splice(checklistId, 1)
        this.setState({ card }, this.onSaveCardToBoard())
    }


    onOpenPopover = (ev, PopoverName) => {
        const elPos = ev.target.getBoundingClientRect()
        const props = {
            card: this.state.card,
            addFile: this.addFile
        }
        this.props.openPopover(PopoverName, elPos, props)
    }


    onCopyCard = () => {
        const { card } = this.state

        const newCard = { ...card }
        const id = utilService.makeId()
        const newTitle = prompt("Enter card title")
        newCard.title = `${newTitle} (copy ${newCard.title})`
        newCard.id = id

        this.onCopyCardToList(newCard)
    }

    onUpdateTodoStatus = (checklistId, todoId, isChecked) => {
        const { card } = this.state

        card.checklists.forEach((checklist, idx) => {
            if (checklist.id === checklistId) {
                checklist.todos.forEach((todo, idx) => {
                    if (todo.id === todoId) checklist.todos[idx].isDone = isChecked
                })
            }
        })

        this.setState({ card }, this.onSaveCardToBoard())
        return Promise.resolve()
    }

    onCreateNewTodo = (checklistId, todo) => {
        const { card } = this.state
        debugger
        const checklistIdx = card.checklists.findIndex(checklist => checklist.id === checklistId)
        if (checklistIdx === -1) return
        card.checklists[checklistIdx].todos.push(todo)

        this.setState({ card }, this.onSaveCardToBoard())
        return Promise.resolve()
    }

    render() {
        const { card, list } = this.state

        if (!card) return <div>Loading Card...</div>
        //debugger
        const { board , openPopover, closePopover} = this.props
        const { activities } = board
        //const { title, members, description, checklists, dueDate, style, attachs, isArchived } = card

        console.log('card', card)
        return (
            <section className="card-details-container">

                <h1>Head Line card</h1>

                <div className="card-body-container flex column">
                    <CardDetailsHeader card={card} />
                    <div>
                        <div className="card-details-main flex column">
                            {/* {<CardDetailsData card={card} />} */}
                            {(card.description) && <CardDetailsDesc card={card} />}

                            {(card.checklists && !!card.checklists.length) && <dir>
                                <h3>Check Lists</h3>
                                {card.checklists.map((checklist, index) =>
                                    <CardDetailsChecklist checklist={checklist}
                                        key={index}
                                        checklistId={checklist.id}
                                        onDeleteChecklist={this.onDeleteChecklist}
                                        onUpdateTodoStatus={this.onUpdateTodoStatus} 
                                        onCreateNewTodo={this.onCreateNewTodo}/>)}
                            </dir>}
                            {activities && <CardDetailsActivity card={card} activities={activities} />}
                        </div>
                        <div className="card-details-sidebar flex column">
                            <div>
                                <h3>CHANGE CARD</h3>
                                <button className="btn-list-title btn-card-details" onClick={this.onChangeCardTitle}>Rename title</button>


                                <h3>ADD TO CARD</h3>
                                <button className="btn-card-members btn-card-details" onClick={this.onSaveMembers}>Members</button>
                                <button className="btn-card-labels btn-card-details" onClick={this.onSaveLabels}>Labels</button>
                                <button className="btn-card-checklist btn-card-details" onClick={this.onSaveChecklist}>Checklist</button>
                                <button className="btn-card-dates btn-card-details" onClick={this.onChangeDueDate}>Dates</button>
                                <button className="btn-card-members btn-card-details" onMouseDown={this.onSaveMembers}>Members</button>
                                {/* <button className="btn-card-labels btn-card-details" onMouseDown={this.onSaveLabels}>Labels</button> */}

                                <button className="secondary-btn actions-btn"
                    onClick={(ev) => this.onOpenPopover(ev, 'LABELS')}>
                    <div className="actions-btn-content flex align-center">
                        <span>Labels</span>
                    </div>
                </button>
                                {!!this.cardLabels.length && <CardDetailsLabels
                                    labels={this.cardLabels}
                                    openPopover={openPopover}
                                    card={card} />}
                                <button className="btn-card-checklist btn-card-details" onMouseDown={this.onSaveChecklist}>Checklist</button>
                                <button className="btn-card-dates btn-card-details" onMouseDown={this.onChangeDueDate}>Dates</button>
                            </div>
                            <div>
                                <h3>ACTIONS</h3>
                                <button className="btn-card-copy btn-card-details" onClick={this.onCopyCard}>Copy</button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        );
    }
>>>>>>> 8fff5b9aaad5199d924ecae8a086ae21a918af3a
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  };
}

const mapDispatchToProps = {

};

export const CardDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_CardDetails);
