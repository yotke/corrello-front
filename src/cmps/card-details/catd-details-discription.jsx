import React from "react"
import { Link, NavLink } from 'react-router-dom'
import { boardService } from "../../services/board.service";
import { PopoverDate } from "../popover/PopoverDate";

export class Description extends React.Component {
  state = {
    isOnEditState: false,
    description: 'new description'
  }


  onSaveDescription = () => {
    const { description } = this.state
    const { board, card, onSaveBoard } = this.props
    card.description = description
    const updatedBoard = boardService.updateCardInBoard(board, card)
    onSaveBoard(updatedBoard)
    onSaveBoard(board);
  }

  handleChange = (ev) => {
    console.log(ev);
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
        <h1>
          description
        </h1>
        {isOnEditState ? (
          <input
            type="text"
            className="card-list-header-input"
            value={description}
            autoFocus
            onChange={this.handleChange}
            onKeyDown={this.handleChange}
            onBlur={() => {

              this.onSaveDescription()
              this.setState({ isOnEditState: !isOnEditState })
            }
            }
          />
        ) : (
          <h2 onClick={() => {
            this.setState({ isOnEditState: !isOnEditState })
          }}>{description}</h2>
        )}
      </section>
    )
  }

}