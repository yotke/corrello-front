import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { ReactComponent as AddIcon } from '../assets/img/icons/add.svg';
import { ReactComponent as BellIcon } from '../assets/img/icons/notific-bell.svg';
import { openPopover } from '../store/popover.actions';
import { socketService } from '../services/socket.service';
import { onLogin, onLogout, onSignup } from '../store/user.actions.js';
import Logo from '../assets/img/logos/corollo.png';

class _AppHeader extends React.Component {
  state = {
    filterTxt: '',
    currOpenModal: '',
    isNewNotific: false,
  };

  componentDidMount() {
    this.searchInput = React.createRef();
    socketService.on('SOCKET_EVENT_ON_ADD_ACTIVITY', (activity) => {
      this.setState({ isNewNotific: true });
    });
  }

  onOpenNotifics = (ev) => {
    this.setState({ isNewNotific: false }, () => {
      this.onOpenPopover(ev, 'NOTIFICATIONS');
    });
  };

  handleChange = (ev) => {
    const title = ev.target.name;
    const value = ev.target.type;
  };

  onOpenPopover = (ev, PopoverName) => {
    //debugger
    const elPos = ev.target.getBoundingClientRect();
    const props = {
      boards: this.props.boards,
    };
    this.props.openPopover(PopoverName, elPos, props);
  };

