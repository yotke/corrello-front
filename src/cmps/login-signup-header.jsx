import { Component } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as HomepageLogo } from '../assets/img/logos/home-logo.svg'

export class LoginHeader extends Component {

    state = {
        isNavBgVisible: false
    }

    render() {

        return (
            <header className="login-header">
                <nav className="flex">
                    <div className="logo">
                        <HomepageLogo />
                        Corollo
                    </div>

                </nav>
            </header>
        )
    }
}
