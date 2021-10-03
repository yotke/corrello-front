import React from "react"
import { Link, NavLink } from 'react-router-dom'
import { boardService } from "../../services/board.service"
import { CardChecklistItem } from "./card-details-checklist-item"

export class CardChecklist extends React.Component {
    state = {
        isOnEditState: false
    }
    onEditCheckListItem = (checklistItem) => {
        const { board, card, onSaveBoard } = this.props
        card.checklist ? card.checklist.push(checklistItem) : card.checklist = [checklistItem];
        const updatedBoard = boardService.updateCardInBoard(board, card)
        onSaveBoard(updatedBoard)
        onSaveBoard(board);
    }
    onAddingchecklistItem = (checklistItem) => {
        const { board, card, onSaveBoard } = this.props
        card.checklist ? card.checklist.push(checklistItem) : card.checklist = [checklistItem];
        const updatedBoard = boardService.updateCardInBoard(board, card)
        onSaveBoard(updatedBoard)
        onSaveBoard(board);
        this.setState({ isOnEditState: false })
    }

    render() {
        const { card } = this.props
        const { isOnEditState } = this.state
        return (
            <section className="checklist-container" >
                <div className="checklist-header">
                    <h3>Checklist</h3>
                    <button className="checklist-delete-btn">Delete</button>
                </div>
                <div className="checklist-list-container">
                    <div className="checklist-progress-bar">
                        <div className="checklist-progress-bar-current js-checklist-progress-bar checklist-progress-bar-current-delay" style="width: 60%;">
                        </div>
                    </div>
                    {card.checklist && card.checklist.map((checklistItem, itemIdx) =>
                        <CardChecklistItem key={itemIdx}
                            checklistItem={checklistItem}
                            onAddingListItem={this.onEditCheckListItem} />
                    )}
                </div>
                <div className="add-checklist-item-container">
                    {isOnEditState ? (
                        <CardChecklistItem
                            onAddingListItem={this.onAddingchecklistItem} />
                    ) :
                        (
                            <button className="checklist-add-item" onClick={() => {
                                this.setState({ isOnEditState: true })
                            }}>Add an item</button>
                        )
                    }
                </div>
            </section>

        )
    }

}