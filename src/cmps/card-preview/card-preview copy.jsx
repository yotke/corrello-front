import { Component } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom'
import { Card } from '../single-card';

export class CardPreview extends Component {

    render() {
        const { board, card, currList, isDragged } = this.props;
        return (
            <>
                <div className="card-preview-container">
                    <Link className="clean-link" to={`/board/${board._id}/${currList?.id}/${card.id}`}>
                        <Card card={card} board={board} isDragged={isDragged}/>
                    </Link>
                </div>
            </>
        )
    }
}


