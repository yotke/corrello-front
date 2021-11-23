import React from 'react'
import { useDrop } from 'react-dnd'
import { Sticker } from './Sticker';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { giphyService } from '../services/giphy.service';
import { get } from 'jquery';

export const StickersBucket = ({elPos}) => {
  const [bucket, setBucket] = useState([]);


  // console.log('in busket', elPos);

  // const { stickers } = useSelector(state => state.boardModule)

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "sticker",
    drop: (item, monitor) => addStickerToBoard(item.id, monitor.getSourceClientOffset(), elPos),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),


    }),
  }));


const getStickerPosOnCard = (target, cardPos) => {
  console.log('on ADD', elPos);

  const {x, y} = elPos
  
  const top = target.y - y; 
  const left = target.x -x;


return {top, left}

}

  
  const  addStickerToBoard =  async (id, target,cardPos) => {
    const stickers = await giphyService.getInitialGiphys()
    console.log('stickers?', stickers)
    const stickerOnCard = stickers.filter((sticker) => id === sticker.id);
    const stickerPos =  getStickerPosOnCard(target, cardPos)
    console.log('sticker pos', stickerPos);
    stickerOnCard[0].pos = stickerPos 

    setBucket((bucket) => [...bucket, stickerOnCard[0]]);
  };

  return (
<div className="card-stickers-area" ref={drop}>

{bucket && bucket.map((sticker) => {
          return <Sticker isAnimated={false} sticker={sticker} key={sticker.id}/>;
        })}
</div>

  )
}
