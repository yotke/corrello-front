import { ProfileAvatar } from '../profile-avatar.jsx'
import { ReactComponent as AddIcon } from '../../assets/img/icons/add.svg'

export function CardDetailsMembers({ members, card, openPopover }) {

    const onOpenPopover = (ev, type, member) => {
        ev.preventDefault();
        let elPos;
        let props;
        elPos = ev.target.getBoundingClientRect()
        props = type === 'PROFILE' ? { member, card } : { card }
        openPopover(type, elPos, props)
    }

    return (
        <div className="card-details-members item-container flex column">
            <h3 className="card-details-item-header">Members</h3>
            <div className="members-container flex wrap">
                {members && members.map(member => {
                    return <ProfileAvatar key={member._id} member={member} size={32}
                        onOpenPopover={onOpenPopover} />
                })}
                <button className="add-member secondary-btn"
                    onClick={(ev) => onOpenPopover(ev, 'MEMBERS')} >
                    <AddIcon className="add-icon-svg" />
                </button>
            </div>
        </div>
    )
}