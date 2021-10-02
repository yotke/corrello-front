import { Component } from 'react';
import { utilService } from '../../services/util.service';
import { ColorPalette } from '../ColorPalette';
import { Popover } from './Popover';
import { boardService } from '../../services/board.service'
import { onSaveBoard } from '../../store/board.actions'
import { connect } from 'react-redux';
import { FileUpload } from '../FileUpload';



class _PopoverCover extends Component {

    state = {
        bgColor: this.props.card.style?.bgColor || '',
        coverMode: this.props.card.style?.coverMode || null,
        bgImgUrl: this.props.card.style?.bgImgUrl || '',
    }
    componentDidMount() {
        this.setState({})
    }

    saveCover = ({ bgImgUrl, bgColor, coverMode }) => {
        const { card, onSaveBoard, board } = this.props
        card.style = {
            coverMode,
            bgImgUrl,
            bgColor,
        }
        const updatedBoard = boardService.updateCardInBoard(board, card)
        onSaveBoard(updatedBoard)
    }



    onFileUpload = (fileUrl) => {
        this.setState({ bgImgUrl: fileUrl, bgColor: '', coverMode: 'full' })
        this.onSaveCover()
    }

    handleChange = ({ target }) => {
        let { coverMode } = this.state
        if (!coverMode) coverMode = 'header';
        this.setState({ bgColor: target.value, bgImgUrl: '', coverMode: coverMode }, this.onSaveCover)
    }

    onRemoveCover = () => {
        this.setState({ bgColor: '', coverMode: '', bgImgUrl: '' }, this.onSaveCover)
        // this.props.removeCoverBg()
    }

    onSetMode = (mode) => {
        this.setState({ coverMode: mode }, this.onSaveCover)
    }

    onSaveCover = () => {
        const { bgColor, bgImgUrl, coverMode } = this.state
        if ((coverMode && bgImgUrl) || (coverMode && bgColor) || (!coverMode && !bgColor && !bgImgUrl)) this.saveCover(this.state)
        else return
    }



    render() {
        const { bgColor, coverMode, bgImgUrl } = this.state
        return <Popover title="Cover">
            <div className="cover-pop-over-content">
                <h4>SIZE</h4>
                <div className="cover-options flex justify-space-between align-center">
                    <div className={`header-cover-preview ${coverMode === 'header' ? 'selected' : ''}`} onClick={() => this.onSetMode('header')} >
                        <div className="header-section" style={{ backgroundColor: bgColor ? bgColor : '#5e6c844d' }}></div>
                    </div>
                    <div className={`full-cover-preview ${coverMode === 'full' ? 'selected' : ''}`} onClick={() => this.onSetMode('full')} style={{ backgroundColor: bgColor ? bgColor : '#5e6c844d' }}> </div>
                </div>
                {(bgColor || bgImgUrl) && <div className="flex">
                    <button className="secondary-btn full" onClick={this.onRemoveCover}>Remove Cover</button>
                </div>}
                <h4>COLOR</h4>
                <ColorPalette selectedColor={bgColor} handleChange={this.handleChange} />
                <h4>ATTACHMENTS</h4>
                <FileUpload onFileUpload={this.onFileUpload} />
            </div>
        </Popover>
    }
}
const mapDispatchToProps = {
    onSaveBoard,
}
function mapStateToProps(state) {
    return {
        board: state.boardModule.board
    }
}


export const PopoverCover = connect(mapStateToProps, mapDispatchToProps)(_PopoverCover)