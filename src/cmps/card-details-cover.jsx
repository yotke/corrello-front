import VideoLabelIcon from '@material-ui/icons/VideoLabel'
import {ReactComponent as CoverIcon} from '../assets/img/cmps/card-details/icon-cover.svg'
export function CardDetailsCover({ style, openPopover, card }) {

    const onOpenPopover = (ev, type) => {
        ev.preventDefault();
        const elPos = ev.target.getBoundingClientRect()
        const props = { card }
        openPopover(type, elPos, props)
    }

    const getBackground = () => {
        const { bgColor, bgImgUrl } = style
        const background = bgColor ? { background: bgColor } : { backgroundImage: `url(${bgImgUrl})` }
        return background
    }

    return (
        <div className={`card-details-cover ${style.bgImgUrl ? 'img' : ''}`} style={getBackground()}>
            < button className="secondary-btn cover-menu-btn " onClick={(ev) => onOpenPopover(ev, 'COVER')
            }><CoverIcon className="action-logo"/> 
            Cover</button >
        </div >
    )
}