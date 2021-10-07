import React, { Component } from "react"

export class ActivityPreview extends Component {

    render() {
        const { activity: { txt, createdAt, byMember, card }, } = this.props

        return (<section>
            <div className="activity-preview flex">
                <div className="activity-content flex column">
                    <div className="main flex row">
                        <span className="member-name">{byMember.fullname}</span>
                        <span>{txt}</span>
                        
                    </div>
                    <span>{new Date(createdAt).toLocaleString()}</span>
                </div>
            </div>
        </section>)
    }

}   
