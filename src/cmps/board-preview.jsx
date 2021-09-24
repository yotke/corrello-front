
import React from "react"


export class BoardPreview extends React.Component {

    render() {
        const { boards } = this.props
        return (
            <section className="preview-container">
                <ul className="board-list">
                    {boards.map(board =>
                        //<Filter/>
                        <li className="board-preview" key={board._id}>
                            board.id
                        </li>
                    )}
                </ul>
            </section >
        )
    }


}