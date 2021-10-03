import { Component } from 'react'
import { connect } from 'react-redux'



class _MainBoardHeader extends Component {

    state = {
        title: '',
    }

    componentDidMount() {
        this.setState({ title: this.props.board.title })
    }


    render() {
        const { title } = this.state
        return (
            <div className="main-board-header">
                <div className="board-title" >
                    <h1>{title}</h1>
                </div>
                <div className="flex header-section">
                </div>
            </div>
        )
    }
}




function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
    }
}

const mapDispatchToProps = {

}

export const MainBoardHeader = connect(mapStateToProps, mapDispatchToProps)(_MainBoardHeader)
