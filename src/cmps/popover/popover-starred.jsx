
import { connect } from 'react-redux';
import { Component } from 'react';
import { closePopover } from '../../store/popover.actions';
import { onSaveBoard, loadBoard, loadBoards } from "../../store/board.actions";
import { Popover } from './popover';
import { Link, NavLink } from 'react-router-dom'
import { } from '../../store/board.actions'

class _PopoverStarred extends Component {

    componentDidMount() {
        this.props.loadBoards()
    }

    render() {
        const { boards } = this.props
        const starredBoards = boards.filter((board) => {
            return board.star === true
        })
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
        board: state.boardModule.board,
        loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    onSaveBoard,
    loadBoard,
    loadBoards,
    closePopover
}


export const PopoverStarred = connect(mapStateToProps, mapDispatchToProps)(_PopoverStarred)

