import { Component } from 'react';
import { utilService } from '../services/util.service';
import { CloseRounded } from '@material-ui/icons';

export class ListAdd extends Component {
  state = {
    isToggled: false,
    titleTxt: '',
  };

  handleChange = (ev) => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      this.onAddList();
      return;
    }

    this.setState({ titleTxt: ev.target.value});
  };

  toggleListAdd = () => {
    const { isToggled } = this.state;
    this.setState({ isToggled: !isToggled });
  };

  onAddList = () => {
    const { titleTxt } = this.state;
    if (!titleTxt)  return;
    

    const { board, onSaveBoard } = this.props;
    const list = {
      id: utilService.makeId(),
      title: titleTxt,
      cards: [],
    };

    board.lists.push(list);
    this.setState({ titleTxt: '' }, () => onSaveBoard(board));
  };

  render() {
    const { titleTxt, isToggled } = this.state;

    return (
      <div className="list-add-containter">
        {isToggled ? (
          <div className="list-add-toggle">
            <input
              className="list-add-input"
              value={titleTxt}
              autoFocus
              onBlur={this.toggleListAdd}
              onChange={this.handleChange}
              onKeyDown={this.handleChange}
              placeholder="list title"
            />
            <div className="flex row align-center">
              <button className="add-list primary-btn" onMouseDown={this.onAddList}>Add list</button>
              <a className="close-btn" onMouseDown={this.toggleListAdd}><CloseRounded/></a>
            </div>
          </div>
        ) : (
          <div className="card-list-add" onClick={this.toggleListAdd}>
            + Add another list
          </div>
        )}
      </div>
    );
  }
}
