import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { onLogin, onSignup, onGoogleLogin, onLogout } from '../store/user.actions.js'
import { GoogleLogin } from 'react-google-login'


export class _LoginSignup extends React.Component {
    state = {
        credentials: {
            username: '',
            password: '',
            fullname: '',
            imgUrl: ''

        },
        isSignup: false
    }
    componentDidMount() {
        const { isSignup } = this.props

        this.setState({ isSignup })
    }
    clearState = () => {
        const clearTemplate = {
            credentials: {
                username: '',
                password: '',
                fullname: ''
            },
            isSignup: false
        }
        this.setState({ clearTemplate })
        const { user } = this.props
        this.props.history.push('/')
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState({ credentials: { ...this.state.credentials, [field]: value } });
    }

    onLogin = (ev = null) => {
        if (!this.state.credentials.username || !this.state.credentials.password) return;

        if (ev) ev.preventDefault();
        this.props.onLogin(this.state.credentials)

        this.clearState()
    }

    onSignup = (ev = null) => {
        if (!this.state.credentials.username || !this.state.credentials.password || !this.state.credentials.fullname) return;
        if (ev) ev.preventDefault();
        this.props.onSignup(this.state.credentials);
        this.clearState()
    }

    toggleSignup = () => {
        this.setState({ isSignup: !this.state.isSignup })
    }
    onSuccessGoogle = (res) => {
        const { tokenId } = res
        const { onGoogleLogin } = this.props
        onGoogleLogin(tokenId)
    }

    onFailureGoogle = (res) => {
        console.log('Login with google failed', res)
    }


    render() {
        const { username, password, fullname } = this.state.credentials;
        const { isSignup } = this.state;
        return (
            <div className="login-page">
                <p>
                    <button href="#" onClick={this.toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</button>
                </p>
                {!isSignup && <form className="login-form" onSubmit={this.onLogin}>
                    <input
                    className="username"
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={this.handleChange}
                        required
                        autoFocus
                    />
                    <input
                     className="password"
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={this.handleChange}
                        required
                    />
                    <button className="login-btn-in">Login!</button>
                </form>}

                <p>OR</p>

                <GoogleLogin
                    className="google-login-btn flex align-center justify-center"
                    clientId='640315421255-e4mv3dirnt2lbm4ati92b1euclri0j8d.apps.googleusercontent.com'
                    buttonText='Continue with Google'
                    onSuccess={this.onSuccessGoogle}
                    onFailure={this.onFailureGoogle}
                    cookiePolicy={'single_host_origin'}
                />

                <div className="signup-section">
                    {isSignup && <form className="signup-form" onSubmit={this.onSignup}>
                        <input
                            type="text"
                            name="fullname"
                            value={fullname}
                            placeholder="Fullname"
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            value={username}
                            placeholder="Username"
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={this.handleChange}
                            required
                        />
                        <button className="signup-btn" >Signup!</button>
                    </form>}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.userModule.user,
        loginErr: state.userModule.loginErr
    }
}


const mapDispatchToProps = {
    onLogin,
    onSignup,
    onGoogleLogin
}

export const LoginSignup = connect(mapStateToProps, mapDispatchToProps)(withRouter(_LoginSignup))


//export const LoginSignup = withRouter(_LoginSignup)