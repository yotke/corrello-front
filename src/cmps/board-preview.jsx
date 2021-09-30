
import React from "react"
import { Link, NavLink } from 'react-router-dom'

export class BoardPreview extends React.Component {
    state ={
        isNewBoard:false
    }
    render() {
        const {isNewBoard} =this.state
        const { boards } = this.props
        return (
            <section className="board-preview-container">
                <ul className="board-list">
                    <li>
                        <button className="board-preview-add-btn" onClick={() => {
                            this.setState({isNewBoard:true})
                        }}>Create new board</button>
                    </li>
                    {boards.map(board =>
                        //<Filter/>
                        <Link to={`/board/${board._id}`} key={board._id} >
                            <li className="board-preview" key={board._id} style={board.style && {
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