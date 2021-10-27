
import { connect } from 'react-redux';
import { Component } from 'react';
import { Popover } from './popover';
import { onLogout } from '../../store/user.actions.js'
import {closePopover} from '../../store/popover.actions'
import { useHistory } from "react-router-dom";


 const _PopoverUser = ({user, onLogout, closePopover}) => {
    let history = useHistory();

    
    return (
        <Popover title={"Account"}>
            {/* <hr /> */}

            <button className="logout-btn-user-popover btn" onClick={() => {
                onLogout(user)
                closePopover()
                history.push("/");


            }}>Log out</button>
        </Popover>
    )
}

function mapStateToProps(state) {
    return {
        board: state.boardModule.board,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    onLogout,
    closePopover
}


export const PopoverUser = connect(mapStateToProps, mapDispatchToProps)(_PopoverUser)

