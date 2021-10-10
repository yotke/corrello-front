import React from 'react';
import { Activities } from './activities.jsx';

export class SideNavRight extends React.Component {

  componentDidMount = () => {
  }

 
 closeNav  = () =>  {
    document.getElementById("mySidenav").style.width = "0";
  }

  render() {
    const { activities } = this.props
    return (
    <div id="mySidenav" className="sidenav">

      <div className="sidenav-header">
        <div className="board-menu-header-content">
        <h3 className="board-menu-header-title js-board-menu-title-text">Menu</h3>
    <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
        </div>
      
      </div>
    <hr className="board-menu-header-divider"></hr>

<section className="board-menu-content u-fancy-scrollbar js-board-menu-content-wrapper">
  

                <Activities 
                  activities={activities}
                  isInCardLocation={false} 
               />


</section>
  </div>
)
}
}
