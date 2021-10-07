import React, { Component } from "react"
import { ActivitiesList } from '../activities-list.jsx'


export class CardActivities extends Component {

    componentDidMount() {

    }

    get cardActivities() {
        const { card, activities } = this.props
        console.log('ACTIVITIES: ', activities);
        const cardActivities = activities.filter(currActivity => {
            return currActivity.card.id === card.id
        })
        console.log('ACTIVITIES: THIS CARD', cardActivities);
        return cardActivities
    }

    render() {
        const cardActivities = this.cardActivities
        console.log('cardActivities',cardActivities)
        console.log('!!cardActivities.length',!!cardActivities.length)
        if(!cardActivities) return <div>Load Activities...</div>
        return (<section>
            <div className="card-activities-container flex column">
                <div className="window-modal-title flex">
                    <div className="flex align-center">
                        <h3>Activities</h3>
                    </div>
                </div>
                {!!cardActivities.length && <ActivitiesList activities={cardActivities} />}
            </div>
        </section>)
    }
}
