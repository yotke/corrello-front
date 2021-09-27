import { Component } from 'react';
import { connect } from 'react-redux';
import { CardPreview } from './card-preview.jsx';
import { CardAdd } from './card-add.jsx'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

class _ListPreview extends Component {
  state = {
    isAddToggeld: false,
    cards: ''
  };

  toggleCardAdd = () => {
    const { isAddToggeld } = this.state
    this.setState({ isAddToggeld: !isAddToggeld })
  }

  handleOnDragEnd = (result) => {
    const { listIdx } = this.props
    const { cards } = this.props.currList
    console.log(cards);
    this.props.handleOnDragEndCards(result, listIdx, cards)
  }


  render() {
    const { board, currList, onSaveBoard, listIdx } = this.props;
    const { isAddToggeld } = this.state;
    this.state.cards = currList.cards
    return (
      <div className="list-preview" key={listIdx}>
        <div className="list-header">
          <h2>{currList.title}</h2>
        </div>
        <div className="card-container" >
          {/* <DragDropContext onDragEnd={this.handleOnDragEnd}> */}
          <Droppable droppableId={`${listIdx}`} >
            {(provided) => (
              <ul className="card-list-element clean-list"  {...provided.droppableProps} ref={provided.innerRef}>
                {/* {console.log('curr list', currList)} */}
                {currList.cards.map((currCard, cardIdx) => (
                  <Draggable key={currCard.id} draggableId={currCard.id} index={cardIdx}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onDrag={(ev) => {
                        { console.log('ev', ev) }
                        this.props.onCardClicked()
                      }
                      }>
                        <CardPreview
                          key={currCard.id}
                          card={currCard}
                          cardIdx={cardIdx}
                          currList={currList}
                          board={board}
                          onSaveBoard={onSaveBoard}
                        />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
          {/* </DragDropContext> */}
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
