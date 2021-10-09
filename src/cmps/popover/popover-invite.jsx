import { Component } from 'react';
import { Popover } from './popover';
import { boardService } from '../../services/board.service'
import { PopoverMemberPreview } from './popover-member-preview'
import { onSaveBoard } from '../../store/board.actions.js';
import { connect } from 'react-redux'
import { socketService } from '../../services/socket.service'
import { onLogin, onSignup, onGoogleLogin } from '../../store/user.actions.js'


class _PopoverMembers extends Component {

    state = {
        inputTxt: '',
        presentedMembers: '',
    }

    componentDidMount() {
        this.setState({ presentedMembers: this.props.board.members })

    }

    handleChange = ({ target }) => {
        this.setState({ inputTxt: target.value }, () => {
            const filterRegex = new RegExp(this.state.inputTxt, 'i')
            this.setState({ presentedMembers: this.props.board.members.filter(member => filterRegex.test(member.fullname)) })
        })
    }

    toggleMember = (member) => {
        const { board } = this.props
        if(!card.members) {
            card.members = [];
        }
        const idx = card.members.findIndex(cardMember => cardMember._id === member._id)  
        if (idx === -1) {
            card.members.push(member)
        } else {
            card.members.splice(idx, 1)
        }
        const updatedBoard = boardService.updateCardInBoard(board, card)
        

        //todo
        this.props.onSaveBoard(updatedBoard)
    }

    isMemberInCard = (member) => {
        const {members} = this.props.card;
        return (members) ?  members.some(cardMember => cardMember._id === member._id) : false
    }
    render() {
        const { presentedMembers, inputTxt } = this.state
        if (!presentedMembers) return '';
        return <Popover title={"Members"} >
            <div className="members-pop-over-content">
                <input className="pop-over-input" type="text" value={inputTxt}
                    onChange={this.handleChange} placeholder={"Search members"} />
                <h4>BOARD MEMBERS</h4>
                <ul className="clean-list">
                    {presentedMembers && presentedMembers.map(member => <PopoverMemberPreview key={member._id} member={member}
                        toggleMember={this.toggleMember} isSelected={this.isMemberInCard(member)} />)}
                </ul>
            </div>
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


export const PopoverMembers = connect(mapStateToProps, mapDispatchToProps)(_PopoverMembers)

