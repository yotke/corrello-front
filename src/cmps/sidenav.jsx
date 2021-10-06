import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BoardPreview } from './board-preview';

export class SideNav extends React.Component {

  state = {
    isOpen: false,
    isboardView: true
  }
  toggleMenu = () => {
    const { isOpen } = this.state;
    var element = document.querySelector('.leftMenu');
    element.classList.toggle('openMenu');
    this.setState({ isOpen: !isOpen });
  };

  render() {
    const { boards, isMainBoard, onAddBoard, user } = this.props
    const { isOpen, isboardView } = this.state
    const [name, lastname] = user ? user.fullname.split(' ') : ['', '']
    const { username } = user
    console.log(name[0])
    console.log(lastname[0])
    return (
      <div className={`leftMenu ${isMainBoard ? 'main' : 'workspace'}`}>
        <div className="header-nav-bar-container flex">
          <div className="flex">
            <div className="close-nav-bar-workspace _3TTqkG5muwOzqZ flex column">

              <div className="nav-logo active"  onClick={this.toggleMenu}>
                {name[0]}
              </div>
              {/* {!isOpen && <div className="small-btn-open-nav-bar" role="presentation" onClick={this.toggleMenu}><svg width="20" height="20" viewBox="0 0 20 20" fill="blue" xmlns="http://www.w3.org/2000/svg"><path d="M10.4381 10.438L6.05766 14.8185C5.81574 15.0604 5.4235 15.0604 5.18157 14.8185C4.93964 14.5766 4.93964 14.1843 5.18157 13.9424L9.124 9.99998L5.18157 6.05754C4.93964 5.81561 4.93964 5.42337 5.18157 5.18145C5.4235 4.93952 5.81574 4.93952 6.05766 5.18145L10.4381 9.56193C10.6801 9.80386 10.6801 10.1961 10.4381 10.438Z" fill="black" className="sHwgrRUGaNb2Id"></path><path d="M15.7997 10.438L11.4192 14.8185C11.1773 15.0604 10.7851 15.0604 10.5431 14.8185C10.3012 14.5766 10.3012 14.1843 10.5431 13.9424L14.4856 9.99998L10.5431 6.05754C10.3012 5.81561 10.3012 5.42337 10.5431 5.18145C10.7851 4.93952 11.1773 4.93952 11.4192 5.18145L15.7997 9.56193C16.0416 9.80386 16.0416 10.1961 15.7997 10.438Z" fill="black" class="sHwgrRUGaNb2Id"></path></svg></div>} */}
            </div>
            {isOpen && <div className="for-free flex column">
              <span className="username-nav-bar-logo">{username}</span>
              <span>free</span>
            </div>}
          </div>
          {isOpen && <button className="_1ul6gs_kHQukwk _3TTqkG5muwOzqZ" data-test-id="workspace-navigation-collapse-button" type="button" onClick={this.toggleMenu}>
            <img className="_1iDWq-WSaSDrjd" src="https://a.trellocdn.com/prgb/dist/images/workspace-navigation/double-chevron-close.87f7a764e600465f9077.svg" alt="Workspace navigation collapse icon" />
          </button>}
        </div>
        {isOpen && <section className="nav-content">
          <hr />
          <div className="small-nav-bar-workspace">
            <div className="your-boards-container">
              Your boards
              {!isboardView && <span className="board-counter">({boards.length})</span>}
            </div>
            <div className="small-nav-bar-btn-container">
              <button className="" onClick={onAddBoard}>
                <svg
                  width="15"
                  height="15"
                  role="presentation"
                  focusable="false"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z"
                    fill="#42526e"
                  ></path>
                </svg>
              </button>
              <button className="" onClick={() => {
                this.setState({ isboardView: !isboardView })
              }}>
                {isboardView && <svg width="15" height="15" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12.7071 7.29289L19.7782 14.364C20.1687 14.7545 20.1687 15.3876 19.7782 15.7782C19.3877 16.1687 18.7545 16.1687 18.364 15.7782L12 9.41421L5.63606 15.7782C5.24554 16.1687 4.61237 16.1687 4.22185 15.7782C3.83132 15.3877 3.83132 14.7545 4.22185 14.364L11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289Z"
                    fill="currentColor">
                  </path>
                </svg>}
                {!isboardView && <svg width="15" height="15" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                    fill="currentColor">
                  </path>
                </svg>}
              </button>
            </div>
          </div>
          {isboardView && <div className="all-boards">
            <ul className="board-list-navbar">
              {boards.map((board) => {
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
          </div>}

        </section>}
      </div>
    );
  }
}
