import { Component } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as HomepageLogo } from '../assets/img/logos/home-logo.svg'

export class HomeHeader extends Component {

    state = {
        isNavBgVisible: false,
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }


    onOpenPopover = (ev, PopoverName) => {
        //debugger
        const elPos = ev.target.getBoundingClientRect();
        const props = {
            user: this.props.user,
        };
        console.log("PROPS", props)
        this.props.openPopover(PopoverName, elPos, props);
    };


    handleScroll = () => {
        const { isNavBgVisible } = this.state
        if (window.pageYOffset > 100 && !isNavBgVisible) {
            this.setState({ isNavBgVisible: true })
        } else if (window.pageYOffset < 100 && isNavBgVisible) {
            this.setState({ isNavBgVisible: false })
        }
    }


    render() {
        const { isNavBgVisible } = this.state
        const { user, guest } = this.props
        const [name, lastname] = user?user.fullname.split(' '):['','']
        console.log(name[0])
        console.log(lastname[0])
        console.log('user', user);
        return (
            <header className={`home-header ${isNavBgVisible ? 'visibleBg' : ''}`}>
                <nav className="flex justify-space-between">
                    <div className="logo">
                        <HomepageLogo />
                        Corollo
                    </div>
                    {(!user || guest) && <div className="nav-btns ">
                        <Link to="log/login" className="login-btn clean-link">
                            Log in
                        </Link>
                        <Link to="log/signup" className="signup-btn clean-link">
                            Sign up
                        </Link>
                    </div>}
                    <div className="user-details-header">

                        {user && <button className="user-logo-in-app-header " onClick={(ev) => {
                            this.onOpenPopover(ev, 'USER')
                        }}><div className="letter-logo-workspace-header">
                                {name[0]}{lastname[0]}
                            </div>
                        </button>}
                    </div>
                </nav>
            </header>
        )
    }
}
