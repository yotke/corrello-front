import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadBoard } from '../store/board.actions.js'


class _CardDetails extends React.Component {

    state = {
        card: null,
        list: null
    }

    componentDidMount() {
        console.log('componentDidMount')
        var boardId = 'b101';
        this.props.loadBoard(boardId)

        const { listId, cardId } = this.props.match.params
        console.log('listId', listId, 'cardId', cardId)

        this.setLocalState(listId, cardId)
    }

    setLocalState = (listId, cardId) => {
        //debugger




        const { board: lists } = this.props
        console.log('board',board)


        const list = lists.find(list => list._id === listId)

        console.log('list',list)

        // const { cards } = list
        // console.log('cards', cards)



    }

    render() {
        return (
            <main>

            </main>
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
