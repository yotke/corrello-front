import React from 'react';


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

    return (
    <div id="mySidenav" className="sidenav">
    <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>


  </div>
)
}
}
