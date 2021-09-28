import React, { Component } from 'react';

import { CardDetailsActivityList } from '../card-details-cmps/card-details-activity-list'

export class CardDetailsActivity extends Component {

    get cardActivities () {
        const { card, activities } = this.props
        const currActivities = activities.filter(activity => {
            if (!activity.card) return false
            return activity.card.id === card.id
        })

        return currActivities;
    }

    render() {

        if(this.cardActivities.length) return <div>Load Activities...</div>

        return (
            <div className="card-details-activity">
                <h3>Activity</h3>
                {!!this.cardActivities.length && <CardDetailsActivityList activities={this.cardActivities} />}
            </div>
        )
    }
}