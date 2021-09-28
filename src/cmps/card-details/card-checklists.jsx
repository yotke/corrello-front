import React, { Component } from 'react'
import { ChecklistPreview } from './checklist-preview'

export class CardChecklists extends Component {


    onSaveChecklist = (checklist) => {
        if (!checklist.title) return
        const { onSaveCardChecklists, checklists } = this.props
        const checklistIdx = checklists.findIndex(currChecklist => currChecklist.id === checklist.id)
        checklists[checklistIdx] = checklist
        onSaveCardChecklists(checklists)
    }

    onRemoveChecklist = (checklist) => {
        let { onSaveCardChecklists, checklists } = this.props
        checklists = checklists.filter(currChecklist => currChecklist.id !== checklist.id)
        this.onCreateActivity('removed', checklist.title)
        onSaveCardChecklists(checklists)
    }

    onCreateActivity = (type, txt) => {
        let { card, board, onSaveBoard } = this.props
        const savedActivity = boardService.createActivity(type, txt, card)
        socketService.emit('app newActivity',savedActivity)
        board.activities.unshift(savedActivity)
        onSaveBoard(board)
    }

  
    render() {
        const { checklists } = this.props
        return (
            <section cardName="card-checklists-container">
                {checklists.map(checklist =>
                    <ChecklistPreview checklist={checklist}
                        key={checklist.id}
                        checklist={checklist}
                        onRemoveChecklist={this.onRemoveChecklist}
                        onSaveChecklist={this.onSaveChecklist}
                        onCreateActivity={this.onCreateActivity}/>)}
            </section>
        )

    }
}





