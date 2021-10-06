import { Component } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom'
import { Card } from '../single-card';



export class CardPreview extends Component {

    render() {
        const { board, card, currList, key } = this.props;
        return (

            <>

                        <div>
                            <Link className="clean-link" to={`/board/${board._id}/${currList?.id}/${card.id}`}>
                                <Card className="clean-link" card={card} board={board} />
                            </Link>
                        </div>

                
            
            </>
        )}}
        

