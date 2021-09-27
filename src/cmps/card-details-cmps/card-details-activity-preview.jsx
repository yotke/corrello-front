import React, { Component } from 'react';

export class CardDetailsActivityPreview extends Component {

    render() {
        const { activity } = this.props
        const { byMember, card } = activity;

        return (
            <section>
                <div className="activity-preview">
                    <div className="activity-creator">
                        {/* <div className="activity-creator-member">
                            <img className="activity-creator-member-avatar"
                                src={byMember.imgUrl} />
                        </div> */}
                        <h4>{byMember.fullname}</h4>
                    </div>
                    <div className="activity-desc">
                        <span>{card.title}</span>
                    </div>
                </div>
            </section>
        )
    }
}