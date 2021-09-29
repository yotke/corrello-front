import React, { Component } from 'react'
import { ChecklistPreview } from './checklist-preview'
import { boardService } from '../../../services/board.service';

export class CardChecklists extends Component {

    onSaveChecklist = (checklist) => {
        if (!checklist.title) return
        const { onSaveCardChecklists, checklists } = this.props
        const checklistIdx = checklists.findIndex(currChecklist => currChecklist.id === checklist.id)
        checklists[checklistIdx] = checklist
        onSaveCardChecklists(checklists)
    }

    onDeleteChecklist = (checklist) => {
        let { onSaveCardChecklists, checklists } = this.props
        checklists = checklists.filter(currChecklist => currChecklist.id !== checklist.id)
        onSaveCardChecklists(checklists)
    }

    render() {
        const { checklists } = this.props
        return (
            <section className="card-checklists-container">
                {checklists.map(checklist =>
                    <ChecklistPreview 
                        key={checklist.id}
                        checklist={checklist}
                        onDeleteChecklist={this.onDeleteChecklist}
                        onSaveChecklist={this.onSaveChecklist} />)}
            </section>
        )
    }
}





