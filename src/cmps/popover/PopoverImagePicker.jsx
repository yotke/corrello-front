import { Component } from 'react';
import { Popover } from './Popover';
import { boardService } from '../../services/board.service'
import { PopoverMemberPreview } from './popover-member-preview'
import { onSaveBoard } from '../../store/board.actions.js';
import { connect } from 'react-redux'
import { socketService } from '../../services/socket.service'
import { onLogin, onSignup, onGoogleLogin } from '../../store/user.actions.js'


class _PopoverImagePicker extends Component {


    render() {
  
        return <Popover title={"Members"} >
   
        </Popover>


    }

}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    onSaveBoard
}


export const PopoverImagePicker = connect(mapStateToProps, mapDispatchToProps)(_PopoverImagePicker)

