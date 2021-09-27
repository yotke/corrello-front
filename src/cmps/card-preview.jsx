import { Component } from 'react'
import { Link } from 'react-router-dom'



export class CardPreview extends Component {

    render() {
        const { board, card, currList} = this.props;
        return (
            <>
                        <div className="card-preview">
                            <Link className="card-content clean-link" to={`/board/${board._id}/${currList?.id}/${card.id}`}>
                                <h4 className="card-title">{card.title}</h4>
                            </Link>
                        </div>
                    
            </>
        )
    }
}
