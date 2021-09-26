import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { ReactComponent as HomeIcon } from '../assets/img/icons/home.svg'
import { ReactComponent as BoardIcon } from '../assets/img/icons/board.svg'
import { ReactComponent as AddIcon } from '../assets/img/icons/add.svg'
import { ReactComponent as BellIcon } from '../assets/img/icons/notific-bell.svg'
import routes from '../routes'


import { onLogin, onLogout, onSignup, loadUsers, removeUser } from '../store/user.actions.js'
import { LoginSignup } from './login-signup.jsx'

class _AppHeader extends React.Component {

    state = {
        filterTxt: '',
        currOpenModal: '',
        isNewNotific: false,
    }
    render() {
        const { isNewNotific } = this.state
        var { isBoardStyle } = this.props
        if (!isBoardStyle) {
            isBoardStyle = false;
        }
        return (
            <section>
                <div className={`main-header flex  ${!isBoardStyle ? 'in-board' : 'out-board'}`}>

                    <button className="btn-header flex" >
                        <span className="svg-bar">
                            <svg width="20" height="20" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4 5C4 4.44772 4.44772 4 5 4H7C7.55228 4 8 4.44772 8 5V7C8 7.55228 7.55228 8 7 8H5C4.44772 8 4 7.55228 4 7V5ZM4 11C4 10.4477 4.44772 10 5 10H7C7.55228 10 8 10.4477 8 11V13C8 13.5523 7.55228 14 7 14H5C4.44772 14 4 13.5523 4 13V11ZM11 4C10.4477 4 10 4.44772 10 5V7C10 7.55228 10.4477 8 11 8H13C13.5523 8 14 7.55228 14 7V5C14 4.44772 13.5523 4 13 4H11ZM10 11C10 10.4477 10.4477 10 11 10H13C13.5523 10 14 10.4477 14 11V13C14 13.5523 13.5523 14 13 14H11C10.4477 14 10 13.5523 10 13V11ZM17 4C16.4477 4 16 4.44772 16 5V7C16 7.55228 16.4477 8 17 8H19C19.5523 8 20 7.55228 20 7V5C20 4.44772 19.5523 4 19 4H17ZM16 11C16 10.4477 16.4477 10 17 10H19C19.5523 10 20 10.4477 20 11V13C20 13.5523 19.5523 14 19 14H17C16.4477 14 16 13.5523 16 13V11ZM5 16C4.44772 16 4 16.4477 4 17V19C4 19.5523 4.44772 20 5 20H7C7.55228 20 8 19.5523 8 19V17C8 16.4477 7.55228 16 7 16H5ZM10 17C10 16.4477 10.4477 16 11 16H13C13.5523 16 14 16.4477 14 17V19C14 19.5523 13.5523 20 13 20H11C10.4477 20 10 19.5523 10 19V17ZM17 16C16.4477 16 16 16.4477 16 17V19C16 19.5523 16.4477 20 17 20H19C19.5523 20 20 19.5523 20 19V17C20 16.4477 19.5523 16 19 16H17Z" fill="currentColor"></path></svg>
                        </span>
                    </button>
                    <div className="logo flex ">
                        <Link to="/">
                            <img className="main-logo" src="https://a.trellocdn.com/prgb/dist/images/header-logo-spirit-loading.87e1af770a49ce8e84e3.gif"></img>
                        </Link>
                    </div>
                    <div className="btn-header-container flex">
                        <Link to="/workspace" className="btn-header">
                            {/* <HomeIcon /> */}
                        </Link>
                        <button className="btn-header flex" >
                            {/* <BoardIcon /> */}
                            <div className="txt-btn-wraper">
                                Workspace
                                <span>
                                    <svg width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" fill="currentColor"></path></svg>
                                </span>
                            </div>
                            {/* <ElementOverlay /> */}
                        </button>
                        <button className="btn-header flex" >
                            {/* <BoardIcon /> */}
                            <div className="txt-btn-wraper">
                                Recent
                                <span>
                                    <svg width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" fill="currentColor"></path></svg>
                                </span>
                            </div>
                            {/* <ElementOverlay /> */}
                        </button>
                        <button className="btn-header flex" >
                            {/* <BoardIcon /> */}
                            <div className="txt-btn-wraper">
                                Starred
                                <span>
                                    <svg width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" fill="currentColor"></path></svg>
                                </span>
                            </div>
                            {/* <ElementOverlay /> */}
                        </button>
                        <button className="btn-header create-btn flex" >
                            {/* <BoardIcon /> */}
                            <div className="txt-btn-wraper">
                                Create
                            </div>
                            {/* <ElementOverlay /> */}
                        </button>
                    </div>
                    <div className="btn-header-container flex">
                        <div>
                            <button className="btn-header wide-layout" >
                                <AddIcon />
                            </button>
                        </div>
                        <div>
                            <button className={`btn-header ${isNewNotific ? 'new-notific' : ''}`} >
                                <BellIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

}



function mapStateToProps(state) {
    return {
        users: state.userModule.users,
        user: state.userModule.user,
        count: state.userModule.count,
        isLoading: state.systemModule.isLoading
    }
}
const mapDispatchToProps = {
    onLogin,
    onSignup,
    onLogout,
    loadUsers,
    removeUser
}



export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)