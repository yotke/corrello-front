
import { Component } from 'react';
import { Popover } from './popover';
import { Link, NavLink } from 'react-router-dom'
import { openPopover } from '../../store/popover.actions';

export class PopoverMoreOptions extends Component {


  onOpenPopover = (ev, PopoverName) => {
    
    //debugger
    const elPos = ev.target.getBoundingClientRect();
    const props = {
        boards: this.props.boards,
    };
    openPopover(PopoverName, elPos, props);
};


    render() {
        return <Popover title={"More options"}>

<div>

          <Link>
                                <button className=" flex" onClick={() => {
                            }}>
                                {/* <BoardIcon /> */}
                                <div className="txt-btn-wraper">
                                    Workspace
                                    <svg width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" fill="currentColor"></path></svg>
                                </div>
                                {/* <ElementOverlay /> */}
                            </button>
                        </Link>
                        <button className=" flex" onClick={(ev) => this.onOpenPopover(ev, 'RECENT_BOARDS')}>
                            {/* <BoardIcon /> */}
                            <div className="txt-btn-wraper">
                                Recent
                                <svg width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" fill="currentColor"></path></svg>
                            </div>
                        </button>
                        <button className=" flex" onClick={(ev) => this.onOpenPopover(ev, 'STARRED')}>
                            <div className="txt-btn-wraper">
                                Starred
                                <svg width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" fill="currentColor"></path></svg>
                            </div>
                        </button>

</div>
 
        </Popover>
    }
}




