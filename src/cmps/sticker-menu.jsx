import React, { useState , useEffect } from 'react';
import { giphyService } from '../services/giphy.service';
import { Loader } from './loader';
import { useDrag } from 'react-dnd'
import { Sticker } from './Sticker';
import { onSaveStickers } from '../store/board.actions';
import { connect, useDispatch, useSelector } from 'react-redux';

import { onEditBoard } from '../store/board.actions';




export const StickerMenu = () => {
  
  const [keyword, setKeyword] = useState('')
  const [isAnimated, setIsAnimated] = useState(false)

  const { stickers } = useSelector(state => state.boardModule)
  
    useEffect(() => {
      fetchImages()
    }, [])


  const dispatch = useDispatch()



  const fetchImages = async () => {
    const stickers = await giphyService.getInitialGiphys();
    console.log('stickers from service' , stickers)
    // setStickers(stickers)
    dispatch(onSaveStickers(stickers))

  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setKeyword( value);
    if (value.length >= 3) onSearch();
    else if (value.length === 0) fetchImages();
  };

  const onSearch = async () => {
    try {
      const stickers = await giphyService.searchGiphys(keyword);
      // setStickers(stickers)
      dispatch(onSaveStickers(stickers))

    } catch (err) {
      console.log(err);
    }
  };

  

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
              onChange={handleChange}
              onKeyDown={handleChange}
            />

            <div className="sticker-animated flex row">
              <input
                type="checkbox"
                defaultChecked={isAnimated}
                onChange={() => {
                  setIsAnimated(!isAnimated)
                  dispatch(onSaveStickers(stickers))
                }}
              />
              <h3>Use animated stickers</h3>
            </div>
          </div>

          <div className="stickers-preview">
            {stickers.map((sticker) => {
              return (
<Sticker isOnCard={false}  sticker={sticker} isAnimated={isAnimated} key={sticker.id}/>

              );
            })}
          </div>
        </div>
        </>

        );
  }

