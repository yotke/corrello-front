import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BoardPreview } from './board-preview';

export class SideNav extends React.Component {

  state = {
    isOpen: false
  }
  toggleMenu = () => {
    const { isOpen } = this.state;
    var element = document.querySelector('.leftMenu');
    element.classList.toggle('openMenu');
    this.setState({ isOpen: !isOpen });
  };

  render() {
    const { boards, isMainBoard, onAddBoard } = this.props
    const { isOpen } = this.state
    return (
      <div className={`leftMenu ${isMainBoard ? 'main' : 'workspace'}`}>
        <div className="nav-logo active" onClick={this.toggleMenu}>
          C
        </div>
        {isOpen && <section className="nav-content">

          <div className="small-nav-bar-workspace">
            Your boards
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
            </div>
          </div>
          <div className="all-boards">
            <ul className="board-list">
              {boards.map((board) => {
                return (
                  <Link to={`/board/${board._id}`} key={board._id} >
                    <li className="board-preview" key={board._id} style={board.style && {
                      backgroundImage: "url(" + board.style.background + ")",
                      backgroundRepeat: 'no-repeat',
                      backgroundAttachment: 'fixed',
                      backgroundPosition: 'center'
                    }}>
                      {board.title}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>

        </section>}
      </div>
    );
  }
}
