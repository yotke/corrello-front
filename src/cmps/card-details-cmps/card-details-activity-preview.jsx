import React, { Component } from 'react';

export class CardDetailsActivityPreview extends Component {

    render() {
        const { activity } = this.props
        const { byMember } = activity;

        return (
            <div className="activity-preview flex">
                <div className="activity-creator">
                    <div class="member js-show-mem-menu" idmember="5d00b47567f394192e7cdd94">
                        <img class="member-avatar" height="30" width="30"
                            src={byMember.imgUrl}
                            alt={byMember.fullname} title={byMember.fullname} />
                    </div>
                    <h4>{byMember.fullname}</h4>
                </div>
                <div className="activity-desc">
                    <span class="inline-member js-show-mem-menu">
                        <span class="u-font-weight-bold">{byMember.fullname}</span>
                    </span>
                </div>
            </div>
        )
    }
}