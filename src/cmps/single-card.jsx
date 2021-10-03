import { Height } from '@material-ui/icons';
import { Component } from 'react';
import { connect } from 'react-redux';
import { onSaveBoard } from '../store/board.actions';
import { CardPreviewLabel } from './card-preview/card-preview-labels';
import {boardService} from '../services/board.service.js'
class _Card extends Component {
  componentDidMount() {
    const { card, isEditMode } = this.props;
  }

  get cardStyles() {
    const { isEditMode } = this.props;
    const { coverMode, bgColor, bgImgUrl } = this.props.card.style;

    if (coverMode === 'full' && bgImgUrl && !isEditMode)
      return {
        color: '#fff',
        backgroundImage: `url(${bgImgUrl})`,
        borderTopLeftRadius: '3px',
        borderTopRightRadius: '3px',
        minHeight: '130px',
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
        minHeight: '130px',
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

  get getCardHeaderStyles() {
    const { isEditMode } = this.props;
    const { coverMode, bgColor, bgImgUrl } = this.props.card.style;
    if (coverMode === 'full' && bgImgUrl && isEditMode)
      return {
        backgroundImage: `url(${bgImgUrl})`,
        minHeight: '130px',
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

  render() {
    const { isEditMode, card, board, handleChange, cardTitle } = this.props;
    // const {coverMode} = card.style
    var coverMode;
    if (card.style) {
      coverMode = card.style.coverMode;
    } else {
      card.style = {};
    }


    return (
      <div className="card-preview-container">
        <div
          className={`card-preview ${coverMode === 'full' && 'cover-full'}`}
          style={this.cardStyles}
        >
          {(coverMode === 'header' || (coverMode === 'full' && isEditMode)) && (
            <div
              className="card-preview-header"
              style={this.getCardHeaderStyles}
            ></div>
          )}
          <div className="card-content">
            <div className="card-preview-labels">
              {card.labelIds &&
                card.labelIds.map((labelId) => (
                  <CardPreviewLabel
                    key={labelId}
                    labelId={labelId}
                    labels={board.labels}
                    isArchived={card.isArchived}
                  />
                ))}
            </div>
            <div className="card-preview-name clean-link">{card.title}</div>
          </div>

          {/* {card.description && <h5>{card.description}</h5>} */}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  onSaveBoard,
};

export const Card = connect(null, mapDispatchToProps)(_Card);
