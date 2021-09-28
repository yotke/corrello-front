import React, { Component } from 'react'

export class CardDetailsChecklistDelete extends Component {

    onClick = () => {
        const { checklist, onDeleteChecklist } = this.props
        onDeleteChecklist(checklist.id)
    }

    render() {
        return (
            <button onClick={this.onClick}>Delete</button>
        )
    }
}