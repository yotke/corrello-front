import { Component } from "react"
import { FileUpload } from "../FileUpload"
import { Popover } from "./Popover"
import { utilService } from '../../services/util.service'

export class PopoverAttachment extends Component {

    state = {
        file: null,
        link: null,
        formData: null,
    }


    onAttachLink = (ev) => {
        ev.preventDefault()
        if (!this.state.linkTxt) return
        const isValid = utilService.isValidUrl(this.state.linkTxt)
        if (isValid) this.props.addFile(this.state.linkTxt)
    }

    onFileUpload = (fileUrl) => {
        this.props.addFile(fileUrl)
    }

    render() {
        const { inputTxt } = this.state
        return <Popover title="Attach from...">
            <div className="attach-pop-over-content">
                <FileUpload onFileUpload={this.onFileUpload} />
            </div>
        </Popover>
    }

}