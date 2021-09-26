import React, { Component } from 'react';
import { CardDetailsActivityPreview } from '../card-details-cmps/card-details-activity-preview'

export function CardDetailsActivityList({ activities }) {
    return (
        <div className="activities-list">
            {
                activities.map(activity => {
                    return <CardDetailsActivityPreview key={activity.id} activity={activity} />
                })}
        </div>
    )
}