import React from 'react';
import { Activities } from './activities.jsx';
import {StickerMenu} from '../cmps/sticker-menu'

export class SideNavRight extends React.Component {
  state = {
    mode: 'normal',
  };

  componentDidMount = () => {};

  closeNav = () => {
    document.getElementById('mySidenav').style.width = '0';
  };

  setMode = (ev, mode) => {
    this.setState({mode})
    console.log('mode', mode);
  };

  render() {
    const { activities, board } = this.props;
    const {mode} = this.state
    return (
      <div id="mySidenav" className="sidenav">
        <div className="sidenav-header">
          <div className="board-menu-header-content">

            {mode !== 'normal' && <i onClick={(ev) => this.setMode(ev, 'normal')} class="fas fa-chevron-left"></i>}
           
           {mode === 'normal' && <h3 className="board-menu-header-title js-board-menu-title-text">
             Menu
            </h3>}
            {mode === 'background' && 
  <h3 className="board-menu-header-title js-board-menu-title-text">
             Change Background
            </h3>}

            {mode === 'stickers' && 
  <h3 className="board-menu-header-title js-board-menu-title-text">
    <i class="far fa-sticky-note"></i>
             Stickers
            </h3>}
            <a
              href="javascript:void(0)"
              className="closebtn"
              onClick={this.closeNav}
            >
              &times;
            </a>
          </div>
        </div>
        <hr className="board-menu-header-divider"></hr>

        {mode === 'stickers' && <StickerMenu/>}

       {mode === 'normal' && <section className="board-menu-content u-fancy-scrollbar js-board-menu-content-wrapper flex column">
          <ul className="clean-list">
            <li onClick={(ev) => this.setMode(ev, 'background')}>
              <span
                style={{
                  backgroundImage: 'url(' + board.style.background + ')',
                  backgroundColor: board.style.background,
                }}
              ></span>
              Change background{' '}
            </li>
            <li className='sticker-link' onClick={(ev) => this.setMode(ev, 'stickers')}>
            <i class="far fa-sticky-note"></i>
              Stickers</li>
          </ul>

          <Activities activities={activities} isInCardLocation={false} />
        </section>}
      </div>
    );
  }
}
