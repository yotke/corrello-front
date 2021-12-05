import React from 'react';
import { useDrop } from 'react-dnd';
import { Sticker } from './Sticker';
import { onSaveStickers } from '../store/board.actions';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { giphyService } from '../services/giphy.service';
import { boardService } from '../services/board.service';

export const StickersBucket = ({
  getElementPos,
  handleIsStickerd,
  card,
  onSaveBoard,
  board,
}) => {
  const [style, setStyle] = useState({ display: 'none' });
  const [bucket, setBucket] = useState(card.bucket || []);
  const [currStickers, setCurrStickers] = useState([]);
  const { stickers } = useSelector((state) => state.boardModule);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'sticker',
    drop: (item, monitor) =>
      addStickerToCard(item.id, monitor.getSourceClientOffset()),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    console.log('state stickeres', stickers);
    setCurrStickers(stickers);
  }, [stickers]);

  useEffect(() => {
    console.log('curr stickeres', currStickers);
  }, [currStickers]);

  useEffect(() => {
    card.bucket = bucket;
    if (bucket.length > 0) {
      handleIsStickerd(true);
      onSaveCard()
    }
  }, [bucket]);

  const onSaveCard = () => {
    const savedBoard = boardService.updateCardInBoard(board, card);
    onSaveBoard(savedBoard);
  };

  const getStickerPosOnCard = (target) => {
    console.log('target', target);

    const elPos = getElementPos();

    const { left, top } = elPos;

    const topCard = target.y - top;
    const leftCard = target.x - left;

    return { topCard, leftCard };
  };

  const addStickerToCard = async (id, target) => {
    const stickers = await giphyService.getInitialGiphys();
    // console.log('stickers?', currStickers)
    const stickerOnCard = stickers.filter((sticker) => id === sticker.id);
    const stickerPos = getStickerPosOnCard(target);
    console.log('sticker pos', stickerPos);
    console.log(stickerOnCard);
    stickerOnCard[0].pos = stickerPos;
    setBucket((bucket) => [...bucket, stickerOnCard[0]]);
  };

  return (
    <div className="card-stickers-area" ref={drop}>
      {card.bucket &&
        card.bucket.map((sticker) => {
          return (
            <div className="sticker-wrapper"
            style={
              {
                position: 'relative'
              }
            }> 

              <Sticker
                isOnCard={true}
                isAnimated={false}
                sticker={sticker}
                key={sticker.id}
              />
            </div>
          );
        })}
    </div>
  );
};
