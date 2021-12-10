import React from 'react'

import { Switch, Route, withRouter } from 'react-router'

import routes from './routes'
import { connect } from 'react-redux';
import { AppHeader } from './cmps/app-header'
import { UserDetails } from './pages/user-details'
import { DynamicPopover } from './cmps/popover/dynamic-popover.jsx'
import { socketService } from './services/socket.service.js';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import {updateOnlineUsers} from './store/user.actions'
import { userService } from './services/user.service';

class _RootCmp extends React.Component {

  async componentDidMount() {
    try {
      socketService.setup()
      const { updateOnlineUsers, loggedInUser } = this.props
      const onlineUsersToSet = await userService.getOnlineUsers()
      console.log('online?', onlineUsersToSet)
      updateOnlineUsers(onlineUsersToSet)
      if (loggedInUser) {
        socketService.emit('user-watch', loggedInUser._id)
      }
      socketService.on('user connected', userId => {
        const { onlineUsers } = this.props
        const isLoggedIn = this.props.onlineUsers.some(currUserId => currUserId === userId)
        if (!isLoggedIn) {
          onlineUsers.push(userId)
          updateOnlineUsers(onlineUsers)
        }
      })

      socketService.on('user disconnected', userId => {
        const { onlineUsers } = this.props
        const onlineUsersToSet = onlineUsers.filter(currUserId => currUserId !== userId)
        updateOnlineUsers(onlineUsersToSet)
      })
    } catch (err) {
      console.log(err)
    }
  }
  async componentWillUnmount() {
    const { loggedInUser } = this.props
    if (loggedInUser) {
      loggedInUser.isOnline = false;
      await userService.updateUser(loggedInUser)
      socketService.emit('user endSession', loggedInUser._id)
    }
  }


    get isHeaderAppears() {
        const { pathname } = this.props.location
        return (pathname.includes('/board') || pathname.includes('workspace'))
    }


    get style() {
        const { board, location } = this.props
        console.log('background style ?', board)
        if (!location.pathname.includes('/board')) return {}

        const style = board ? {
            
            backgroundImage: "url(" + board.style.background + ")",
            backgroundColor: board.style.background,
            backgroundSize: 'cover',
            height: '100vh',
            overflow: 'hidden',
            backgroundPosition: '50%',
        } : {
            background: "ffff",
            height: '100vh',


        }

        return style
    }




    render() {
        const { board, location } = this.props
        return (
            <DndProvider backend={HTML5Backend}>

            <div style={this.style}>
                {this.isHeaderAppears && <header>
                    <AppHeader board={board} isBoardStyle={location.pathname.includes('/board')} />
                </header>}
                <main>
                    <Switch>
                        {routes.map(route => <Route key={route.path} exact component={route.component} path={route.path} />)}
                        <Route path="/user/:id" component={UserDetails} />
                    </Switch>
                    <DynamicPopover />
                </main>
            </div>
        </DndProvider>
        )

    }
}
function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        currPopover: state.popoverModule.currPopover,
        loggedInUser: state.userModule.loggedInUser,
        onlineUsers: state.userModule.onlineUsers

    }
}

const mapDispatchToProps = {
    updateOnlineUsers
}

const _RootCmpWithRoute = withRouter(_RootCmp)
export const RootCmp = connect(mapStateToProps, mapDispatchToProps)(_RootCmpWithRoute)


