import React, { Component } from "react"
import { ActivitiesList } from './activities-list.jsx'
import { ReactComponent as ActivitiesIcon } from '../assets/img/icons/icon-activity.svg'
import { CommentAdd } from "./CommentAdd.jsx"

export class Activities extends Component {

    state = {
        toggleActivityComments : false
    }

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

    onToggleFilter = () => {
        const { toggleActivityComments } = this.state
        this.setState({ toggleActivityComments: !toggleActivityComments })
    }


    render() {
        const { isInCardLocation, card } = this.props
        const {toggleActivityComments} = this.state
        const activities = this.suitedActivities
        console.log('Activities', activities)
        console.log('!!Activities.length', !!activities.length)
        if (!activities) return <div>Load Activities...</div>
        return (<section>
            <div className="activities-container flex column">
                <div className="activities-title flex">
                    <div className="activity-section flex align-center">
                        <ActivitiesIcon className="activity-logo" />
                        <h3>Activities</h3>
                     {isInCardLocation &&   <button className="secondary-btn" onClick={this.onToggleFilter}>
                        {toggleActivityComments ? 'Show details' : 'Hide details'}
                    </button>}
                    </div>
                </div>
              {isInCardLocation &&  <CommentAdd card={card} />}

                {!toggleActivityComments && !!activities.length && <ActivitiesList activities={activities} isInCardLocation={isInCardLocation} />}
            </div>
        </section>)
    }
}
