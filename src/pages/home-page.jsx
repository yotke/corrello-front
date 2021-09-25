import React from 'react'
import { connect } from 'react-redux'

import logo from '../assets/img/logo.png'

class _HomePage extends React.Component {
    state = {}

    render() {
        const { count } = this.props
        return (
            <section className="home-page-container">
                <div className="first-home-page-container">
                    <div className="introduction-signup">
                        <p className="first-part-txt">
                            <h1>Trello helps teams move work forward.</h1>
                            Collaborate, manage projects, and reach new productivity peaks.
                            From high rises to the home office, the way your team works is unique—accomplish it all with Trello.
                        </p>
                        <div className="btn-homepage-signup">
                            <input name="email" className="form-control h-100" type="email" placeholder="Email"></input>
                            <button type="submit" data-analytics-button="greenSignupHeroButton" className="btn btn-home-page-submit ">Sign up—it’s free!</button>
                        </div>
                    </div>
                    <div className="home-page-pic">
                        <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png" alt="" />
                    </div>
                </div>

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