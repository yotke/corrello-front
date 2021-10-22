import React from 'react'
import { connect } from 'react-redux'
import { LoginHeader } from '../cmps/login-signup-header.jsx'
import { onLogin, onSignup, onGoogleLogin } from '../store/user.actions.js'
import { LoginSignup } from '../cmps/login-signup.jsx'

class _LoginSignupPage extends React.Component {
    state = {
        email: '',
        isSignup: false
    }
    componentDidMount() {
        const { loginSignup, email } = this.props.match.params;
        this.setState({ email })
        if (loginSignup === 'sign-up') {
            this.setState({ isSignup: true })
        }
    }

    render() {
        const { isSignup } = this.state
        return (
            <section className="login-page-container">
                <header>
                    <LoginHeader />
                </header>
                <main className="main-login-wrapper">
                    <div className="layout-twothirds-center account-form">
                        <LoginSignup onLogin={this.props.onLogin} onSignup={this.props.onSignup} onGoogleLogin={this.props.onGoogleLogin} user={this.props.user} isSignup={isSignup} />
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