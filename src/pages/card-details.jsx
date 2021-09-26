import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadBoard } from '../store/board.actions.js'
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
        var boardId = 'b101';
        await this.props.loadBoard(boardId)
debugger
        const { listId, cardId } = this.props.match.params
        
        console.log('listId', listId, 'cardId', cardId)

        this.setLocalState(listId, cardId)
    }

    setLocalState = (listId, cardId) => {
debugger
        console.log('this.props', this.props)
        const { board } = this.props
        const list = board.lists.find(list => list.id === listId)
        const { cards } = list
        var card = cards.find(card => card.id === cardId)
        this.setState({ card, list })
    }

    render() {
        const { card, list } = this.state
        
        if (!card) return <div>Loading Card...</div>
debugger
        const { board } = this.props
        const { activities } = board

        console.log('card',card)
        return (
            <div className="card-details-container flex column">
                <CardDetailsCover card={card} />
                <CardDetailsHeader card={card} />
                <div className="flex row">
                    <div className="card-details-main flex column">
                        <CardDetailsData card={card} />
                        <CardDetailsDesc card={card} />
                        <CardDetailsChecklists card={card} />
                        <CardDetailsActivity card={card} activities={activities} />
                    </div>
                    <div className="card-details-sidebar flex column">
                        
                        
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board
    }
}

const mapDispatchToProps = {
    loadBoard
}

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)
