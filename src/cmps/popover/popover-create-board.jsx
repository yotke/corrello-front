import { Component } from 'react';
import { connect } from 'react-redux';
import { ScreenOverlay } from '../screen-overlay';
import { ColorPalette } from '../color-palette';
import { closePopover } from '../../store/popover.actions';
import { onSaveBoard } from '../../store/board.actions';
import { withRouter } from 'react-router-dom';
import { ImagePalette } from '../image-palette.jsx';
import { openPopover } from '../../store/popover.actions.js';
import { MoreHoriz, ThreeSixtyOutlined } from '@material-ui/icons';
import { Button, Hidden } from '@material-ui/core';

import { Popover } from '@material-ui/core';
// import {CloseIcon} from '@material-ui/icons';

class _PopoverCreateBoard extends Component {
  state = {
    title: '',
    color: '',
    isOpen: false,
  };

  handleClick = (ev) => {
    this.setState({ isOpen: true });
  };

  handleClose = (ev) => {
    this.setState({ isOpen: false });
  };

  componentDidMount() {
    this.setState({ color: '#0079bf' });
  }

  handleChange = ({ target }) => {
    
    const { name, value } = target;
    console.log('name + value', name , value);
    this.setState({ [name]: value });
  };

  onOpenPopover = (ev, PopoverName) => {
    const elPos = ev.target.getBoundingClientRect();
    console.log('board', this.props.board);
    const props = {
      handleChange: this.handleChange,
      color: this.state.color,
    };
    this.props.openPopover(PopoverName, elPos, props);
  };
  onCreateBoard = async () => {
    const { title, color } = this.state;
    const { loggedInUser, onSaveBoard, closePopover } = this.props;
    const boardToSave = {
      createdBy: loggedInUser || {
        _id: "1111",
        fullname: "guest",
        imgUrl: ""
      },
      title: title,
      createdAt: Date.now,

      style: {
        background: color,
      },
    }
    try {
      await onSaveBoard(boardToSave);
      if (this.props.board)
        this.props.history.push(`/board/${this.props.board._id}`);
      closePopover();
    } catch (err) {}
  };

  render() {
    const { title, color, isOpen } = this.state;
    const { closePopover } = this.props;
    return (
      <ScreenOverlay goBack={closePopover} styleMode="darken">
        <div className="create-board-popover">
          <div className="create-board-preview flex align-center">
            <div
              className="board-preview"
              style={{
                backgroundColor: color,
                backgroundImage: 'url(' + color + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
              }}
            >
              <input
                type="text"
                name="title"
                value={title}
                onChange={this.handleChange}
                placeholder="Add board title"
              />
            </div>
            <div className="create-preview-colors">
                <ColorPalette
                  count={6}
                  onOpenPopover={this.onOpenPopover}
                  handleChange={this.handleChange}
                  selectedColor={color}
                />

                <div className="image-palette">
     
              <a
                ref={(div) => {
                  this.selectedDiv = div;
                }}
                className="add-image-box"
                variant="contained"
                onClick={this.handleClick}
              >
                <MoreHoriz />
              </a>
              </div>
            </div>
          </div>
          <button
            className={`primary-btn ${title ? '' : 'disabled'}`}
            onClick={this.onCreateBoard}
          >
            Create board
          </button>
        </div>

        {/* material ui popover.. allow the user add another photos and coloros */}
        <Popover
          className="pop-over1"
          anchorEl={this.selectedDiv}
          open={isOpen}
          anchorReference = 'none'
          onClose={this.handleClose}

        >
          <ImagePalette  
                handleChange={this.handleChange}
              />
        </Popover>
      </ScreenOverlay>
    );
  }
}

function mapStateToProps(state) {
  return {
    loggedInUser: state.userModule.loggedInUser,
    board: state.boardModule.board,
  };
}

const mapDispatchToProps = {
  closePopover,
  onSaveBoard,
  openPopover,
};

export const PopoverCreateBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(_PopoverCreateBoard));
