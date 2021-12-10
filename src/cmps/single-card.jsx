import { Component } from 'react';
import { connect } from 'react-redux';
import { onSaveBoard } from '../store/board.actions';
import { CardPreviewLabel } from './card-preview/card-preview-labels';
import { boardService } from '../services/board.service.js';
import { ProfileAvatar } from './profile-avatar.jsx';
import { DueDateDisplay } from './card-preview/due-date-display.jsx';
import { CardPreviewChecklist } from './card-preview/card-preview-checklist.jsx';
import { Subject as SubjectIcon } from '@material-ui/icons';
import { ReactComponent as AttachmentIcon } from '../assets/img/cmps/card-details/icon-attachment.svg';
import { AttachFile as AttachFileIcon } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/CreateOutlined';
import { eventBusService } from '../services/event-bus.service';
import { StickersBucket } from './stickers-bucket';
import { CardPreviewComments } from './card-preview/card-preview-comments';

class _Card extends Component {
  state = {
    elPos: '',
    isStickerd: false,
  };

  componentDidMount() {
    const card = this.props;
  }

  handleIsStickerd = (isStickerd) => {
    console.log('is Stickerd', isStickerd);
    this.setState({ isStickerd });
  };

  getElementPos = () => {
    const elPos = this.cardContainer.getBoundingClientRect();
    this.setState({ elPos: elPos });
    return this.state.elPos;
  };

  onOpenCardEdit = (ev) => {
    const { card } = this.props;
    ev.preventDefault();
    const elPos = this.cardContainer.getBoundingClientRect();
    eventBusService.emit('card-edit', { elPos, card });
  };

  get cardStyles() {
    const { isEditMode } = this.props;
    const { coverMode, bgColor, bgImgUrl } = this.props.card.style;

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

  get getCardHeaderStyles() {
    const { isEditMode } = this.props;
    const { coverMode, bgColor, bgImgUrl } = this.props.card.style;
    if (coverMode === 'full' && bgImgUrl && isEditMode)
      return {
        backgroundImage: `url(${bgImgUrl})`,
        minHeight: '260px',
      };
    if (coverMode === 'header' && bgImgUrl)
      return {
        backgroundImage: `url(${bgImgUrl})`,
        minHeight: '260px',
      };
    if (coverMode === 'full' || coverMode === 'header')
      return { backgroundColor: bgColor };
    else return {};
  }

  get getCardHeaderStyles() {
    const { isEditMode } = this.props;
    const { coverMode, bgColor, bgImgUrl } = this.props.card.style;
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

  isChecklistsEmpty = ({ checklists }) => {
    return checklists.every((checklist) => !checklist.todos.length);
  };

  render() {
    const { isEditMode, card, board, isDragged, stickers, onSaveBoard } =
      this.props;
    var coverMode;
    if (card.style) {
      coverMode = card.style.coverMode;
    } else {
      card.style = {};
    }

    return (
      <div
        className={`card-preview-container ${isDragged && 'on-grab-drag-drop'}`}
        onContextMenu={this.onOpenCardEdit}
      >
        {!isEditMode && (
          <div className="card-preview-edit-btn" onClick={this.onOpenCardEdit}>
            <EditIcon />
          </div>
        )}

        <div
          className={`card-preview  ${card.style.bgImgUrl && 'is-imaged'} ${
            coverMode === 'full' && !isEditMode && 'cover-full'
          }`}
          ref={(div) => {
            this.cardContainer = div;
          }}
          style={this.cardStyles}
        >
          {(coverMode == 'full' || coverMode == 'header') && (
            <StickersBucket
              board={board}
              onSaveBoard={onSaveBoard}
              card={card}
              stickers={stickers}
              getElementPos={this.getElementPos}
              handleIsStickerd={this.handleIsStickerd}
            />
          )}
          {(coverMode === 'header' ||
            (coverMode === 'full' && isEditMode) ||
            (coverMode != 'full' &&
              coverMode != 'header' &&
              this.state.isStickerd)) && (
            <div
              ref={(div) => {
                this.cardContainer = div;
              }}
              className={`card-preview-header ${
                this.state.isStickerd && 'is-stickerd'
              }`}
              style={this.getCardHeaderStyles}
            ></div>
          )}
          <div className="card-content">
            {(coverMode !== 'full' || isEditMode) && (
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
            {(coverMode !== 'full' || isEditMode) && (
              <div className="card-preview-name clean-link">{card.title}</div>
            )}
          </div>
          {(coverMode !== 'full' || (coverMode === 'full' && isEditMode)) && (
            <div className="card-preview-bagdes">
              <div className="card-preview-icons">
                {!!card.dueDate && (
                  <DueDateDisplay
                    card={card}
                    toggleCardDone={this.toggleCardDone}
                    displayType="preview"
                  />
                )}
                {!!card.checklists && !this.isChecklistsEmpty(card) && (
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
                {!!card.comments.length && (
                  <CardPreviewComments commentsCount={card.comments.length} />
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
                        onOpenPopover={this.onOpenPopover}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}{' '}
          {coverMode === 'full' && !isEditMode && (
            <div className="full-cover-card">
              {!isEditMode && (
                <div className="card-preview-name-full clean-link">
                  {card.title}
                </div>
              )}
            </div>
          )}
        </div>
        {coverMode !== 'full' && coverMode !== 'header' && (
          <StickersBucket
            board={board}
            onSaveBoard={onSaveBoard}
            card={card}
            stickers={stickers}
            getElementPos={this.getElementPos}
            handleIsStickerd={this.handleIsStickerd}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    stickers: state.boardModule.stickers,
  };
}

const mapDispatchToProps = {
  onSaveBoard,
};

export const Card = connect(mapStateToProps, mapDispatchToProps)(_Card);
