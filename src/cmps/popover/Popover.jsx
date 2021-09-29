import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux'
import { closePopover } from '../../store/popover.actions.js'
import { Component } from 'react'
import { boardService } from '../../services/board.service';
// import { Popover } from '@material-ui/core';

export class _Popover extends Component {

    state = {
        top: null,
        left: null,
        isOpen: true
    }


    componentDidMount() 

    {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1000) return
            this.onSetPopoverPos()
        });
        this.onSetPopoverPos()
    }


    componentDidUpdate(prevProps) {
        if (this.props.elPos !== prevProps.elPos) {
            this.onSetPopoverPos()
        }
    }


    onSetPopoverPos = () => {
        const { elPos, displayMode } = this.props
        console.log('pos', elPos);
        if (!this.selectedDiv) return
        const elRect = this.selectedDiv.getBoundingClientRect()
        let { left, top } = boardService.setPopoverPos(elPos, elRect)
        if (displayMode === 'menu-popovers') {
            top = 40;
            left = window.innerWidth - elRect.width;
        }
        debugger
        this.setState({ top, left })
    }

    handleClose = () => {
        this.setState({isOpen : !this.state.isOpen})
    }

    render() {
        const { children, title, closePopover, isOverlayOpen, overlay, displayMode } = this.props
        const { top, left ,isOpen} = this.state
        console.log('top left', top, left);

        return <>
            {overlay !== 'none' && isOverlayOpen && <div className="overlay" onClick={closePopover} />}
            <div className={`pop-over ${displayMode} `}
                style={displayMode === 'menu' ? {} : { top: `${top}px`, left: `${left}px` }}
                ref={(div) => { this.selectedDiv = div }} >
                <div className={`pop-over-header ${displayMode} `}>
                    <h3>{title}</h3>
                    <button className="clean-btn" onClick={closePopover}>
                        <CloseIcon />
                    </button>
                </div>
                <div className="pop-over-content">
                    {children}
                </div>
            </div>
        </>

    }
}


const mapDispatchToProps = {
    closePopover
}

function mapStateToProps(state) {
    return {
        isOverlayOpen: state.popoverModule.isOverlayOpen,
        elPos: state.popoverModule.currPopover.elPos
    }
}
export const Popover = connect(mapStateToProps, mapDispatchToProps)(_Popover)