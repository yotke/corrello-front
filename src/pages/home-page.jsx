import React from 'react'
import { connect } from 'react-redux'
import logo from '../assets/img/logo.png'
import board from '../assets/img/board.png'
import { HomeHeader } from '../cmps/home-header'
import { openPopover, closePopover } from '../store/popover.actions.js'
class _HomePage extends React.Component {
    state = {
        email: '',
        guest: false
    }
    handleChange = (ev) => {
        ev.preventDefault();
        this.setState({ email: ev.target.value })
    }
    render() {
        const { email, guest } = this.state
        const {  loggedInUser, openPopover, closePopover } = this.props
        return (

            <section className="home-page-container">
                <HomeHeader guest={guest} />
                <div className="first-home-page-container">
                    <div className="introduction-signup">
                        <div className="first-part-txt">
                            <h1>Corollo helps teams move work forward.</h1>
                            <p>
                                Collaborate, manage projects, and reach new productivity peaks.
                                From high rises to the home office, the way your team works is unique—accomplish it all with Corollo.
                            </p>

                        </div>
                        <div className="btn-homepage-signup">
                          <button type="submit" data-analytics-button="greenSignupHeroButton" className="btn btn-home-page-submit" onClick={() => {
                        this.props.history.push('/workspace')
                    }}>Get started  →</button>
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
                        Start with a Corollo board, lists, and cards. Customize and expand with more features as your teamwork grows.
                        Manage projects, organize tasks, and build team spirit—all in one place.
                    </p>
                    <button type="submit" data-analytics-button="greenSignupHeroButton" className="info-btn " onClick={() => {
                        this.props.history.push('/workspace')
                    }}>Tell me more</button>
                    {/* <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/product/89d378b845766a8f0c48e955336266f8/board.png" alt="" /> */}
                    <img src={board} alt="" />
                </div>
            </section >
        )
    }
}

function mapStateToProps(state) {
    return {
        loggedInUser: state.userModule.loggedInUser,
        currPopoverName: state.popoverModule.currPopover.name,
    }
}
const mapDispatchToProps = {
    openPopover,
    closePopover,
}
export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)