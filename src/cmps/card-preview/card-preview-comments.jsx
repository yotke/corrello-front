import React from 'react'

export function CardPreviewComments({ commentsCount }) {
    return (
        <div className="card-preview-comments">
            <div className="comment-icon">
            <i class="far fa-comment"></i>
            </div>
            <span>{commentsCount}</span>
        </div>
    )
}
