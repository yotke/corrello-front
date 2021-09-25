import { Component } from 'react'
import { utilService } from '../services/util.service'
import { TextareaAutosize } from '@material-ui/core';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';

export class ListAdd extends Component {
    state = {
        isToggled: false,
        titleTxt: ''
    }


    handleChange = (ev) => {
        if (ev.key === 'Enter') {
            ev.preventDefault();
            this.onAddList()
            return
        }
        const { value } = ev.target;
        this.setState({ titleTxt: value });
    }

    toggleListAdd = () => {
        const { isToggled } = this.state;
        this.setState({ isToggled: !isToggled });
    }

    onAddList = () => {
        const { titleTxt } = this.state
        if (!titleTxt) {
            this.textArea.focus();
            return
        }

        const { board, onSaveBoard } = this.props
        const list = {
            id: utilService.makeId(),
            title: titleTxt,
            cards: []
        }

        board.lists.push(list);
        this.setState({ titleTxt: '' }, () => onSaveBoard(board))
    }


    render() {
        const { titleTxt, isToggled } = this.state

        return (
            <div className="list-add-containter">
                {isToggled ?
                    <div className="list-add-toggle">
                        <TextareaAutosize className="list-add-input" ref={(textArea) => { this.textArea = textArea; }} value={titleTxt} autoFocus onBlur={this.toggleListAdd} onChange={this.handleChange} onKeyDown={this.handleChange} placeholder="list title" />
                        <div>
                            <button onMouseDown={this.onAddList}>Add list</button>
                            <CloseRoundedIcon onMouseDown={this.toggleListAdd} />
                        </div>
                    </div>
                    :
                    <div className="card-list-add" onClick={this.toggleListAdd}>
                        +  Add list
                        </div>
                }
            </div>
        )
    }
}
