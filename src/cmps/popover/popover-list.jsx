import { Component } from "react";
import { Popover } from "./popover";

export class PopoverList extends Component {

    onArchiveList = () => {
        const { currList, onSaveBoard, board, closePopover } = this.props
        currList.isArchived = true;
        board.lists = board.lists.filter((list => list.id !== currList.id))
        onSaveBoard(board)
        closePopover()
    }

    render() {
        return <Popover title="List actions">
            <ul className="list-actions clean-list">
                <li onClick={this.onArchiveList}>Archive</li>
            </ul>
        </Popover>
    }
}
