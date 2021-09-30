import { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../single-card';



export class CardPreview extends Component {

    render() {
        const { board, card, currList } = this.props;
        return (
            <>
                <div className>
                    <Link className="clean-link" to={`/board/${board._id}/${currList?.id}/${card.id}`}>
                        <Card card={card} board={board} />
                    </Link>
                </div>

            </>
        )
    }
}
