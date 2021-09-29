
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
                        <Link to={`/board/${board._id}`} key={board._id} >
                            <li className="board-preview" key={board._id} style={board.style&&{
                                backgroundImage: "url(" + board.style.background + ")",
                                backgroundRepeat: 'no-repeat',
                                backgroundAttachment: 'fixed',
                                backgroundPosition: 'center'
                            }}>
                                {board.title}

                            </li>
                        </Link>
                    )}
                </ul>
            </section >
        )
    }


}