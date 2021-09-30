import { Component } from 'react'
import { connect } from 'react-redux'
import { onSaveBoard } from '../store/board.actions'
import { CardPreviewLabel } from './card-preview/card-preview-labels'



class _Card extends Component {

    componentDidMount() {
    }

    render() {
        const { card, board } = this.props
        const mystyle = {
            color: "white",
            backgroundColor: "DodgerBlue",
            padding: "10px",
            fontFamily: "Arial"
        };
        return (

            <div className="card-preview-container">
                <header className="card-header" style={card.style&&{
                    backgroundColor: card.style.bgColor,
                    backgroundImage: "url(" + card.style.background + ")",
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    backgroundPosition: 'center'
                    }}>

                </header>
                <main>
                    {card.labelIds && card.labelIds.map(labelId => <CardPreviewLabel key={labelId} labelId={labelId} labels={board.labels} isArchived={card.isArchived} />)}
                    <h4 className="card-title">{card.title}</h4>
                    {/* {card.description && <h5>{card.description}</h5>} */}
                </main>
            </div>
        )
    }
}

const mapDispatchToProps = {
    onSaveBoard
}

export const Card = connect(null, mapDispatchToProps)(_Card)