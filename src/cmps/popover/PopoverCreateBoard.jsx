import { Component } from 'react'
import { connect } from 'react-redux'
import { ScreenOverlay } from "../ScreenOverlay";
import { ColorPalette } from "../ColorPalette";
import { closePopover } from "../../store/popover.actions";
import { onSaveBoard } from "../../store/board.actions";
import { withRouter } from 'react-router-dom';
import {ImagePalette} from '../imagePalette.jsx';

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

    onCreateBoard = async () => {
        const { title, color } = this.state
        console.log('title±±±±±', title);
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
            console.log('could Not Load Board')
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
                        
                        <ColorPalette count={3} isGradient={false} handleChange={this.handleChange} selectedColor={color} />
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
    onSaveBoard
}

export const PopoverCreateBoard = connect(mapStateToProps, mapDispatchToProps)(withRouter(_PopoverCreateBoard))