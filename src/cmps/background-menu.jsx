import React, { useState } from 'react';
import { onSaveBoard, onEditBoard, loadBoard } from '../store/board.actions';
import { ColorPalette } from './color-palette';
import { ImagePalette } from './image-palette';
import { connect } from 'react-redux';

const _BackgroundMenu = ({ onSaveBoard,onEditBoard,loadBoard, board }) => {
  const [mode, setMode] = useState('main');

  function handleChange({ target }) {
    
    const { name, value } = target;
    if (name === 'imgUrl') board.style.background = `url(${value})`;
    else if(name === 'color') board.style.background = value;
    // onEditBoard(board);
    onSaveBoard(board)
    // loadBoard(board.id)
  }
  return (
    <div className="board-menu-content-frame">
      {mode === 'main' &&
      <div
        className="board-backgrounds-section-tiles"
      >
        <div 
        onClick={() => setMode('photoMode')}
          className="board-backgrounds-section-tile board-backgrounds-photos-tile js-bg-photos"
          bis_skin_checked="1"
        >
          <img className='image' src="https://a.trellocdn.com/prgb/dist/images/photos-thumbnail@3x.8f9c1323c9c16601a9a4.jpg" alt="" />
          <div className="title" bis_skin_checked="1">
            Photos
          </div>
        </div>
        <div
                onClick={() => setMode('colorsMode')}
          className="board-backgrounds-section-tile board-backgrounds-colors-tile js-bg-colors"
          bis_skin_checked="1"
        >
          <img className='image' src="https://a.trellocdn.com/prgb/dist/images/colors@2x.ec32a2ed8dd8198b8ef0.jpg" alt="" />
          <div className="title" bis_skin_checked="1">
            Colors
          </div>
        </div>
      </div>
}

{mode === 'colorsMode' &&      <div>
        <ColorPalette
          handleChange={handleChange}
          selectedColor={board.background}
        />
      </div> }
  {mode === 'photoMode' &&    <div>
        <ImagePalette handleChange={handleChange} />
      </div>
}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
  };
}

const mapDispatchToProps = {
  onSaveBoard,
  onEditBoard ,
  loadBoard
};

export const BackgroundMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BackgroundMenu);
