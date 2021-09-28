import React, { Component } from 'react';
import { connect } from 'react-redux';
import { boardService } from '../services/board.service';
import { utilService } from '../services/util.service';

class _CardDetails extends React.Component {


  render() {

    return (
     <section className="card-details">


     </section>
    )
  }
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
