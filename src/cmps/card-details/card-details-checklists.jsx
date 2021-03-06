import React from 'react'
import { boardService } from '../../services/board.service';
import { CardChecklist } from './card-details-checklist';
import { activityService } from '../../services/activity.service';

export class CardChecklists extends React.Component {

    onSaveCardChecklists(checklists, activityType, txt) {
        const { board, card, onSaveBoard } = this.props
        card.checklists = checklists;
        let updatedBoard = boardService.updateCardInBoard(board, card)
        updatedBoard = activityService.addActivityToBoard(updatedBoard, activityType, txt, card)
        onSaveBoard(updatedBoard)
    }

    onSaveChecklist = (checklist, activityType) => {
        if (!checklist.title) return
        const { checklists } = this.props
        const checklistIdx = checklists.findIndex(currChecklist => currChecklist.id === checklist.id)
        checklists[checklistIdx] = checklist
        this.onSaveCardChecklists(checklists, activityType, checklist.title)
    }

    onDeleteChecklist = (checklist) => {
        let { checklists } = this.props
        checklists = checklists.filter(currChecklist => currChecklist.id !== checklist.id)
        this.onSaveCardChecklists(checklists, 'removed', checklist.title)
    }

    render() {
        const { checklists, board, card, onSaveBoard } = this.props
        return (
            <section className="card-checklists-container_new">
                {checklists && checklists.map(checklist =>
                    <CardChecklist
                        card={card}
                        board={board}
                        checklists={checklists}
                        onSaveBoard={onSaveBoard}
                        key={checklist.id}
                        checklist={checklist}
                        onDeleteChecklist={this.onDeleteChecklist}
                        onSaveChecklist={this.onSaveChecklist} />
                )}
            </section>
        )
    }
}





