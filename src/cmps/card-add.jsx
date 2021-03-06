import React, { Component } from 'react'
import { TextareaAutosize } from '@material-ui/core';
import { CloseRounded } from '@material-ui/icons';
import { utilService } from '../services/util.service'


export class CardAdd extends Component {

    state = {
        titleTxt: ''
    }

    handleChange = (ev) => {
        const { value } = ev.target;
        if (ev.key === 'Enter') {
            ev.preventDefault();
            this.onAddCard()
            return;
        }
        this.setState({ titleTxt: value });
    }

    onAddCard = () => {
        const { titleTxt } = this.state;
        if (!titleTxt) {
            this.textArea.focus();
            return;
        }

        const { board, currList, onSaveBoard } = this.props;
        const listIdx = board.lists.findIndex(list => list.id === currList.id);

        const card = {
            id: utilService.makeId(),
            title: titleTxt,
            description: '',
            comments: [],
            checklists: [],
            members: [],
            byMember: 'loggedinUser',
            labelIds: [],
            createdAt: Date.now(),
            style: {

            }
        }

        board.lists[listIdx].cards.push(card)



        onSaveBoard(board)
        this.setState({ titleTxt: '' }, () => {
            this.textArea.focus()
        })
    }

    render() {
        const { titleTxt } = this.state
        const { toggleCardAdd } = this.props;
        return (
            <div className="card-add">
                <TextareaAutosize className="card-add-input" ref={(textArea) => this.textArea = textArea} value={titleTxt} autoFocus onChange={this.handleChange} onKeyDown={this.handleChange} placeholder="Enter a title for this card..." aria-label="empty textarea" />
                <div className="card-add-active">
                    <button className="primary-btn" onMouseDown={this.onAddCard}>Add card</button>
                    <a className="clean-link" onMouseDown={() => toggleCardAdd()} ><CloseRounded/></a>
                </div>
            </div>
        )
    }
}
