import React from 'react'


class _BoardApp extends React.Component {




}



function mapStateToProps(state) {
    return {
        boards: state.boardModule.boards
    }
}
const mapDispatchToProps = {
    loadBoards,
    onRemoveBoard,
    onAddBoard,
    onEditBoard,
    addToCart
}


export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)