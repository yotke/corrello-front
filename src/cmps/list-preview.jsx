import { Component } from 'react';
import { connect } from 'react-redux';
import { CardPreview } from './card-preview.jsx';
import {CardAdd} from './card-add.jsx'

class _ListPreview extends Component {
  state = {
    isAddToggeld: false,
    cards: ''
  };

  toggleCardAdd = () => {
    const { isAddToggeld } = this.state
    this.setState({ isAddToggeld: !isAddToggeld })
}


  render() {
    const { board, currList, onSaveBoard, listIdx } = this.props;
    const { isAddToggeld } = this.state;
    this.state.cards =  currList.cards
    return (
      <div className="list-preview" key={listIdx}>
        <div className="list-header">
          <h2>{currList.title}</h2>
        </div>
        <div className="card-container">
          {console.log('curr list', currList)}
          {currList.cards.map((currCard, cardIdx) => (
            <CardPreview
              key={currCard.id}
              card={currCard}
              cardIdx={cardIdx}
              currList={currList}
              board={board}
              onSaveBoard={onSaveBoard}
            />
          ))}
          {isAddToggeld && (
            <CardAdd
              board={board}
              currList={currList}
              onSaveBoard={onSaveBoard}
              toggleCardAdd={this.toggleCardAdd}
              cards={this.state.cards}
            />
          )}
        </div>
        {!isAddToggeld && (
          <div className="list-footer" onClick={this.toggleCardAdd}>
            <span className="add-icon">+</span> Add card
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = {};

export const ListPreview = connect(null, mapDispatchToProps)(_ListPreview);