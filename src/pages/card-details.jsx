import React from 'react'
import { connect } from 'react-redux'

class _CardDetails extends React.Component {



    componentDidMount() {
        





    }


    render() {
        return (<section> 

        </section>)
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


export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)
