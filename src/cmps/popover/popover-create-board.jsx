import { Component } from 'react'
import { connect } from 'react-redux'
import { ScreenOverlay } from "../screen-overlay";
import { ColorPalette } from "../color-palette";
import { closePopover } from "../../store/popover.actions";
import { onSaveBoard } from "../../store/board.actions";
import { withRouter } from 'react-router-dom';
import {ImagePalette} from '../imagePalette.jsx';
import {openPopover} from '../../store/popover.actions.js';
import {MoreHoriz, ThreeSixtyOutlined} from '@material-ui/icons';

class _PopoverCreateBoard extends Component {

    state = {
        title: '',
        color: ''
    }
    componentDidMount() {
        this.setState({ color: '#0079bf' })
    }

    handleChange = ({ target }) => {
        const { name, value } = target
        this.setState({ [name]: value })
    }
    
    onOpenPopover = (ev, PopoverName) => {
       
        const elPos = ev.target.getBoundingClientRect();
        console.log('board', this.props.board);
        const props = {
            handleChange : this.handleChange,
            color: this.state.color,
        }
        this.props.openPopover(PopoverName, elPos,props,  true );
    };
    onCreateBoard = async () => {
        const { title, color } = this.state
        const { loggedInUser, onSaveBoard, closePopover } = this.props
        const boardToSave = {
            createdBy: loggedInUser,
            title: title,
            createdAt: Date.now(),
            createdBy: {
                _id: "",
                fullname: "",
                imgUrl: ""
            },
            style: {
                background:color
            },
            labels: [
            ],
            members: [
    
            ],
            lists: [
            ],
            activities: [
            ]
        }
        try {
            await onSaveBoard(boardToSave)
            if (this.props.board) this.props.history.push(`/board/${this.props.board._id}`)
            closePopover()
        } catch (err) {
        }
    }

    render() {
        const { title, color } = this.state
        const { closePopover } = this.props
        return <ScreenOverlay goBack={closePopover} styleMode="darken">
            <div className="create-board-popover">
                <div className="flex align-center">
                    <div className="board-preview" style={{
                        backgroundColor: color,
                        backgroundImage:"url(" + color + ")",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center'
                        }}>
                        <input type="text" name="title" value={title}
                            onChange={this.handleChange} placeholder="Add board title" />
                    </div>
                    <div className="create-preview-colors">
                        <ImagePalette count={6} handleChange={this.handleChange} selectedColor={color} />
                        

                        <ColorPalette count={3} onOpenPopover={this.onOpenPopover} isGradient={false} handleChange={this.handleChange} selectedColor={color} />
                        {/* <div  className="add-image-box" onClick={(ev) => {
                            this.onOpenPopover(ev, 'IMAGE_PICKER')
                            ev.preventDefault()
                            ev.stopPropagation()
                    
                    }}>
                        <MoreHoriz/>
                    </div> */}
                    </div>

                </div>
                <button className={`primary-btn ${title ? '' : 'disabled'}`} onClick={this.onCreateBoard}>Create board</button>
            </div>
        </ScreenOverlay>
    }
}

function mapStateToProps(state) {
    return {
        
        loggedInUser: state.userModule.loggedInUser,
        board: state.boardModule.board
    }
}

const mapDispatchToProps = {
    closePopover,
    onSaveBoard, 
    openPopover
}

export const PopoverCreateBoard = connect(mapStateToProps, mapDispatchToProps)(withRouter(_PopoverCreateBoard))