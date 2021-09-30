import { Height } from '@material-ui/icons'
import { Component } from 'react'
import { connect } from 'react-redux'
import { onSaveBoard } from '../store/board.actions'
import { CardPreviewLabel } from './card-preview/card-preview-labels'



class _Card extends Component {

    componentDidMount() {
        
    }

    

    render() {
        const { card, board } = this.props
        let mystyle = {}
        if(card.style) {
         mystyle = {
            backgroundColor: card.style.bgColor,
            backgroundImage: "url(" + card.style.background + ")",
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center', 
        } 
    } 

        return (

            <div className="card-preview-container">
                <div className="card-preview">
               {(card.style && card.style.bgColor) && <div className="card-preview-header" style={mystyle}>
                </div>}
            <div className="card-content">

       
                    <div className="card-preview-labels">

                    {card.labelIds && card.labelIds.map(labelId => <CardPreviewLabel key={labelId} labelId={labelId} labels={board.labels} isArchived={card.isArchived} />)}
                    </div>
                    <div className="card-preview-name clean-link">{card.title}</div>
                    </div>
                    
                    {/* {card.description && <h5>{card.description}</h5>} */}
                    </div>
            </div>
        )
    }
}

const mapDispatchToProps = {
    onSaveBoard
}

export const Card = connect(null, mapDispatchToProps)(_Card)