import React from 'react'
import { connect } from 'react-redux'
import { loadBoard } from '../store/board.actions.js'


class _CardDetails extends React.Component {

    state = {


    }

    componentDidMount() {
        var boardId = 'b101';
        this.props.loadBoard(boardId)
        
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
        cars: state.boardModule.board
    }
}

const mapDispatchToProps = {
    loadBoard
}

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)
