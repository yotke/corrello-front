import { Component } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as HomepageLogo } from '../assets/img/logos/home-logo.svg'
import { connect } from 'react-redux'
import { openPopover } from '../store/popover.actions.js'



 class _HomeHeader extends Component {

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
            loggedInUser: this.props.loggedInUser,
        };
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
        const { loggedInUser, guest } = this.props
        console.log('cuur loggedInUser', loggedInUser)
        const [name, lastname] = loggedInUser ? loggedInUser.fullname.split(' ') : ['', '']
        console.log('nl', name + lastname)

        return (
            <header className={`home-header ${isNavBgVisible ? 'visibleBg' : ''}`}>
                <nav className="flex justify-space-between">
                    <div className="logo">
                        <HomepageLogo />
                        Corollo
                    </div>
                    {(!loggedInUser || guest) && <div className="nav-btns ">
                        <Link to="login" className="login-btn clean-link">
                            Log in
                        </Link>
                        <Link to="signup" className="signup-btn clean-link">
                            Sign up
                        </Link>
                    </div>}
                    <div className="user-details-header">

                         {loggedInUser && <button className="user-logo-in-app-header flex" onClick={(ev) => {
                            this.onOpenPopover(ev, 'USER')
                        }}>
                            
                            {!loggedInUser.imgUrl && <div className="letter-logo-workspace-header">
                                {name[0]}{lastname && lastname[0]}
                            </div>}

                            {loggedInUser.imgUrl && <img className="user-avatar" src={loggedInUser.imgUrl}/>}
                        </button>} 
                    </div>
                </nav>
            </header>
        )
    }
}


function mapStateToProps(state) {
    return {
        loggedInUser: state.userModule.loggedInUser,
    }
}
const mapDispatchToProps = {
    openPopover
}
export const HomeHeader = connect(mapStateToProps, mapDispatchToProps)(_HomeHeader)