import { Component } from 'react'
import { Link } from 'react-router-dom'



export class CardPreview extends Component {

    render() {
        const { board, card, currList} = this.props;
        return (
            <>
                        <div className="card-preview">
                            <Link to={`/board/${board._id}/${currList?.id}/${card.id}`}>
                                <h4>{card.title}</h4>
                            </Link>
                        </div>
                    
            </>
        )
    }
}
