import React from 'react'
import { connect } from 'react-redux'
import { LoginHeader } from '../cmps/login-signup-header.jsx'
import { onLogin, onSignup, onGoogleLogin } from '../store/user.actions.js'
import { LoginSignup } from '../cmps/login-signup.jsx'

class _LoginSignupPage extends React.Component {
    render() {
        return (
            <section className="login-page-container">
                <header>
                    <LoginHeader />
                </header>
                <main>
                    <div className="layout-twothirds-center account-form">
                        <LoginSignup onLogin={this.props.onLogin} onSignup={this.props.onSignup} onGoogleLogin={this.props.onGoogleLogin} user={this.props.user} />
                    </div>
                </main>
                <div className="background">
                    
                </div>

            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        loggedInUser: state.userModule.loggedInUser,
        // loginErr: state.userModule.loginErr
    }
}


const mapDispatchToProps = {
    onLogin,
    onSignup,
    onGoogleLogin
}

export const LoginSignupPage = connect(mapStateToProps, mapDispatchToProps)(_LoginSignupPage)