import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import StarIcon from '../assets/img/icons/star.svg';
import { Star } from './star.jsx';
import { connect } from 'react-redux'
import {openPopover} from '../store/popover.actions'
import {onEditBoard} from '../store/board.actions'

 class _BoardPreview extends React.Component {
  state = {
    isStarred: false,
    activeIndex: ''
  };

  render() {
    const { boards, onSaveBoard,onEditBoard, openPopover } = this.props;
    return (
      <section className="board-preview-container">
        <ul className="board-list">
          <li className="board-preview-wrapper" onClick={() => {
                                openPopover('CREATE_BOARD')
                            }}>
            <div className="board-preview new-board-preview">

            <span>Create new board</span>
            </div>
          </li>
          {boards.map((board) => (
              
     
            <Link
              to={`/board/${board._id}`}
              key={board._id}
              className="board-preview-wrapper clean-link"
            >
              <div className={`content ${board.star && 'static-star'}`}>
                <div className="content-overlay"></div>

                <li
                  className="board-preview clean-link content-image"
                  key={board._id}
                  style={
                      board.style && {
                        backgroundImage: "url(" + board.style.background + ")",
                        backgroundColor: board.style.background,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: '50%',
                          backgroundSize: 'cover',
                          lineheight: '20px',
                          padding: '8px',
                          position: 'relative',
                          textDecoration: 'none',
                        }
                    }
                >
                <span class="board-tile-fade"></span>
                    <h3 className="board-preview-name">{board.title}</h3>
                </li>
        {      <div
                  className="content-details fadeIn-right"
                  
                  >
                    <Star board={board} onSaveBoard={onSaveBoard} onEditBoard={onEditBoard} />
  
                </div>}
              </div>
            </Link>
          ))}
        </ul>
      </section>
    );
  }
}

const mapDispatchToProps = {
openPopover, 
onEditBoard
}

export const BoardPreview = connect(null, mapDispatchToProps)(_BoardPreview)