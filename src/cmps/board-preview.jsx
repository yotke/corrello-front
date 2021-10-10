import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import StarIcon from '../assets/img/icons/star.svg'; //todo
import { Star } from './star.jsx';

export class BoardPreview extends React.Component {
  state = {
    isNewBoard: false,
    isStarred: false,
    activeIndex: ''
  };

  handleStarred = () => { };
  render() {
    const { isNewBoard } = this.state;
    const { boards } = this.props;
    return (
      <section className="board-preview-container">
        <ul className="board-list">
          <li>
            {/* todo 
               <button className="board-preview-add-btn" onClick={() => {
                            this.setState({isNewBoard:true})
                        }}>Create new board</button> */}
          </li>
          {boards.map((board, index) => (

            //<Filter/>
            <Link onClick={() => {
              board.recentBoardInsert = new Date().getTime()
              console.log(' board.recentBoardInsert', board.recentBoardInsert);
              this.props.onSaveBoard(board)
            }}
              to={`/board/${board._id}`}
              key={board._id}
              className="board-preview-wrapper clean-link"
            >
              <div className="content">
                <div className="content-overlay"></div>

                <li
                  className="board-preview clean-link content-image"
                  key={board._id}
                  style={
                    board.style && {
                      backgroundImage: 'url(' + board.style.background + ')',
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
                  <h3 className="board-preview-name">{board.title}</h3>
                </li>
                <div
                  className="content-details fadeIn-right"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    ev.preventDefault();
                  }}
                >
                  <Star board={board} />

                </div>
              </div>
            </Link>
          ))}
        </ul>
      </section>
    );
  }
}
