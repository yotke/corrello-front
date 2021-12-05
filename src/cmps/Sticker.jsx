import React, {  } from 'react';
import { useDrag } from 'react-dnd';

export const Sticker = ({ isAnimated, sticker, isOnCard }) => {

  

  const [{ canDrag }, drag] = useDrag(() => ({
    type: 'sticker',
    item: { id: sticker.id },
    canDrag:() => canDragOnSticker(),
    collect: (monitor) => ({
      canDrag: !!monitor.canDrag()

    }),
  }));

  const canDragOnSticker = () => {
    if(isOnCard) return false 
    return true
  }


  return (
    <div
      className="sticker-select js-draggable-sticker ui-draggable"
      bis_skin_checked="1"
      role="Handle"
      ref={drag}
      style={{
      position:(sticker.pos) ? 'absolute' : 'relative',
      top: (sticker.pos) ? sticker.pos.topCard : '',
      left: (sticker.pos) ? sticker.pos.leftCard : '',


    }}
    >
      <img
        className="sticker-select-image sticker-select-shadow"
        src={
          isAnimated
            ? sticker.images.original.url
            : sticker.images.fixed_width_still.url
        }
        style = {
          {
            top: (sticker.pos) ? sticker.pos.top : '',
            left: (sticker.pos) ? sticker.pos.left : '',
          }
        }
      />
      <img
        className="sticker-select-image sticker-select-fixed"
        src={
          isAnimated
            ? sticker.images.original.url
            : sticker.images.fixed_width_still.url
        }
        style = {
          {
            top: (sticker.pos) ? sticker.pos.top : '',
            left: (sticker.pos) ? sticker.pos.left : '',
          }
        }
      />
      <img
        className="sticker-select-image sticker-select-peel"
        src={
          isAnimated
            ? sticker.images.original.url
            : sticker.images.fixed_width_still.url
        }
        style = {
          {
            top: (sticker.pos) ? sticker.pos.top : '',
            left: (sticker.pos) ? sticker.pos.left : '',
          }
        }
      />
    </div>
  );
};
