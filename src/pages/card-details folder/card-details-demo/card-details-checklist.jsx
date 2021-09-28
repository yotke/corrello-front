
import { CardDetailsChecklistTodo } from './card-details-checklist-todo.jsx'
import { CardDetailsChecklistDelete } from './card-details-checklist-delete.jsx';
import { CardDetailsChecklistTitleEdit } from './card-details-checklist-title-edit.jsx';

export function CardDetailsChecklist({checklist, onDeleteChecklist,checklistId,  updateTodoStatusInCardChecklist}) {

    return (
        <div className="checklists-container" >
            <div className="checklists-preview-container">
                <div className="flex align-center">
                    <h3>Check List: {checklist.title}</h3>
                    <CardDetailsChecklistDelete checklist={checklist} onDeleteChecklist={onDeleteChecklist} />
                </div>
                {/* <CardDetailsChecklistTitleEdit noteId={note.id} title={note.info.label} todos={true}/> */}
                <ul className="checklist-checks">
                    {/* {checklist.todos.map((todo, index) => <CardDetailsChecklistTodo todo={todo} index={index} key={index} todoId={todo.id} />)} */}
                    {checklist.todos.map((todo, index) => <CardDetailsChecklistTodo todo={todo} index={index} key={index} checklistId={checklistId} todoId={todo.id} updateTodoStatusInCardChecklist={updateTodoStatusInCardChecklist} />)}
                </ul>
            </div>

        </div>
    )
}
