import { ProfileAvatar } from '../cmps/profile-avatar.jsx'

export function InvitedMembers({ members, openPopover }) {

    return (
        <div className="card-details-members item-container flex column">
            <div className="members-container flex wrap">
                {members && members.map(member => {
                    return <ProfileAvatar key={member._id} member={member} size={32}/>
                })}
       
            </div>
        </div>
    )
}