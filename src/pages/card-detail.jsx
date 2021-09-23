import React from 'react'
import { connect } from 'react-redux'

class _CardDetail extends React.Component {


    componentDidMount() {
        this.props.loadCard()
    }


    render() {
        return ()
    }
}

function mapStateToProps(state) {
    return {
        card: state.userModule.card
    }
}

const mapDispatchToProps = {
    loadCard
}


export const CardDetail = connect(mapStateToProps, mapDispatchToProps)(_CardDetail)
