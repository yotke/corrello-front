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
        const { activity: {createdAt, byMember, activityType, subject}} = this.props
        return (<section>
                 {activityType === 'comment' &&
                    <div className="phenom mod-attachment-type">
                       <div class="phenom-creator">
                        <span className="MuiAvatar-root MuiAvatar-circular avatar"> <img src={byMember.imgUrl}/></span>
                      </div>
                        <div className="comment flex column">
                        <span className="member-name">{byMember.fullname}</span>
                            <span className="comment-action">{subject}</span>
                        </div>
                            <span className="created-at-time">{new Date(createdAt).toLocaleString()}</span>
                    </div>}
               {activityType !== 'comment' && <div className="phenom mod-attachment-type">
                <div class="phenom-creator">
                        <span className="MuiAvatar-root MuiAvatar-circular avatar"> <img src={byMember.imgUrl}/></span>
                      </div>
                      <div className="phenom-desc">
                        <span className="member-name">{byMember.fullname}</span>
                        <span>{this.activityShowMsg}</span>
                      </div>
                      <div className="phenom-meta quiet">
                    <span className="created-at-time">{new Date(createdAt).toLocaleString()}</span>

                      </div>
                </div>
    }
     
        </section>)
    }

}
