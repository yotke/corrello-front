import React from 'react'
import { boardService } from '../../services/board.service';
import { CardChecklist } from './card-details-checklist';

export class CardChecklists extends React.Component {

<<<<<<< HEAD
    onSaveCardChecklists(checklists) {
=======
    onSaveCardChecklists(checklists, activityType, txt) {
        console.log('enter your check list :',checklists);
>>>>>>> f7452d21a2cf5d6c747dfa2187fda8babb19796a
        const { board, card, onSaveBoard } = this.props
        card.checklists = checklists;
        const updatedBoard = boardService.updateCardInBoard(board, card)
        console.log('updatedBoard',updatedBoard)
        updatedBoard = boardService.addActivityToBoard(updatedBoard, activityType, txt, card)
        console.log('updatedBoard',updatedBoard)
        onSaveBoard(updatedBoard)   
        onSaveBoard(board);
    }

    onSaveChecklist = (checklist) => {
        if (!checklist.title) return
        const { checklists } = this.props
        const checklistIdx = checklists.findIndex(currChecklist => currChecklist.id === checklist.id)
        checklists[checklistIdx] = checklist
        this.onSaveCardChecklists(checklists, 'added', checklist.title)
    }

    onDeleteChecklist = (checklist) => {
        let { checklists } = this.props
        checklists = checklists.filter(currChecklist => currChecklist.id !== checklist.id)
        this.onSaveCardChecklists(checklists, 'removed', checklist.title)
    }

    render() {
        const { checklists,board, card, onSaveBoard } = this.props
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





