import React from 'react';
import { ReactComponent as PaperClipIcon } from '../../assets/img/icons/paperclip-solid.svg'


export function CardAttachments({ attachs, onDeleteCardAttachment, card, openPopover }) {


    return (
        <div className="card-attachments">
            <div className="window-modal-title flex align-center">
                <PaperClipIcon />
                <h3>Attachments</h3>
            </div>
            <div className="attachments-container">
                {attachs.map(attach => {
                    return <a key={attach.id} target="_blank"
                        rel="noreferrer" href={attach.url} className="clean-link">
                        <div className="attach-preview flex">

                            <div className="attach-content flex column full">
                                <span className="file-name">{attach.fileName} </span>
                                <div className="time-n-actions flex wrap align-center ">
                                    <span>-</span>
                                    <button
                                        onClick={(ev) => onDeleteCardAttachment(ev, attach.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </a>
                })}
            </div>


        </div>
    )
}