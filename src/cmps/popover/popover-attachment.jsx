import { Component } from "react"
import { FileUpload } from "../file-upload"
import { Popover } from "./popover"

export class PopoverAttachment extends Component {

    state = {
        file: null,
        link: null,
        formData: null,
        linkTxt: '',
    }

    handleChange = ({ target }) => {
        this.setState({ linkTxt: target.value })
    }

    onAttachLink = (ev) => {
        ev.preventDefault()
        if (!this.state.linkTxt) return
        this.props.addFile(this.state.linkTxt)
    }

    onFileUpload = (fileUrl) => {
        this.props.addFile(fileUrl)
    }

    render() {
        const { inputTxt } = this.state
        return <Popover title="Attach from...">
            <div className="attach-pop-over-content">
                <FileUpload onFileUpload={this.onFileUpload} />
                <form onSubmit={this.onAttachLink}>
                    <label className="pop-over-label" htmlFor="attach-input">Attach a link</label>
                    <input type="text" className="pop-over-input" value={inputTxt} id="attach-input"
                        onChange={this.handleChange} placeholder="Attach any link here..." />
                    <button className="primary-btn btn-wide">Attach</button>
                </form>
            </div>
        </Popover>
    }
}