import React from 'react';
import { Activities } from './activities.jsx';


export class SideNavRight extends React.Component {


  componentDidMount = () => {
  }

	 openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
}
 closeNav  = () =>  {
    document.getElementById("mySidenav").style.width = "0";
}


  render() {
const {activities} = this.props
    return (
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
}
