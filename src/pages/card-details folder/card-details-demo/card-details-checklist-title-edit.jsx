// import { noteService } from "../services/note.service.js"
// const { withRouter } = ReactRouterDOM
// import { ImageHover } from "./image-hover.jsx"

// export class _CardDetailsChecklistTitleEdit extends React.Component {

//     state = {
//         isEdit: false,
//         editTitle: '',
//         isTodos: false
//     }

//     isFirstToggle = true

//     componentDidMount() {
//         if (this.props.todos) this.setState({ isTodos: true })
//     }

//     toggleEditStatus = () => {
//         const isEdit = this.state.isEdit
//         this.setState({ isEdit: !isEdit })
//     }

//     handleOnChange = (ev) => {
//         this.isFirstToggle = false
        
//         const editTitle = ev.target.value
//         this.setState({ editTitle })
//     }

//     onCancelEdit = () => {
//         this.isFirstToggle = true
//         this.setState({ isEdit: false, editTitle: '' })
//     }

//     onSaveNewTitle = () => {
//         const { editTitle, isTodos } = this.state
//         const { noteId } = this.props

//         this.isFirstToggle = true

//         //debugger
//         if (!editTitle) {
//             this.toggleEditStatus();
//             return
//         }
//         noteService.updateNoteTitle(noteId, editTitle, isTodos)
//             .then(() => {
//                 //todo message
//                 this.setState({ isEdit: false, editTitle: '' })
//                 this.props.history.push('/note-app')
//             })

//         this.toggleEditStatus()
//     }

//     render() {
//         const { title } = this.props
//         const { isEdit, editTitle } = this.state

//         console.log('title', title)
//         //console.log('isEdit', isEdit)
//         //console.log('editTitle', editTitle)

//         return (
//             <React.Fragment>
//                 {!isEdit &&
//                     <section className="note-title">
//                         <div className="text-transform-none">{title}</div>
//                         <ImageHover className="img-edit-title" name="edit-title" onHoverSrc="js/apps/keep/img/edit-note_select.png"
//                             onRegularSrc={`js/apps/keep/img/edit-note.png`} onClick={this.toggleEditStatus} />
//                     </section>
//                 }
//                 {isEdit &&
//                     <section className="note-title">
//                         <input className="note-title-edit-input" type="text" name="editTitle" value={(!this.isFirstToggle) ? editTitle : title} 
//                                onChange={this.handleOnChange} autocorrect="off" autocapitalize="none" />
//                         <div>
//                             <ImageHover className="img-save-edit" name="save-edit" onHoverSrc="js/apps/keep/img/ok_select.png"
//                                 onRegularSrc={`js/apps/keep/img/ok.png`} onClick={this.onSaveNewTitle} />

//                             <ImageHover className="img-cancel-edit" name="cancel-edit" onHoverSrc="js/apps/keep/img/cancel_select.png"
//                                 onRegularSrc={`js/apps/keep/img/cancel.png`} onClick={this.onCancelEdit} />
//                         </div>
//                     </section>
//                 }
//             </React.Fragment>
//         )
//     }
// }


// export const CardDetailsChecklistTitleEdit = withRouter(_CardDetailsChecklistTitleEdit)
