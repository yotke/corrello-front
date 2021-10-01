
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
                        {/* <button className="board-preview-add-btn" onClick={() => {
                            this.setState({isNewBoard:true})
                        }}>Create new board</button> */}
                    </li>
                    {boards.map(board =>
                        //<Filter/>
                        <Link to={`/board/${board._id}`} key={board._id} className="board-preview-wrapper clean-link" >
                            <li className="board-preview clean-link" key={board._id} style={board.style && {
                                backgroundImage: "url(" + board.style.background + ")",
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: '50%',
                                backgroundSize: 'cover',
                                lineheight: '20px',
                                padding: '8px',
                                position: 'relative',
                                textDecoration: 'none'
                            }}>
                                <h3 className="board-preview-name">{board.title}</h3>

                            </li>
                        </Link>
                    )}
                </ul>
            </section >
        )
    }


}