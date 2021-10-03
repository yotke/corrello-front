
import { connect } from 'react-redux';
import { utilService } from '../../services/util.service';
import { Component } from 'react';
import { boardService } from '../../services/board.service';
import { closePopover } from '../../store/popover.actions';
import { onSaveBoard } from "../../store/board.actions";
import { Popover } from './Popover';
import { Link, NavLink } from 'react-router-dom'
class _PopoverStarred extends Component {

    state = {
        title: ''
    }

    handlechange = ({ target }) => {
        this.setState({ title: target.value })
    }

    addChecklist = (ev) => {
        ev.preventDefault()
        const { card, onSaveBoard, board } = this.props
        if (!card.checklists) card.checklists = []
        const checklist = {
            id: utilService.makeId(),
            title: this.state.title,
            todos: []
        }
        card.checklists.push(checklist)
        const updatedBoard = boardService.updateCardInBoard(board, card)
        onSaveBoard(updatedBoard)
        this.props.closePopover()

    }

    render() {
        const { boards } = this.props
        console.log('boards in popover starred', boards);
        const starredBoards = boards.filter((board) => {
            return board.star === true
        })
        console.log('starredBoards in popover starred', starredBoards);
        return <Popover title={"Starred boards"}>
            <div className="Starred-pop-over-content">
                <ul className="board-list-navbar">
                    {starredBoards.map((board) => {
                        return (
                            <Link to={`/board/${board._id}`} key={board._id} className="clean-link">
                                <div className="nav-bar-btns flex row">
                                    <li className="board-preview-navbar" key={board._id} style={board.style && {
                                        backgroundImage: "url(" + board.style.background + ")",
                                        backgroundRepeat: 'no-repeat',
                                        backgroundAttachment: 'fixed',
                                        backgroundPosition: 'center'
                                    }}>

                                    </li>

                                    <h4 className="nav-bar-btns-name">{board.title}</h4>
                                </div>
                            </Link>
                        );
                    })}
                </ul>
            </div>
        </Popover>
    }
}

function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards,
        loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    onSaveBoard,
    closePopover
}


export const PopoverStarred = connect(mapStateToProps, mapDispatchToProps)(_PopoverStarred)

