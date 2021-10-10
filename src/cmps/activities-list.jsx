
import { ActivityPreview } from './activity-preview.jsx'

export function ActivitiesList({ activities, isInCardLocation }) {

    return (
        <div className="activities-list">
            {activities.map(activity => {
                return <ActivityPreview key={activity.id} activity={activity} isInCardLocation={isInCardLocation} />
            })}
        </div>
    )
}