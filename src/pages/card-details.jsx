import React from 'react'
import { connect } from 'react-redux'

class _CardDetails extends React.Component {

    constructor() {
        super();
        this.state = {
          show: false
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
      }

    componentDidMount() {
        





    }

    showModal = () => {
        this.setState({ show: true });
      };
    
      hideModal = () => {
        this.setState({ show: false });
      };

    render() {
    return (
      <main>
        <h1>React Modal</h1>
        <button type="button" onClick={this.showModal}>
          Open
        </button>
      </main>
    );
  }
}

function mapStateToProps(state) {
    return {
        card: state.userModule.card
    }
}

const mapDispatchToProps = {
    loadCard
}


export const CardDetails = connect(mapStateToProps, mapDispatchToProps)(_CardDetails)
