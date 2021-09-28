import React, { Component } from 'react'
import { connect } from 'react-redux'

export class _CardDetails extends React.Component {

    render() {
        return (
            <section className="card-details-container">
                <div className="card-details-header">Card Details</div>
                <main>
                    <div className="card-details-main-cmp-container">
                        here is all the components of details
                    </div>
                    <div className="card-details-btn-bar">
                        {/* <h3>Add To Card</h3>
                        <button className="btn-members-card-details">Members</button>
                        <button className="btn-labels-card-details">Labels</button>
                        <button className="btn-checklist-card-details">Checklist</button>
                        <button className="btn-dates-card-details">Dates</button>
                        <button className="btn-attachment-card-details">Attachment</button>
                        <button className="btn-cover-card-details">cover</button>
                        <h3>Power-Ups</h3>
                        <h3>Automation</h3>
                        <h3>Actions</h3> */}
                    </div>
                </main>

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
    closePopover,
    openPopover,

}

export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)
