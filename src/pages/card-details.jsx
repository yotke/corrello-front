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

class _CardDetails extends React.Component {

    state = {
        card: null,
        list: null
    }

    componentDidMount() {
        console.log('componentDidMount')

        const { listId, cardId } = this.props.match.params

        console.log('listId', listId, 'cardId', cardId)

        this.setLocalState(listId, cardId)
    }

    setLocalState = (listId, cardId) => {
        //debugger
        console.log('this.props', this.props)
        
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

    onCopyCardToList = () => {
        const { list, card } = this.state
        const { board } = this.props
        card.id = utilService.makeId()
        const updatedBoard = boardService.addCardToBoard(board, list.id, card)
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
        //card = {...card }

        debugger
        const member = {
            _id: utilService.makeId(),
            username: `(user) ${utilService.makeLorem(utilService.getRandomIntInclusive(1, 2))}`,
            fullname: `(name) ${utilService.makeLorem(utilService.getRandomIntInclusive(1, 3))}`,
            imgUrl: "https://ca.slack-edge.com/T021743D5T8-U024HLL8UQZ-caf8640ec902-512"
        }

        if(!card.members) card.members = []

        card.members.push(member)
        this.setState({ card }, this.onSaveCardToBoard())
    }

    onSaveChecklist = () => {
        const { card } = this.state
        //card = {...card }

        debugger
        const checklist = {
            id: utilService.makeId(),
            title: `(title) ${utilService.makeLorem(utilService.getRandomIntInclusive(2, 4))}`,
            todos: []
        }

        for (let i = 0; i < utilService.getRandomIntInclusive(1, 6); i++) {
            const todo = {
                id: utilService.makeId(),
                title: `(todo) ${utilService.makeLorem(utilService.getRandomIntInclusive(2, 4))}`,
                isDone: false
            }
            checklist.todos.push(todo)
        }

        if(!card.checklists) card.checklists = [] 
        
        card.checklists.push(checklist)
        this.setState({ card }, this.onSaveCardToBoard())
    }

    onSaveLabels = () => {
        const { card } = this.state
        //card = {...card }   
        
        debugger
        const labelId = `l${utilService.makeId(3)}`
        if(!card.labelIds) card.labelIds = []
        card.labelIds.push(labelId)

        this.setState({ card }, this.onSaveCardToBoard())
    }

    onChangeDueDate = () => {
        const { card } = this.state
        //card = {...card }

        debugger
        card.dueDate = Date.now()
        this.setState({ card }, this.onSaveCardToBoard())
    }

    onChangeListTitle = () => {
        const { card } = this.state
        //card = {...card }

        debugger
        card.title = `(title) ${utilService.makeLorem(utilService.getRandomIntInclusive(2, 3))}`
        this.setState({ card }, this.onSaveCardToBoard())
    }
    

    onDeleteChecklist = (checklistId) => {
        const { card } = this.state
        //card = {...card }

        const checkListIdx = card.checklists.findIndex(checkList => checkList.id === checklistId ) 
        if(checkListIdx === -1) return

        card.checklists.splice(checklistId, 1)
        this.setState({ card }, this.onSaveCardToBoard())
    }


    onCopyCard = () => {
        // const { board, onSaveBoard } = this.props
        const { card } = this.state
        debugger
        const newCard = { ...card }
        const id = utilService.makeId()
        newCard.title = `${id} copy of ${newCard.id}`
        newCard.id = id

        this.onCopyCardToList(newCard)
    }

    render() {
        const { card, list } = this.state

        if (!card) return <div>Loading Card...</div>
        //debugger
        const { board } = this.props
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
                            {(!!card.description) && <CardDetailsDesc card={card} />}
                            
                            {(!!card.checklists && !!card.checklists.length) && card.checklists.map((checklist, index) => <CardDetailsChecklist checklist={checklist} key={index} checklistId={checklist.id} onDeleteChecklist={this.onDeleteChecklist}/>)}
                            {!!activities && <CardDetailsActivity card={card} activities={activities} />}
                        </div>
                        <div className="card-details-sidebar flex column">
                            <div>
                                <h3>LIST</h3>
                                <button className="btn-list-title btn-card-details" onMouseDown={this.onChangeListTitle}>Change title</button>

                                <h3>ADD TO CARD</h3>
                                <button className="btn-card-members btn-card-details" onMouseDown={this.onSaveMembers}>Members</button>
                                <button className="btn-card-labels btn-card-details" onMouseDown={this.onSaveLabels}>Labels</button>
                                <button className="btn-card-checklist btn-card-details" onMouseDown={this.onSaveChecklist}>Checklist</button>
                                <button className="btn-card-dates btn-card-details" onMouseDown={this.onChangeDueDate}>Dates</button>
                            </div>
                            <div>
                                <h3>ACTIONS</h3>
                                <button className="btn-card-copy btn-card-details" onMouseDown={this.onCopyCard}>Copy</button>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board
    }
}

const mapDispatchToProps = {
    loadBoard,
    onSaveBoard
}

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)
