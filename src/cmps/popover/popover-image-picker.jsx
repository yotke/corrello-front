import { Component } from 'react';
import { Popover } from './popover';
import { boardService } from '../../services/board.service'
import { PopoverMemberPreview } from './popover-member-preview'
import { onSaveBoard } from '../../store/board.actions.js';
import { connect } from 'react-redux'
import { socketService } from '../../services/socket.service'
import { onLogin, onSignup, onGoogleLogin } from '../../store/user.actions.js'
import { ColorPalette } from "../color-palette";


class _PopoverImagePicker extends Component {


    render() {
  
      const {handleChange, color} = this.props;
        return <Popover title={"image picker"} >
   <ColorPalette count={12} isGradient={false} handleChange={handleChange} selectedColor={color} />

   
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

