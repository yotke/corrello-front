import { Component } from "react"
import { PopoverLabelPreview } from "./PopoverLabelPreview"
import { Popover } from './Popover'
import { onSaveBoard } from  '../../store/board.actions.js';
import { connect } from 'react-redux'
import { boardService } from '../../services/board.service'
import {utilService} from '../../services/util.service.js';

class _PopoverLabels extends Component {

    state = {
        presentedLabels: '',

    }

    componentDidMount() {
        this.setState({ presentedLabels: this.props.board.labels })

    }

    saveLabel = (labelToSave) => {
        const { board, onSaveBoard } = this.props
        if (labelToSave.id) {
            const idx = board.labels.findIndex(label => label.id === labelToSave.id)
            board.labels.splice(idx, 1, labelToSave)
        }
        else {
            labelToSave.id = utilService.makeId()
            board.labels.push(labelToSave)
        }
        onSaveBoard(board)
    }

    render() {
        const { presentedLabels} = this.state
        if (!presentedLabels) return '';
        return (<>
                <Popover title={"Labels"} >
                    <div className="labels-pop-over">
                        <h4>LABELS</h4>
                        <ul className="clean-list">

                            {presentedLabels.map(label => <PopoverLabelPreview key={label.id} label={label}
                       />)}
                        </ul>
                    </div>
                </Popover>
        </>
        )
    }

}
function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    }
}

const mapDispatchToProps = {
    onSaveBoard
}


export const PopoverLabels = connect(mapStateToProps, mapDispatchToProps)(_PopoverLabels)
