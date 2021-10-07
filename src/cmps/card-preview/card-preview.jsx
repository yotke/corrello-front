import { Component } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom'
import { Card } from '../single-card';



export class CardPreview extends Component {

    render() {
        const { board, card, currList, key ,isDragged} = this.props;
        return (

            <>

                        <div className="card-preview-container">
                            <Link className="clean-link" to={`/board/${board._id}/${currList?.id}/${card.id}`}>
                                <Card className={isDragged?"clean-link on-grab-drag-drop":'clean-link'} card={card} board={board} />
                            </Link>
                        </div>

                
            
            </>
        )}}
        

