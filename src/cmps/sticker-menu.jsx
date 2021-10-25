import React, { Component } from 'react';
import { giphyService } from '../services/giphy.service';
import { Loader } from './loader';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';

export class StickerMenu extends Component {
  state = {
    stickers: [],
    keyword: '',
    isAnimated: false,
  };
  componentDidMount() {
    this.fetchImages();
  }

  fetchImages = async () => {
    const stickers = await giphyService.getInitialGiphys();
    this.setState({ stickers: stickers });
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ keyword: value }, () => {
      if (value.length >= 3) this.onSearch();
      else if (value.length === 0) this.fetchImages();
    });
  };

  onSearch = async () => {
    try {
      const stickers = await giphyService.searchGiphys(this.state.keyword);
      this.setState({ stickers: stickers });
    } catch (err) {
      console.log(err);
    }
  };
  landedOn(e) {
    console.log('I was dropped on ' + e.dropData.name);
  }

  render() {
    const { stickers, keyword, isAnimated } = this.state;

    if (!stickers) return <Loader />;
    return (
      <>
        <div className="sticker-list">
          <div className="sticker-search">
            <input
              type="text"
              placeholder="Search GIPHY"
              className="sticker-input"
              value={keyword}
              onChange={this.handleChange}
              onKeyDown={this.handleChange}
            />

            <div className="sticker-animated flex row">
              <input
                type="checkbox"
                defaultChecked={isAnimated}
                onChange={() => {
                  this.setState({ isAnimated: !isAnimated });
                }}
              />
              <h3>Use animated stickers</h3>
            </div>
          </div>

          <div className="stickers-preview">
            {stickers.map((sticker) => {
              return (
                <div
                  id="draggable"
                  className="sticker-select js-draggable-sticker ui-draggable"
                  bis_skin_checked="1"
                  key={sticker.id}
                >
                  <img
                    className="sticker-select-image sticker-select-shadow"
                    src={
                      isAnimated
                        ? sticker.images.original.url
                        : sticker.images.fixed_width_still.url
                    }
                  />
                  <img
                    className="sticker-select-image sticker-select-fixed"
                    src={
                      isAnimated
                        ? sticker.images.original.url
                        : sticker.images.fixed_width_still.url
                    }
                  />
                  <img
                    className="sticker-select-image sticker-select-peel"
                    src={
                      isAnimated
                        ? sticker.images.original.url
                        : sticker.images.fixed_width_still.url
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
