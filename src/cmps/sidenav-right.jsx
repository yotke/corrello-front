import React from 'react';
import { Activities } from './activities.jsx';

export class SideNavRight extends React.Component {

  componentDidMount = () => {
  }

<<<<<<< HEAD
 
 closeNav  = () =>  {
=======
  openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  }
  closeNav = () => {
>>>>>>> 5f7e07680bb55c1db886d9edf6ae59aca18f8c15
    document.getElementById("mySidenav").style.width = "0";
  }

  render() {
    const { activities } = this.props
    return (
<<<<<<< HEAD
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
=======
      <div id="mySidenav" className="sidenav">
        <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
        <section className="side-nav-content">
          <Activities
            activities={activities}
            isInCardLocation={false}
          />
        </section>
      </div>
    )
  }
>>>>>>> 5f7e07680bb55c1db886d9edf6ae59aca18f8c15
}
