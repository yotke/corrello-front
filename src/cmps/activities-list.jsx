
import { ActivityPreview } from '../cmps/activity-preview.jsx'

export function ActivitiesList({activities}) {

    console.log('activities: --------', activities)
    
    return (
    <div className="activities-list">
            {activities.map(activity => {
                return <ActivityPreview key={activity.id} activity={activity} />
            })}
        </div>
    )
}