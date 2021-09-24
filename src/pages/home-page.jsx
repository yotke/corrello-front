import React from 'react'
import { connect } from 'react-redux'

import logo from '../assets/img/logo.png'

class _HomePage extends React.Component {
    state = {}

    render() {
        const { count } = this.props
        return ( 
            <section className="home-page-container">
         
            </section >
        )
    }
}

function mapStateToProps(state) {
    return {
        count: state.userModule.count
    }
}

export const HomePage = connect(mapStateToProps)(_HomePage)