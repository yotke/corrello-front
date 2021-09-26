import React from 'react'
import { connect } from 'react-redux'
import logo from '../assets/img/logo.png'
import { HomeHeader } from '../cmps/home-header'

class _HomePage extends React.Component {
    state = {}

    render() {
        const { count ,user} = this.props
        return (
            
            <section className="home-page-container">
                <HomeHeader/>
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
                        <img src="https://raw.githubusercontent.com/alaattinerby/Covid-19-Website/4c233460e18c1a8cfba4f7c4830e8da0e7c5e8e9/Covid-19/img/section-image.svg" alt="" />
                    </div>
                </div>
                <div className="second-home-page-container">
                    <h2>
                        It’s more than work. It’s a way of working together.
                    </h2>
                    <p className="first-part-txt">

                        Start with a Trello board, lists, and cards. Customize and expand with more features as your teamwork grows.
                        Manage projects, organize tasks, and build team spirit—all in one place.
                    </p>
                    <button type="submit" data-analytics-button="greenSignupHeroButton" className="btn btn-home-page-submit " onClick={() => {
                       this.props.history.push('/workspace')
                    }}>Get Started</button>
                    <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/product/89d378b845766a8f0c48e955336266f8/board.png" alt="" />
                </div>
            </section >
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.loggedInUser,
        count: state.userModule.count
    }
}

export const HomePage = connect(mapStateToProps)(_HomePage)