import React from "react"
import { boardService } from "../../services/board.service";
import { ReactComponent as IconDescription } from '../../assets/img/cmps/card-details/icon-description.svg'
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import { activityService } from '../../services/activity.service';

export class Description extends React.Component {
  state = {
    isOnEditState: false,
    description: 'new description'
  }

  onSaveDescription = () => {
    const { description } = this.state
    const { board, card, onSaveBoard } = this.props
    card.description = description
    let updatedBoard = boardService.updateCardInBoard(board, card)
    updatedBoard = activityService.addActivityToBoard(updatedBoard, 'changed_with_loc', 'description', card)
    onSaveBoard(updatedBoard)
  }
  goBackToCard = () => {

  }
  handleChange = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      this.onSaveDescription();
      return;
    }
    this.setState({ description: ev.target.value });
  };
  render() {
    const { isOnEditState, description } = this.state
    return (
      <section className="desctiption-container">
        <div className="description-header flex">
          <span className="icon-description icon-lg window-module-title-icon"><IconDescription /></span>
          <h3 className="description-headline">Description</h3>
          <button className="secondary-btn description-edit-btn" onClick={() => {
            this.setState({ isOnEditState: true })
          }}>Edit</button>
        </div>
        <div className="description-main">
          {isOnEditState ? (
            <div className="description-txt-area-container">
              <textarea
                type="text"
                className="card-list-header-input"
                placeholder={description}
                autoFocus
                onChange={this.handleChange}
                onKeyDown={this.handleChange}
                onBlur={() => {

                  this.onSaveDescription()
                  this.setState({ isOnEditState: !isOnEditState })
                }}
              />
              <div className="description-textarea-btns">
                <button className="save-description button--primary" onClick={() => {
                  this.onSaveDescription()
                }}>Save</button>
                <button
                  onClick={() => this.goBackToCard()}
                  className='close-window-btn-textarea'

                >
                  <CloseRoundedIcon />
                </button>
              </div>
            </div>
          )
            : (
              <p dir="auto" onClick={() => {
                this.setState({ isOnEditState: !isOnEditState })
              }}>{description}</p>
            )}
        </div>
      </section>
    )
  }

}