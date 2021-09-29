import React, { Component } from 'react'

export class ChecklistDelete extends Component {

    onClick = () => {
        console.log('onClick')
        const { checklist, onDeleteChecklist } = this.props
        onDeleteChecklist(checklist)
    }

    render() {
        return (
            <button onClick={this.onClick}>Delete</button>
        )
    }
}