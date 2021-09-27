
import { CardDetailsChecklistTodo } from './card-details-checklist-todo.jsx'
import { CardDetailsChecklistDelete } from './card-details-checklist-delete.jsx';
import { CardDetailsChecklistTitleEdit } from './card-details-checklist-title-edit.jsx';

export function CardDetailsChecklist({ checklist, onDeleteChecklist }) {

    return (
        <div className="checklists-container" >
            <div className="checklists-preview-container">
                <h3>Check List: {checklist.title}</h3>
                {/* <CardDetailsChecklistTitleEdit noteId={note.id} title={note.info.label} todos={true}/> */}
                <ul className="checklist-checks">
                    {/* {note.info.todos.map((todo, index) => <CardDetailsChecklistCheck card={card} index={index} key={index} cardId={card.id} />)} */}
                    {/* {checklist.todos.map((todo, index) => <CardDetailsChecklistTodo todo={todo} index={index} key={index} todoId={todo.id} />)} */}
                </ul>
            </div>
            <div className="flex align-center">
                <CardDetailsChecklistDelete checklist={checklist} onDeleteChecklist={onDeleteChecklist} />
            </div>
        </div>
    )
}
