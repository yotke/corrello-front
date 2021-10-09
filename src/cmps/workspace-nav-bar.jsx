import React from "react"
import { Link, NavLink } from 'react-router-dom'

export class WorkspaceNavBar extends React.Component {
    render() {
        return (
            <div className="nav-bar-workspace-container-horizontal">
                <ul className="nav-bar-workspace-horizontal">
                    <li className="tabbed-pane-nav-item clean-list">
                        <button className="tabbed-pane-nav-item-button js-org-profile active">Boards</button>
                    </li>
                </ul>
                <hr />
            </div>
        )
    }
}