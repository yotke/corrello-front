import React, { Component } from 'react'
import { connect } from 'react-redux'


class _Board extends Component {

  state = {

  }

  render() {


  }
}

function mapStateToProps(state) {
  return {
      board: state.boardModule.board,
  }
}

export const Board = connect(mapStateToProps, null)(_Board)