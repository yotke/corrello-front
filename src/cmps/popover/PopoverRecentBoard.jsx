
import { connect } from 'react-redux';
import { utilService } from '../../services/util.service';
import { Component } from 'react';
import { boardService } from '../../services/board.service';
import { closePopover } from '../../store/popover.actions';
import { onSaveBoard, loadRecentBoards } from "../../store/board.actions";
import { Popover } from './Popover';
import { Link, NavLink } from 'react-router-dom'
class _PopoverRecentBoard extends Component {
    state = {
        recentBoards: []
    }
    async componentDidMount() {
        try {
            const { boardId } = this.props.match.params
            const recentBoards = await this.props.loadBoards()
            this.setState(recentBoards)
        }
        catch (err) {
            console.log(err);
        }
    }
    render() {
        const { recentBoards } = this.state
        console.log('recentBoards in popover starred', recentBoards);
        return <Popover title={"Recent boards"}>
            <div className="recent-pop-over-content">
                <ul className="board-list-navbar">
                    {recentBoards && recentBoards.map((board) => {
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
    closePopover,
    loadRecentBoards
}


export const PopoverRecentBoard = connect(mapStateToProps, mapDispatchToProps)(_PopoverRecentBoard)

