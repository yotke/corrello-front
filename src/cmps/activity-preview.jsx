import React, { Component } from "react"

export class ActivityPreview extends Component {

    get activityShowMsg() {
        const { activity: { activityType, subject, card }, isInCardLocation } = this.props
        const activityLocation = isInCardLocation ? 'this card' : card?.title
        switch (activityType) {
            case 'attached': return `attached ${subject} to ${activityLocation}`
            case 'added': return `added ${subject} to ${activityLocation}`
            case 'archived': return `archived ${activityLocation}`
            case 'changed': return `changed ${subject}`
            case 'changed_with_loc': return `changed ${subject} on ${activityLocation}`
            case 'changed-duedate': return `changed the due date of ${activityLocation} to ${subject}`
            case 'completed': return `completed ${subject} on ${activityLocation}`
            case 'incomplete': return `marked ${subject} incomplete on ${activityLocation}`
            case 'joined': return `joined ${activityLocation}`
            case 'left': return `left ${activityLocation}`
            case 'marked': return `marked ${subject} on ${activityLocation}`
            case 'moved': return `moved ${activityLocation} from ${subject}`
            case 'removed': return `removed ${subject} from ${activityLocation}`
            case 'renamed': return `renamed this board to ${subject}`
            case 'marked-duedate' : return `marked the due date to ${subject} on ${activityLocation}`
            default: return ''
        }
    }

    render() {
        const { activity: {createdAt, byMember}, } = this.props
        return (<section>
            <div className="activity-preview flex">
                <div className="activity-content flex column justify-center">
                    <div className="main flex row">
                        <span className="MuiAvatar-root MuiAvatar-circular avatar"> <img src={byMember.imgUrl}/></span>
                        <span>{this.activityShowMsg}</span>
                    </div>
                    <span className="created-at-time">{new Date(createdAt).toLocaleString()}</span>
                </div>
            </div>
        </section>)
    }

}
