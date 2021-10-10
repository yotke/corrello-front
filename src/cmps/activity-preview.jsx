import React, { Component } from "react"

export class ActivityPreview extends Component {

    get activityShowMsg() {
        const { activity: { activityType, txt, card }, isInCardLocation } = this.props
        const activityLocation = isInCardLocation ? 'this card' : card?.title
        switch (activityType) {
            case 'attached': return `attached ${txt} to ${activityLocation}`
            case 'added': return `added ${txt} to ${activityLocation}`
            //case 'archived': return `archived ${activityLocation}`
            case 'changed': return `changed ${txt}`
            case 'changed_with_loc': return `changed ${txt} on ${activityLocation}`
            case 'changed-duedate': return `changed the due date of ${activityLocation} to ${txt}`
            case 'completed': return `completed ${txt} on ${activityLocation}`
            case 'incomplete': return `marked ${txt} incomplete on ${activityLocation}`
            //case 'joined': return `joined ${activityLocation}`
            //case 'left': return `left ${activityLocation}`
            case 'marked': return `marked ${txt} on ${activityLocation}`
            //case 'moved': return `moved ${activityLocation} from ${txt}`
            case 'removed': return `removed ${txt} from ${activityLocation}`
            //case 'renamed': return `renamed this board to ${txt}`
            case 'marked-duedate' : return `marked the due date to ${txt} on ${activityLocation}`
            default: return ''
        }
    }

    render() {
        const { activity: { txt, createdAt, byMember, card }, } = this.props
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