  render() {
    const { isNewNotific } = this.state;
    var { isBoardStyle, openPopover, loggedInUser } = this.props;
    const [name, lastname] = loggedInUser
      ? loggedInUser.fullname.split(' ')
      : ['', ''];

    if (!isBoardStyle) {
      isBoardStyle = false;
    }
    return (
      <section>
        <div
          className={`main-header flex  ${
            !isBoardStyle ? 'in-board' : 'out-board'
          }`}
        >
          <button className="btn-header flex">
            <svg
              width="20"
              height="20"
              role="presentation"
              focusable="false"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5C4 4.44772 4.44772 4 5 4H7C7.55228 4 8 4.44772 8 5V7C8 7.55228 7.55228 8 7 8H5C4.44772 8 4 7.55228 4 7V5ZM4 11C4 10.4477 4.44772 10 5 10H7C7.55228 10 8 10.4477 8 11V13C8 13.5523 7.55228 14 7 14H5C4.44772 14 4 13.5523 4 13V11ZM11 4C10.4477 4 10 4.44772 10 5V7C10 7.55228 10.4477 8 11 8H13C13.5523 8 14 7.55228 14 7V5C14 4.44772 13.5523 4 13 4H11ZM10 11C10 10.4477 10.4477 10 11 10H13C13.5523 10 14 10.4477 14 11V13C14 13.5523 13.5523 14 13 14H11C10.4477 14 10 13.5523 10 13V11ZM17 4C16.4477 4 16 4.44772 16 5V7C16 7.55228 16.4477 8 17 8H19C19.5523 8 20 7.55228 20 7V5C20 4.44772 19.5523 4 19 4H17ZM16 11C16 10.4477 16.4477 10 17 10H19C19.5523 10 20 10.4477 20 11V13C20 13.5523 19.5523 14 19 14H17C16.4477 14 16 13.5523 16 13V11ZM5 16C4.44772 16 4 16.4477 4 17V19C4 19.5523 4.44772 20 5 20H7C7.55228 20 8 19.5523 8 19V17C8 16.4477 7.55228 16 7 16H5ZM10 17C10 16.4477 10.4477 16 11 16H13C13.5523 16 14 16.4477 14 17V19C14 19.5523 13.5523 20 13 20H11C10.4477 20 10 19.5523 10 19V17ZM17 16C16.4477 16 16 16.4477 16 17V19C16 19.5523 16.4477 20 17 20H19C19.5523 20 20 19.5523 20 19V17C20 16.4477 19.5523 16 19 16H17Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
          <div className="logo flex ">
            <Link to="/">
              <img className="main-logo" src={Logo} />
            </Link>
          </div>
          <div className="btn-header-container flex">
            <Link to="/workspace" className="btn-header clean-link">
              <button className="btn-header flex" onClick={() => {}}>
                <div className="txt-btn-wraper">
                  Workspace
                  <svg
                    width="16"
                    height="16"
                    role="presentation"
                    focusable="false"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </button>
            </Link>
            <button
              className="btn-header flex"
              onClick={(ev) => this.onOpenPopover(ev, 'RECENT_BOARDS')}
            >
              <div className="txt-btn-wraper">
                Recent
                <svg
                  width="16"
                  height="16"
                  role="presentation"
                  focusable="false"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
            <button
              className="btn-header flex"
              onClick={(ev) => this.onOpenPopover(ev, 'STARRED')}
            >
              <div className="txt-btn-wraper">
                Starred
                <svg
                  width="16"
                  height="16"
                  role="presentation"
                  focusable="false"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
            <button
              className="btn-header-more flex"
              onClick={(ev) => this.onOpenPopover(ev, 'MORE_OPTIONS')}
            >
              <div className="txt-btn-wraper">
                More
                <svg
                  width="16"
                  height="16"
                  role="presentation"
                  focusable="false"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
            <button className="create-btn flex">
              <div
                className="txt-btn-wraper"
                onClick={() => {
                  openPopover('CREATE_BOARD');
                }}
              >
                <span className="mobile-create">
                  <AddIcon />
                </span>
                <span className="desktop-create">Create</span>
              </div>
            </button>
          </div>

          <div className="btn-header-container flex">
            {/* <div className="search-input-container" ref={this.searchInput} onClick={(ev) => {
                            this.onOpenPopover(ev, 'SEARCH_HEADER')

                        }}>
                            <span className="sc-bdVaJa kBFJig" role="img" aria-label="SearchIcon">
                                <svg className="search-icon" width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5C18 12.2269 17.4164 13.8175 16.4356 15.0852L20.3769 19.0953C20.764 19.4892 20.7586 20.1223 20.3647 20.5095C19.9708 20.8966 19.3376 20.8911 18.9505 20.4972L15.0129 16.4909C13.7572 17.4383 12.1942 18 10.5 18ZM16 10.5C16 13.5376 13.5376 16 10.5 16C7.46243 16 5 13.5376 5 10.5C5 7.46243 7.46243 5 10.5 5C13.5376 5 16 7.46243 16 10.5Z" fill="currentColor">
                                    </path>
                                </svg>
                            </span>
                            <input autoComplete="off" autoCorrect="off" spellCheck="false" className="search-input-header"
                                data-test-id="header-search-input" id="9lkgOKT6X4ViGFKUiWS6OBVxAsVyJLk2" type="search" placeholder="Search" onChange={this.hndleChange} />
                        </div> */}
            <div>
              <button
                className={`btn-header ${isNewNotific ? 'new-notific' : ''}`}
                onClick={(ev) => this.onOpenNotifics(ev)}
              >
                <BellIcon />
              </button>
            </div>
            {loggedInUser && (
              <button
                className="user-logo-in-app-header flex"
                onClick={(ev) => {
                  this.onOpenPopover(ev, 'USER');
                }}
              >
                {!loggedInUser.imgUrl && (
                  <div className="letter-logo-workspace-header">
                    {name[0]}
                    {lastname && lastname[0]}
                  </div>
                )}

                {loggedInUser.imgUrl && (
                  <img className="user-avatar" src={loggedInUser.imgUrl} />
                )}
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    boards: state.boardModule.boards,
    onlineUsers: state.userModule.onlineUsers,
    loggedInUser: state.userModule.loggedInUser,
  };
}
const mapDispatchToProps = {
  onLogin,
  onSignup,
  onLogout,
  openPopover,
};

export const AppHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AppHeader);
