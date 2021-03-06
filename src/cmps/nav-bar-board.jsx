import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { loadBoards, loadBoard, loadRecentBoards } from "../store/board.actions";
import { openPopover } from "../store/popover.actions";
import { MoreHoriz } from '@material-ui/icons';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { ProfileAvatar } from './profile-avatar';

import { Link } from 'react-router-dom';

export class _NavBarBoard extends React.Component {
    state = {
        title: 'Board Name',
        isOnEditState: false,
        star: false
    }

    openNav = () => {
        document.getElementById("mySidenav").style.width = "328px";
    }

    componentWillUnmount() {
        this.unlisten();
    }
    componentWillMount() {
        this.unlisten = this.props.history.listen((location) => {
            const splittedPath = location.pathname.split('/');

            const boardId = splittedPath[2];
            if (!boardId || boardId === this.props.match.params.boardId) return;
            this.props.loadBoard(boardId).then(() => {

                const { board } = this.props
                this.setState({ title: board.title })
                this.setState({ star: board.star })
            })
        });
    }

    componentDidMount() {
        const boardId = this.props.match.params.boardId
        this.props.loadBoard(boardId).then(() => {
            const { board } = this.props
            this.setState({ title: board.title })
            this.setState({ star: board.star })
        })
    }

    onSaveBoardName = () => {
        const { title } = this.state
        const { board, onSaveBoard } = this.props
        if (board) {
            board.title = title
            onSaveBoard(board);
        }
    }

    onOpenPopover = (ev, PopoverName, props) => {
        const elPos = ev.target.getBoundingClientRect();

        this.props.openPopover(PopoverName, elPos, props);
    };
    handleChange = (ev) => {
        if (ev.keyCode === 13) {
            ev.preventDefault();
            this.onSaveBoardName();
            return;
        }
        this.setState({ title: ev.target.value });
    }
    render() {
        const { isOnEditState, title, star } = this.state
        const { board, onSaveBoard, onEditBoard } = this.props
        return (
            <section className="board-nav-bar-container flex">
                <div className="first-board-part">

                <Link to={`/board/${board._id}/dashboard`} className="dashboard-btn clean-link">
                     
                    <button className="_2w6KZMbwKqxZVN _3TTqkG5muwOzqZ ZOUktZwsING7-0"
                        data-test-id="board-views-switcher-button" type="button" title="Board views">
                        <svg width="15" height="15" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M2 7V15C2 16.1046 2.89543 17 4 17H6C7.10457 17 8 16.1046 8 15V7C8 5.89543 7.10457 5 6 5H4C2.89543 5 2 5.89543 2 7ZM4 7V15H6V7L4 7Z" fill="currentColor">
                            </path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M9 7V13C9 14.1046 9.89543 15 11 15H13C14.1046 15 15 14.1046 15 13V7C15 5.89543 14.1046 5 13 5H11C9.89543 5 9 5.89543 9 7ZM11 7V13H13V7L11 7Z" fill="currentColor">
                            </path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M16 17V7C16 5.89543 16.8954 5 18 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H18C16.8954 19 16 18.1046 16 17ZM18 17V7L20 7V17H18Z" fill="currentColor">
                            </path>
                        </svg>
                        <span className="_3wFtm5r_eYKs0G">Dashboard</span>
                    </button>
                    </Link>

            
                    {isOnEditState ? (<input className="name-board-board-btn"
                        type="text"
                        className="card-list-header-input"
                        value={title}
                        autoFocus
                        onChange={this.handleChange}
                        onKeyDown={this.handleChange}
                        onBlur={() => {
                            this.onSaveBoardName()
                            this.setState({ isOnEditState: !isOnEditState })
                        }}

                    />) : (
                        <p onClick={() => {
                            this.setState({ isOnEditState: !isOnEditState })
                        }}>{title}</p>
                    )}
                    <button className={star ? " active star-board-btn" : "star-board-btn"} onClick={() => {
                        this.setState({ star: !star })
                        board.star = !star;
                        onEditBoard(board);

                    }}>
                        <svg width="15" height="15" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.49495 20.995L11.9999 18.6266L16.5049 20.995C16.8059 21.1533 17.1507 21.2079 17.4859 21.1504C18.3276 21.006 18.893 20.2066 18.7486 19.3649L17.8882 14.3485L21.5328 10.7959C21.7763 10.5585 21.9348 10.2475 21.9837 9.91094C22.1065 9.06576 21.5209 8.28106 20.6758 8.15825L15.6391 7.42637L13.3866 2.86236C13.2361 2.55739 12.9892 2.31054 12.6843 2.16003C11.9184 1.78206 10.9912 2.0965 10.6132 2.86236L8.36072 7.42637L3.32403 8.15825C2.98747 8.20715 2.67643 8.36564 2.43904 8.60917C1.84291 9.22074 1.85542 10.1998 2.46699 10.7959L6.11158 14.3485L5.25121 19.3649C5.19372 19.7 5.24833 20.0448 5.40658 20.3459C5.80401 21.1018 6.739 21.3924 7.49495 20.995ZM19.3457 10.0485L15.6728 13.6287L16.5398 18.684L11.9999 16.2972L7.45995 18.684L8.327 13.6287L4.65411 10.0485L9.72993 9.31093L11.9999 4.71146L14.2699 9.31093L19.3457 10.0485Z" fill="currentColor">
                        </path>
                        </svg>
                    </button>
 
                </div>
                <div className="board-title" >

                </div>
                <div className="second-board-part">


                <AvatarGroup className="align-center" max={4}>
                            {board.members && board.members.map(member => <ProfileAvatar  key={member._id} member={member}
                                onOpenPopover={this.onOpenPopover} size={28} showStatus={true} />)}
                        </AvatarGroup>
                    <button className="invite-member-board-btn" onClick={(ev) => this.onOpenPopover(ev, 'INVITE')}>Invite</button>


                    <button onClick={this.openNav} className="show-more-activity"><span><MoreHoriz /></span> Show Menu</button>

                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        recentBoards: state.boardModule.recentBoards,
        boards: state.boardModule.boards,
        board: state.boardModule.board,
    }
}

const mapDispatchToProps = {
    loadRecentBoards,
    loadBoards,
    loadBoard, 
    openPopover
}

export const NavBarBoard = connect(mapStateToProps, mapDispatchToProps)(withRouter(_NavBarBoard))
