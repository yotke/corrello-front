import { Component } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom'
import { Card } from '../single-card';

export class CardPreview extends Component {

    draggableStyle = (style, snapshot) => {
        if (!snapshot.isDropAnimating) {
            return style;
        }
        return {
            ...style,
            transitionDuration: `0.001s`,
        }
    }


    render() {
        const { board, card, currList, cardIdx } = this.props;
        return (
            <>
                            <Draggable draggableId={card.id} index={cardIdx}>
                    {(provided, snapshot) => (
                <div className="card-preview-container"  {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                style={this.draggableStyle(provided.draggableProps.style, snapshot)} >
                    <Link className="clean-link" to={`/board/${board._id}/${currList?.id}/${card.id}`}>
                        <Card card={card} board={board}/>
                    </Link>
                </div>
                         )}
                         </Draggable>
            </>
        )
    }
}


