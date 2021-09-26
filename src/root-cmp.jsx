import React from 'react'

// const { Switch, Route } = ReactRouterDOM
import { Switch, Route, withRouter} from 'react-router'

import routes from './routes'
import { connect } from 'react-redux';
import {AppHeader} from './cmps/app-header'
import {UserDetails} from './pages/user-details'


 class _RootCmp extends React.Component {

    get isHeaderAppears() {
        const { pathname } = this.props.location
        return (pathname.includes('/board') || pathname.includes('workspace'))
      }

      
  get style() {
    const { board, location } = this.props
    if (!location.pathname.includes('/board')) return {}
    const style = board ?  {
        backgroundImage:"url(" + board.style.background + ")",
        backgroundSize:'cover',
        height:'100vh',
        overflow: 'hidden',
        backgroundPosition: '50%',
    } : { background: "ffff",
    height:'100vh',


}
    
    return style
  }




    render() {
        const {board, location } = this.props
        console.log('path name', this.pathname)
        return (
            <div style={this.style}>
  {this.isHeaderAppears && <header>
          <AppHeader board={board} isBoardStyle={location.pathname.includes('/board')} />
        </header>}
                <main>
                    <Switch>
                        {routes.map(route=> <Route key={route.path} exact component={route.component} path={route.path} /> )}
                        <Route path="/user/:id" component={UserDetails} />
                    </Switch>
                </main>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
      board: state.boardModule.board,
    }
  }
  
  const mapDispatchToProps = {
  }
  
  const _RootCmpWithRoute = withRouter(_RootCmp)
  export const RootCmp = connect(mapStateToProps, mapDispatchToProps)(_RootCmpWithRoute)
  

