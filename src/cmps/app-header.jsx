import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink, withRouter } from 'react-router-dom'
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
        var { isBoardStyle, user } = this.props
        if (!isBoardStyle) {
            isBoardStyle = true;
        }
        return (
            <section>
                <div className={`main-header flex  ${!isBoardStyle ? 'in-board' : 'out-board'}`}>

                    {!isBoardStyle && <button className="btn-header flex" >
                        <span className="svg-bar">
                            <svg width="20" height="20" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M4 5C4 4.44772 4.44772 4 5 4H7C7.55228 4 8 4.44772 8 5V7C8 7.55228 7.55228 8 7 8H5C4.44772 8 4 7.55228 4 7V5ZM4 11C4 10.4477 4.44772 10 5 10H7C7.55228 10 8 10.4477 8 11V13C8 13.5523 7.55228 14 7 14H5C4.44772 14 4 13.5523 4 13V11ZM11 4C10.4477 4 10 4.44772 10 5V7C10 7.55228 10.4477 8 11 8H13C13.5523 8 14 7.55228 14 7V5C14 4.44772 13.5523 4 13 4H11ZM10 11C10 10.4477 10.4477 10 11 10H13C13.5523 10 14 10.4477 14 11V13C14 13.5523 13.5523 14 13 14H11C10.4477 14 10 13.5523 10 13V11ZM17 4C16.4477 4 16 4.44772 16 5V7C16 7.55228 16.4477 8 17 8H19C19.5523 8 20 7.55228 20 7V5C20 4.44772 19.5523 4 19 4H17ZM16 11C16 10.4477 16.4477 10 17 10H19C19.5523 10 20 10.4477 20 11V13C20 13.5523 19.5523 14 19 14H17C16.4477 14 16 13.5523 16 13V11ZM5 16C4.44772 16 4 16.4477 4 17V19C4 19.5523 4.44772 20 5 20H7C7.55228 20 8 19.5523 8 19V17C8 16.4477 7.55228 16 7 16H5ZM10 17C10 16.4477 10.4477 16 11 16H13C13.5523 16 14 16.4477 14 17V19C14 19.5523 13.5523 20 13 20H11C10.4477 20 10 19.5523 10 19V17ZM17 16C16.4477 16 16 16.4477 16 17V19C16 19.5523 16.4477 20 17 20H19C19.5523 20 20 19.5523 20 19V17C20 16.4477 19.5523 16 19 16H17Z" fill="currentColor"></path></svg>
                        </span>
                    </button>}
                    <div className="logo flex ">
                        <Link to="/">
                            {!isBoardStyle && <span>____________</span>}
                            {isBoardStyle && <svg role="img" alt="Trello" aria-label="Trello" height="36" viewBox="0 0 312 64" width="126" className="d-block" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><linearGradient id="trello-logo-default" x1="50.048061%" x2="50.048061%" y1="100%" y2="0%"><stop offset="0" stopColor="#0052cc"></stop><stop offset="1" stopColor="#2684ff"></stop></linearGradient><g fill="none" fillRule="evenodd"><path d="m55.59.07h-47.59c-4.09405078 0-7.41448241 3.31595294-7.42006073 7.41v47.52c-.00791682 1.9730991.77030774 3.8681213 2.16269326 5.2661365 1.39238553 1.3980151 3.28425224 2.1838635 5.25736747 2.1838635h47.59c1.9713817-.0026407 3.8606757-.7896772 5.250897-2.1874031s2.1670753-3.2912295 2.1591638-5.2625969v-47.52c-.0055694-4.09014608-3.3199147-7.40449138-7.4100608-7.41zm-28.09 44.93c-.0026377.6594819-.2678382 1.2907542-.7369724 1.7542587-.4691341.4635046-1.1035619.721065-1.7630276.7158222h-10.4c-1.3602365-.005588-2.46-1.1098333-2.46-2.4700809v-30.95c0-1.3602476 1.0997635-2.4644929 2.46-2.47h10.4c1.3618668.0054804 2.4645196 1.1081332 2.47 2.47zm24-14.21c0 .6603158-.2642968 1.2931595-.7340204 1.7572465-.4697237.464087-1.1057125.7207735-1.7659796.7129359h-10.4c-1.3618668-.0056628-2.4645196-1.1083156-2.47-2.4701824v-16.74c.0054804-1.3618668 1.1081332-2.4645196 2.47-2.47h10.4c1.3602365.0055071 2.4600111 1.1097524 2.46 2.47z" fill="url(#trello-logo-default)"></path><g fill="#293856" fillRule="nonzero" transform="translate(87)"><path d="m42.92 4.64v12.06h-14.29v45.75h-13.78v-45.75h-14.29v-12.06z"></path><path d="m60.46 62.45h-12.74v-45h12.74v8.62c2.42-6.07 6.29-9.68 13.18-9.24v13.33c-9-.7-13.18 1.5-13.18 8.71z"></path><path d="m143.24 62.8c-8.35 0-13.6-4-13.6-13.46v-49.27h12.83v47.51c0 2.73 1.8 3.7 4 3.7.634638.0128631 1.269419-.0172055 1.9-.09v11.09c-1.677893.4087549-3.404213.5837425-5.13.52z"></path><path d="m170 62.8c-8.35 0-13.61-4-13.61-13.46v-49.27h12.83v47.51c0 2.73 1.81 3.7 4.05 3.7.631315.0130885 1.262786-.0169816 1.89-.09v11.09c-1.687411.4126716-3.42418.5876949-5.16.52z"></path><path d="m181.31 39.93c0-13.9 8-23.41 21.78-23.41s21.61 9.48 21.61 23.41-7.92 23.58-21.61 23.58-21.78-9.77-21.78-23.58zm12.49 0c0 6.77 2.84 12.14 9.29 12.14s9.13-5.37 9.13-12.14-2.75-12-9.13-12-9.29 5.22-9.29 12z"></path><path d="m90.84 44c3.5670052.3919324 7.1516349.602204 10.74.63 9.76 0 18-2.62 18-12.07 0-9.17-8.47-16.06-18.66-16.06-13.72 0-22.51 9.95-22.51 23.85 0 14.43 7.58 23 24.71 23 5.081836.0413682 10.127233-.8605644 14.88-2.66v-10.78c-4.4 1.41-9.35 2.81-14.43 2.81-6.82 0-11.57-2.24-12.73-8.72zm9.82-17.68c3.61 0 6.51 2.45 6.51 5.8 0 4.31-4.55 5.66-9.79 5.66-2.2301144-.0102442-4.4563338-.1874058-6.66-.53.1664561-2.1013033.7692883-4.1448022 1.77-6 1.6348247-2.9938883 4.7590565-4.8714866 8.17-4.91z"></path></g></g></svg>}
                        </Link>
                    </div>
                    <div className="btn-header-container flex">
                        <Link to="/workspace" className="btn-header">
                            {/* <HomeIcon /> */}
                        </Link>
                        <button className="btn-header flex" >
                            {/* <BoardIcon /> */}
                            <Link to="/workspace">
                                <div className="txt-btn-wraper">
                                    Workspace
                                    <span>
                                        <svg width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" fill="currentColor"></path></svg>
                                    </span>
                                </div>
                            </Link>
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
                    <input id="name" type="search" placeholder="Search…" value="" />

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
                    {!user && <div className="login-signup-container">
                        {/* {!isBoardStyle && <small>hello userName</small>} */}
                        {isBoardStyle && <button className="btn-login" onClick={() => {
                            this.props.history.push('/login')
                        }}>Login</button>}
                        {isBoardStyle && <button className="btn-signup" onClick={() => {
                            this.props.history.push('/signup')
                        }}>signup</button>}
                    </div>}
                    {user && <div className="user-welcome-container">Hello {user.username} <button className="btn-logout" onClick={() => {
                        this.props.onLogout()
                        this.props.history.push('/')
                    }}>Log Out</button></div>}
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



export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(withRouter(_AppHeader))