import React, { Component } from 'react'
import { connect } from 'react-redux'

export class _UserDetails extends Component {

  render() {
    const { loggedInUser } = this.props
    return (
      <section className="loggedInUser-details">
        <h1>User Details</h1>
        {loggedInUser && <div>
          <h3>
            {loggedInUser.fullname}
          </h3>
          <pre>
            {JSON.stringify(loggedInUser, null, 2)}
          </pre>
        </div>}
      </section>
    )
  }
}



const mapStateToProps = state => {
  return {
    loggedInUser: state.userModule.loggedInUser
  }
}
const mapDispatchToProps = {
}

export const UserDetails = connect(mapStateToProps, mapDispatchToProps)(_UserDetails)
