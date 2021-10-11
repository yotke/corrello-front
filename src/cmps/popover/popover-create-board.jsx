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
import { Button } from '@material-ui/core';

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
    this.setState({ [name]: value });
  };

  onOpenPopover = (ev, PopoverName, isNew) => {
    const elPos = ev.target.getBoundingClientRect();
    console.log('board', this.props.board);
    const props = {
      handleChange: this.handleChange,
      color: this.state.color,
    };
    this.props.openPopover(PopoverName, elPos, props, isNew);
  };
  onCreateBoard = async () => {
    const { title, color } = this.state;
    const { loggedInUser, onSaveBoard, closePopover } = this.props;
    const boardToSave = {
      createdBy: loggedInUser,
      title: title,
      createdAt: Date.now(),
      createdBy: {
        _id: '',
        fullname: '',
        imgUrl: '',
      },
      style: {
        background: color,
      },
      labels: [],
      members: [],
      lists: [],
      activities: [],
    };
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
          <div className="flex align-center">
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

<<<<<<< HEAD
                <div className="image-palette">
              <ImagePalette
                count={2}
                handleChange={this.handleChange}
                selectedColor={color}
              />
              <a
                ref={(div) => {
                  this.selectedDiv = div;
                }}
                className="add-image-box"
                aria-describedby={1}
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
          id={1}
          open={isOpen}
          onClose={this.handleClose}
        >
          <div className="popover-header">
          <ColorPalette
                  count={6}
                  onOpenPopover={this.onOpenPopover}
                  handleChange={this.handleChange}
                  selectedColor={color}
                />
=======
                        <ColorPalette count={3} onOpenPopover={this.onOpenPopover} isGradient={false} handleChange={this.handleChange} selectedColor={color} />
                        <div className="add-image-box" onClick={(ev) => {
                            this.onOpenPopover(ev, 'IMAGE_PICKER')
                            ev.preventDefault()
                            ev.stopPropagation()

                        }}>
                            <MoreHoriz />
                        </div>
                    </div>
>>>>>>> 87a916c1776cf62c9cb72967392bfba0d79b0930

          </div>
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
