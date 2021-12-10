import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';

export const Sticker = ({ isAnimated, sticker, isOnCard, onRemoveSticker }) => {


  const [isStickerHover, setIsStickerHover] = useState(false)
  const [isRemoveHover, setIsRemoveHover] = useState(false)

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
      className={`sticker-select js-draggable-sticker ui-draggable ${isStickerHover && 'hovered'}`}
      bis_skin_checked="1"
      role="Handle"
      ref={drag}
      style={{
      position:(sticker.pos) ? 'absolute' : 'relative',
      top: (sticker.pos) ? sticker.pos.topCard : '',
      left: (sticker.pos) ? sticker.pos.leftCard : '',
    }}
    onMouseEnter ={() => {
      if(isOnCard) { 
        setIsStickerHover(true)
      }
    }}
    onMouseLeave ={() => {
      setIsStickerHover(false)
    }}
    >
      <div className="sticker-remove"> 

      <div className={isStickerHover && `sticker-removing-highlight`}>
        {isStickerHover && <button
        className="remove-sticker-btn"
        onMouseEnter ={() => {
          if(isOnCard) { 
            setIsRemoveHover(true)
          }
        }}
        onMouseLeave ={() => {
          setIsRemoveHover(false)
        }}
        onClick={(ev) => {
          ev.stopPropagation()
          ev.preventDefault()
          onRemoveSticker(sticker.id)
        }}>Remove</button>}
  
      <img
        className={`sticker-select-image sticker-on-card ${(!isOnCard || isRemoveHover) && "sticker-select-shadow"}`}
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
        className={`sticker-select-image sticker-on-card ${(!isOnCard || isRemoveHover) && "sticker-select-fixed"}`}
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
        className={`sticker-select-image sticker-on-card ${(!isOnCard || isRemoveHover) && "sticker-select-peel"}`}
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
          </div>

    </div>
  );
};
