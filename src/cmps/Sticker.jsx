import React from 'react';
import { useDrag } from 'react-dnd';

export const Sticker = ({ isAnimated, sticker }) => {


  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'sticker',
    item: { id: sticker.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      className="sticker-select js-draggable-sticker ui-draggable"
      bis_skin_checked="1"
      role="Handle"
      ref={drag}
      style={{ border: isDragging ? '5px solid pink' : '0px',
      top: (sticker.pos) ? sticker.pos.top : '',
      left: (sticker.pos) ? sticker.pos.left : '',


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
