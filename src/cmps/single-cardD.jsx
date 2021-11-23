import { Component } from 'react';
import React, { useState , useEffect, useRef, useDispatch } from 'react';
import { socketService } from '../services/socket.service';
import { connect } from 'react-redux';
import { onSaveBoard } from '../store/board.actions';
import { CardPreviewLabel } from './card-preview/card-preview-labels';
import { boardService } from '../services/board.service.js';
import { ProfileAvatar } from '../cmps/profile-avatar.jsx';
import { DueDateDisplay } from './card-preview/due-date-display.jsx';
import { CardPreviewChecklist } from '../cmps/card-preview/card-preview-checklist.jsx';
import { Subject as SubjectIcon } from '@material-ui/icons';
import { ReactComponent as AttachmentIcon } from '../assets/img/cmps/card-details/icon-attachment.svg';
import { AttachFile as AttachFileIcon } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/CreateOutlined'
import {eventBusService} from '../services/event-bus.service'
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';

export const Card = ({ isEditMode, card, board, handleChange, cardTitle }) => {

  

  // const dispatch = useDispatch()


// useEffect(() => {
//   debugger
//   return () => {
//     console.log("card mounted")
//     console.log('card?', card)
//   }
// }, [])

  const cardContainer = useRef(null);


  const onOpenCardEdit = (ev) => {
    ev.preventDefault();
    const elPos = cardContainer.getBoundingClientRect();
    eventBusService.emit('card-edit', { elPos, card });
}

  const cardStyles =() => {
    const { coverMode, bgColor, bgImgUrl } = card.style;

    if (coverMode === 'full' && bgImgUrl && !isEditMode)
      return {
        color: '#fff',
        backgroundImage: `url(${bgImgUrl})`,
        borderTopLeftRadius: '3px',
        borderTopRightRadius: '3px',
        minHeight: '260px',
      };
    else if (coverMode === 'full' && !isEditMode)
      return {
        backgroundColor: bgColor,
        minHeight: '56px',
        borderTopLeftRadius: '3px',
        borderTopRightRadius: '3px',
      };
    if (coverMode === 'header' && bgImgUrl) return {};
    if (coverMode === 'header' && !isEditMode) return {};
    if (isEditMode && !coverMode) return { borderRadius: '3px' };
    else if (isEditMode) return {};
    else return { borderRadius: '3px' };
  }


  const toggleCardDone = (ev) => {
    if (card.isArchived) return
    ev.preventDefault();
    card.isDone = !card.isDone
    if (card.isDone) {
        const txt = 'the due date complete'
        const savedActivity = boardService.createActivity('marked', txt, card)
        board.activities.unshift(savedActivity)
        socketService.emit('app newActivity', savedActivity)
    }
    const savedBoard = boardService.updateCardInBoard(board, card)
    
    
    
    // dispatch(onSaveBoard(savedBoard));
}

  const getCardHeaderStyles = () =>  {
   
    const { coverMode, bgColor, bgImgUrl } = card.style
    if (coverMode === 'full' && bgImgUrl && isEditMode)
      return {
        backgroundImage: `url(${bgImgUrl})`,
        minHeight: '260px',
      };
    if (coverMode === 'header' && bgImgUrl)
      return {
        backgroundImage: `url(${bgImgUrl})`,
        minHeight: '130px',
      };
    if (coverMode === 'full' || coverMode === 'header')
      return { backgroundColor: bgColor };
    else return {};
  }

  const isChecklistsEmpty = ({ checklists }) => {
    return checklists.every((checklist) => !checklist.todos.length);
  };

    // const {coverMode} = card.style
    var coverMode;
    if (card.style) {
      coverMode = card.style.coverMode;
    } else {
      card.style = {};
    }

    return (
      <div className="card-preview-container" ref={cardContainer} onContextMenu={onOpenCardEdit}>
        {!isEditMode && (
          <div className="card-preview-edit-btn" onClick={onOpenCardEdit}>
            <EditIcon />
          </div>
        )}

        <div
          className={`card-preview  ${card.style.bgImgUrl && 'is-imaged'} ${
            (coverMode === 'full' && !isEditMode) && 'cover-full'
          }`}
          style={cardStyles}
        >
          {(coverMode === 'header' || (coverMode === 'full' && isEditMode)) && (
            <div
              className="card-preview-header"
              style={getCardHeaderStyles}
            ></div>
          )}
          <div className="card-content">
          {(coverMode !== 'full' || isEditMode)  && (
            <div className="card-preview-labels open">
              {card.labelIds &&
                card.labelIds.map((labelId) => (
                  <CardPreviewLabel
                    key={labelId}
                    labelId={labelId}
                    labels={board.labels}
                  />
                ))}
            </div>
          )}
          {  (coverMode !== 'full' || isEditMode) &&  <div className="card-preview-name clean-link">{card.title}</div> }
          </div>
          {(coverMode !== 'full' || (isEditMode && coverMode === 'full')) && (
            <div className="card-preview-bagdes">
              <div className="card-preview-icons">
                {!!card.dueDate && (
                  <DueDateDisplay
                    card={card}
                    toggleCardDone={toggleCardDone}
                    displayType="preview"
                  />
                )}
                {!!card.checklists && !isChecklistsEmpty(card) && (
                  <CardPreviewChecklist checklists={card.checklists} />
                )}
                {card.description && (
                  <div>
                    <SubjectIcon />
                  </div>
                )}
                {card.attachs && (
                  <div>
                    <AttachFileIcon />
                  </div>
                )}
              </div>
              {!!card.members && !!card.members.length && (
                <div className="card-preview-members">
                  {card.members.map((member) => {
                    return isEditMode ? (
                      <ProfileAvatar
                        member={member}
                        key={member._id}
                        size={28}
                      />
                    ) : (
                      <ProfileAvatar
                        member={member}
                        key={member._id}
                        size={28}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}{' '}
        {
          (coverMode === 'full' && !isEditMode) && 
          <div className="full-cover-card">
          {  (!isEditMode) &&  <div className="card-preview-name-full clean-link">{card.title}</div> }

          </div>
        }
        </div>
        

<div  className="card-stickers-area">

</div>

      </div>
    );
  
}

