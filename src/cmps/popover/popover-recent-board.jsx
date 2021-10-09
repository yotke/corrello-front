
import { connect } from 'react-redux';
import { utilService } from '../../services/util.service';
import { Component } from 'react';
import { boardService } from '../../services/board.service';
import { closePopover } from '../../store/popover.actions';
import { onSaveBoard, loadRecentBoards } from "../../store/board.actions";
import { Popover } from './popover';
import { Link, NavLink } from 'react-router-dom'
class _PopoverRecentBoard extends Component {


    componentDidMount() {
        this.props.loadRecentBoards()
    }
    render() {
        const { recentBoards } = this.props
        return <Popover title={"Recent boards"}>
            <div className="recent-pop-over-content">
                <ul className="board-list-navbar">
                    {recentBoards && recentBoards.length > 0 && recentBoards.map((board) => {
                        return (
                            board && <Link to={`/board/${board._id}`} key={board._id} className="clean-link">
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
        recentBoards: state.boardModule.recentBoards,
    }
}

const mapDispatchToProps = {
    closePopover,
    loadRecentBoards
}


export const PopoverRecentBoard = connect(mapStateToProps, mapDispatchToProps)(_PopoverRecentBoard)

