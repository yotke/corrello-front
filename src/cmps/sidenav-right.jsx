import React from 'react';


export class SideNavRight extends React.Component {

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
    <a href="#">ITEM 1</a>
    <a href="#">ITEM 2</a>
    <a href="#">ITEM 3</a>
    <a href="#">ITEM 4</a>
  </div>
)
}
}
