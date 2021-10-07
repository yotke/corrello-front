import React, { Component } from "react"
import { ActivitiesList } from './activities-list.jsx'
import { ReactComponent as ActivitiesIcon } from '../assets/img/icons/icon-activity.svg'

export class Activities extends Component {

    get suitedActivities() {
        const { card, activities, isInCardLocation } = this.props
        console.log('ACTIVITIES: ', activities);

        if (isInCardLocation) {
            const cardActivities = activities.filter(currActivity => {
                return currActivity.card.id === card.id
            })
            console.log('ACTIVITIES: THIS CARD', cardActivities);
            return cardActivities
        } else {
            return activities
        }
    }

    render() {
        const { isInCardLocation } = this.props
        const activities = this.suitedActivities
        console.log('Activities', activities)
        console.log('!!Activities.length', !!activities.length)
        if (!activities) return <div>Load Activities...</div>
        return (<section>
            <div className="activities-container flex column">
                <div className="activities-title flex">
                    <div className="flex align-center">
                        <ActivitiesIcon className="checklist-logo" />
                        <h3>Activities</h3>
                    </div>
                </div>
                {!!activities.length && <ActivitiesList activities={activities} isInCardLocation={isInCardLocation} />}
            </div>
        </section>)
    }
}
