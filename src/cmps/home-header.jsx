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
            user: this.props.user,
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
        const { user, guest } = this.props
        console.log('cuur user', user)
        const [name, lastname] = user ? user.fullname.split(' ') : ['', '']
        console.log('nl', name + lastname)

        return (
            <header className={`home-header ${isNavBgVisible ? 'visibleBg' : ''}`}>
                <nav className="flex justify-space-between">
                    <div className="logo">
                        <HomepageLogo />
                        Corollo
                    </div>
                    {(!user || guest) && <div className="nav-btns ">
                        <Link to="login" className="login-btn clean-link">
                            Log in
                        </Link>
                        <Link to="signup" className="signup-btn clean-link">
                            Sign up
                        </Link>
                    </div>}
                    <div className="user-details-header">

                         {user && <button className="user-logo-in-app-header flex" onClick={(ev) => {
                            this.onOpenPopover(ev, 'USER')
                        }}>
                            
                            {!user.imgUrl && <div className="letter-logo-workspace-header">
                                {name[0]}{lastname && lastname[0]}
                            </div>}

                            {user.imgUrl && <img className="user-avatar" src={user.imgUrl}/>}
                        </button>} 
                    </div>
                </nav>
            </header>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.userModule.user,
    }
}
const mapDispatchToProps = {
    openPopover
}
export const HomeHeader = connect(mapStateToProps, mapDispatchToProps)(_HomeHeader)