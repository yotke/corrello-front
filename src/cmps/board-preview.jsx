
import React from "react"
import { Link, NavLink } from 'react-router-dom'

export class BoardPreview extends React.Component {

    render() {
        const { boards } = this.props
        return (
            <section className="preview-container">
                <ul className="board-list">
                    {boards.map(board =>
                        //<Filter/>
                        <Link to={`/workspace/${board._id}`}>
                            <li className="board-preview" key={board._id}>
                                {board._id}
                            </li>
                        </Link>
                    )}
                </ul>
            </section >
        )
    }


}