
import { Component } from 'react'
import { connect } from 'react-redux'
import {setLabelsMode} from '../../store/board.actions.js'
 class _CardPreviewLabel extends Component {
    state = {
        isLabelesOpend:false
    }
    get label() {
        const { labelId, labels } = this.props
        const label = labels.find(label => {
            return label.id === labelId
        })
        if (!label) return ''
        return label
    }

    toggleLabelsMode = (ev) => {
        ev.preventDefault();
        // (this.state.isLabelesOpend ? 'close-anim' : 'open-anim')

        this.setState({isLabelesOpend: !this.state.isLabelesOpend})
        this.props.setLabelsMode(this.state.isLabelesOpend)
        
    }

    

    render() {
        const label = this.label
        const {isLabelesOpend}= this.props
        return (
            <div className={`card-preview-label card-label ${isLabelesOpend ? 'open' : 'close'} `} style={{ backgroundColor: label.color }}
                onClick={this.toggleLabelsMode}>
                  {isLabelesOpend && label.title && (
                <span className="label-title">{label.title}</span>
              )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLabelesOpend: state.boardModule.isLabelesOpend,
    }
}

const mapDispatchToProps = {
    setLabelsMode
}

export const CardPreviewLabel = connect(mapStateToProps, mapDispatchToProps)(_CardPreviewLabel)
