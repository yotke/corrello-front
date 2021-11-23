import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
    onEditBoard,
    onSaveBoard
} from '../store/board.actions';
import { socketService } from '../services/socket.service';

export class _Chat extends React.Component {
  state = {
    isOpen: false,
    msg: { txt: '' },
    msgs: [],
    topic: 'Corollo',
    typingUser: null
  };

  componentDidMount() {
    const {board} = this.props
    if(board.chatHistory) this.setState({msgs: board.chatHistory}) 
    console.log(this.selectedDiv)


    socketService.setup()
    socketService.emit('chat topic', this.state.topic)
    socketService.on('chat addMsg', this.addMsg)
    socketService.on('userIsTyping', this.toggleUserIsTyping)
    socketService.on('userStoppedTyping', this.toggleUserIsTyping)
}

componentDidUpdate(prevState) {

  if(!prevState.msg) return
    if (!prevState.msg.txt
        && [...this.state.msg.txt].length > 0) {
        console.log('I am typing');
        socketService.emit('iAmTyping', this.props.user)
    }
    if (prevState.msg.txt
        && !this.state.msg.txt) {
        console.log('I stopped typing');
        socketService.emit('iStoppedTyping', this.props.user)
    }

}

componentWillUnmount() {
  const { board } = this.props
  var boardToSave = board
  this.props.onSaveBoard(boardToSave)

    socketService.off('chat addMsg')
    socketService.off('userIsTyping')
    socketService.off('userStoppedTyping')
    socketService.terminate()



}

addMsg = newMsg => {
  
    const { board } = this.props

    this.setState(prevState => ({ msgs: [...prevState.msgs, newMsg] }))

    let boardToSave = board
    boardToSave.chatHistory ?
        boardToSave.chatHistory.push(newMsg) : boardToSave.chatHistory = [newMsg]
    // console.log(boardToSave);
    this.props.onEditBoard(boardToSave)
    this.setState({ msgs: this.state.msgs })

    this.selectedDiv.scrollIntoView({behavior: "smooth"});


}

toggleUserIsTyping = (user) => {
    user ?
        this.setState(prevState => (
            {
                ...prevState,
                typingUser: user.username
            })) :
        this.setState(prevState => (
            {
                ...prevState,
                typingUser: null
            }))

}


sendMsg = ev => {
    ev.preventDefault()
    if(!this.state.msg.txt) return
    const from = (this.props.user) ? this.props.user.fullname : 'guest'
    const userImg = (this.props.user) ? this.props.user.imgUrl : ''
    console.log('user',  this.props.user)
    socketService.emit('chat newMsg', { from, txt: this.state.msg.txt, userImg: userImg})
    this.setState({ msg: { from: from, txt: '' } })
}

msgHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => {
        return { 
            msg: {
                ...prevState.msg,
                [name]: value
            }
        }
    })
}


  openElement = (ev) => {
    // this.selectedDiv.scrollIntoView();
    if(this.selectedDiv) this.selectedDiv.scrollIntoView()

    this.setState({ isOpen: true });
    console.log('open?', this.state.isOpen);
  };

  closeElement = (ev) => {

    ev.preventDefault();
    ev.stopPropagation();
    this.setState({ isOpen: false });
    console.log('open?', this.state.isOpen);
  };

  render() {
      const {board,user} = this.props
      const currUser = (user) ? user.fullname : 'guest'
      console.log('chat' , board.chatHistory);
    const { typingUser } = this.state
    const { isOpen } = this.state;
    return (
      <div
        className={`floating-chat enter  ${isOpen && 'expand'}`}
        onClick={this.openElement}
      >
       {!isOpen &&  <i className="fa fa-comments" aria-hidden="true"></i>}
        <div className={`chat  ${isOpen && 'enter'}`}>
          <div className="header">
  
            <span className="title">what's on your mind?</span>
            <button>
              <i className="fa fa-times" onClick={this.closeElement}></i>
            </button>
          </div>
          <ul className="messages">
            
                {board.chatHistory?.map((msg, idx) => (
                  <div key={idx} ref={(div) => {
                    if(idx === board.chatHistory.length - 1)  this.selectedDiv = div;
                  }} className= {`messege flex  ${(msg.from === currUser ? 'self' : 'other')}`}>
                    <img className='user-img' src={msg.userImg} alt="" />
                    <li  className={(msg.from === currUser ? 'self' : 'other')} key={idx}>{msg.txt}</li>
                  </div>
                    ))}
          </ul>
          <div className="typing-user">
                    {typingUser && <p>{typingUser} is typing...</p>}
                </div>
          <div className="footer">
            <form onSubmit={this.sendMsg}>
              <input
         className="text-box" 
                type="text"
                value={this.state.msg.txt}
                onChange={this.msgHandleChange}
                name="txt"
                autoComplete="off"
              />
              <button id="sendMessage">send</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {

    user: state.userModule.user,
    board: state.boardModule.board
  };
}

const mapDispatchToProps = {
onEditBoard,
onSaveBoard
};

export const Chat = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(_Chat));
