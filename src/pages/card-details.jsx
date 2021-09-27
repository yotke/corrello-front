import React, { Component } from 'react'
import { connect } from 'react-redux'
import { utilService } from '../services/util.service'
import { loadBoard, onSaveBoard } from '../store/board.actions.js'
import { CardDetailsCover } from '../cmps/card-details-cmps/card-details-cover'
import { CardDetailsHeader } from '../cmps/card-details-cmps/card-details-header'
import { CardDetailsData } from '../cmps/card-details-cmps/card-details-data'
import { CardDetailsDesc } from '../cmps/card-details-cmps/card-details-desc'
import { CardDetailsChecklists } from '../cmps/card-details-cmps/card-details-checklists'
import { CardDetailsActivity } from '../cmps/card-details-cmps/card-details-activity'

class _CardDetails extends React.Component {

    state = {
        card: null,
        list: null
    }

    async componentDidMount() {
        console.log('componentDidMount')
        //var boardId = 'b101';
        //await this.props.loadBoard(boardId)
        //debugger
        const { listId, cardId, boardId } = this.props.match.params

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

    onMembers = () => {
        const { board, onSaveBoard } = this.props
        const { card, list } = this.state

        const listIdx = board.lists.findIndex(currList => currList.id === list.id);
        const { cards } = board.lists[listIdx]
        const cardIdx = cards.findIndex(currCard => currCard.id === card.id);

        const member = {
            _id: utilService.makeId(),
            username: prompt("Enter username:"),
            fullname: prompt("Enter member:"),
            imgUrl: "https://www.google.com/img.jpg"
        }

        let newBoard = { ...board }
        newBoard.lists[listIdx].cards[cardIdx].members.push(member)
        const currList = newBoard.lists[listIdx]
        const currCard = currList.cards[cardIdx]

        onSaveBoard(newBoard)
            .then(() => {
                this.setState({
                    card: currCard,
                    list: currList
                })
            })
    }

    onChecklist = () => {
        const { board, onSaveBoard } = this.props
        const { card, list } = this.state

        const listIdx = board.lists.findIndex(currList => currList.id === list.id);
        const { cards } = board.lists[listIdx]
        const cardIdx = cards.findIndex(currCard => currCard.id === card.id);

        const checklist = {
            id: utilService.makeId(),
            title: prompt("Enter checklist title:"),
            todos: []
        }

        const count = +prompt("Enter checklist count:")

        for (let i = 0; i < count; i++) {
            const todo = {
                id: utilService.makeId(),
                title: prompt("Enter todo title:"),
                isDone: false
            }

            checklist.todos.push(todo)
        }

        let newBoard = { ...board }
        newBoard.lists[listIdx].cards[cardIdx].checklists.push(checklist)
        const currList = newBoard.lists[listIdx]
        const currCard = currList.cards[cardIdx]

        onSaveBoard(newBoard)
            .then(() => {
                this.setState({
                    card: currCard,
                    list: currList
                })
            })
    }

    onLabels = () => {
        const { board, onSaveBoard } = this.props
        const { card, list } = this.state

        const listIdx = board.lists.findIndex(currList => currList.id === list.id);
        const { cards } = board.lists[listIdx]
        const cardIdx = cards.findIndex(currCard => currCard.id === card.id);

        const labelId = `l${utilService.makeId(3)}`

        let newBoard = { ...board }
        newBoard.lists[listIdx].cards[cardIdx].labelIds.push(labelId)
        const currList = newBoard.lists[listIdx]
        const currCard = currList.cards[cardIdx]

        onSaveBoard(newBoard)
            .then(() => {
                this.setState({
                    card: currCard,
                    list: currList
                })
            })
    }

    onDates = () => {
        const { board, onSaveBoard } = this.props
        const { card, list } = this.state

        const listIdx = board.lists.findIndex(currList => currList.id === list.id);
        const { cards } = board.lists[listIdx]
        const cardIdx = cards.findIndex(currCard => currCard.id === card.id);

        let newBoard = { ...board }
        newBoard.lists[listIdx].cards[cardIdx].dueDate = Date.now()
        const currList = newBoard.lists[listIdx]
        const currCard = currList.cards[cardIdx]

        onSaveBoard(newBoard)
            .then(() => {
                this.setState({
                    card: currCard,
                    list: currList
                })
            })
    }

    onOpenCopy = () => {
        const { board, onSaveBoard } = this.props
        const { card, list } = this.state

        const listIdx = board.lists.findIndex(currList => currList.id === list.id);
        const { cards } = board.lists[listIdx]
        const cardIdx = cards.findIndex(currCard => currCard.id === card.id);

        let newBoard = { ...board }
        let newCard = { ...card }

        newCard.id = utilService.makeId()
        newBoard.lists[listIdx].cards.push(newCard)

        const currList = newBoard.lists[listIdx]
        const currCard = currList.cards[cardIdx]

        onSaveBoard(newBoard)
            .then(() => {
                this.setState({
                    card: currCard,
                    list: currList
                })
            })
    }

    render() {
        const { card, list } = this.state

        if (!card) return <div>Loading Card...</div>
        //debugger
        const { board } = this.props
        const { activities } = board

        console.log('card', card)
        return (
            <section className="card-details-container">

                <h1>Head Line card</h1>
                <div className="card-body-container flex column">
                    <CardDetailsHeader card={card} />
                    <div>
                        <div className="card-details-main flex column">
                            {/* {<CardDetailsData card={card} />} */}
                            {<CardDetailsDesc card={card} />}
                            {<CardDetailsChecklists card={card} />}
                            {<CardDetailsActivity card={card} activities={activities} />}
                        </div>
                        <div className="card-details-sidebar flex column">
                            <div>
                                <h3>ADD TO CARD</h3>
                                <button className="btn-card-members btn-card-details" onMouseDown={this.onMembers}>Members</button>
                                <button className="btn-card-labels btn-card-details" onMouseDown={this.onLabels}>Labels</button>
                                <button className="btn-card-checklist btn-card-details" onMouseDown={this.onChecklist}>Checklist</button>
                                <button className="btn-card-dates btn-card-details" onMouseDown={this.onDates}>Dates</button>
                            </div>
                            <div>
                                <h3>ACTIONS</h3>
                                <button className="btn-card-copy btn-card-details" onMouseDown={this.onOpenCopy}>Copy</button>
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
