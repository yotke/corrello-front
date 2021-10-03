import React from 'react'
export class NavBarBoard extends React.Component {
    render() {
        const { title } = this.props
        return (
            <section className="board-nav-bar-container flex">
                <div className="first-board-part">
                    <button className="_2w6KZMbwKqxZVN _3TTqkG5muwOzqZ ZOUktZwsING7-0"
                        data-test-id="board-views-switcher-button" type="button" title="Board views">
                        <span className="nch-icon _3W-26fmi3tFfon j0fswhntKdStWa _3--TIajgxM0c0V _3PafYdY35IpBIP">
                            <span className="sc-bdVaJa kBFJig" role="img" aria-label="ListIcon">
                                <svg width="15" height="15" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 7V15C2 16.1046 2.89543 17 4 17H6C7.10457 17 8 16.1046 8 15V7C8 5.89543 7.10457 5 6 5H4C2.89543 5 2 5.89543 2 7ZM4 7V15H6V7L4 7Z" fill="currentColor">
                                    </path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M9 7V13C9 14.1046 9.89543 15 11 15H13C14.1046 15 15 14.1046 15 13V7C15 5.89543 14.1046 5 13 5H11C9.89543 5 9 5.89543 9 7ZM11 7V13H13V7L11 7Z" fill="currentColor">
                                    </path>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 17V7C16 5.89543 16.8954 5 18 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H18C16.8954 19 16 18.1046 16 17ZM18 17V7L20 7V17H18Z" fill="currentColor">
                                    </path>
                                </svg>
                            </span>
                        </span>
                        <span class="_3wFtm5r_eYKs0G">Board</span>
                        <span class="nch-icon _3W-26fmi3tFfon j0fswhntKdStWa _3--TIajgxM0c0V ENexBs-1uoAbna _3PafYdY35IpBIP">
                            <span class="sc-bdVaJa kBFJig" role="img" aria-label="DownIcon">
                                <svg width="15" height="15" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z" fill="currentColor">
                                    </path>
                                </svg>
                            </span>
                        </span>
                    </button>
                    {/* <button className="board-board-btn flex">
                        <span className="sc-bdVaJa kBFJig" role="img" aria-label="ListIcon"><svg width="15" height="15" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 7V15C2 16.1046 2.89543 17 4 17H6C7.10457 17 8 16.1046 8 15V7C8 5.89543 7.10457 5 6 5H4C2.89543 5 2 5.89543 2 7ZM4 7V15H6V7L4 7Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9 7V13C9 14.1046 9.89543 15 11 15H13C14.1046 15 15 14.1046 15 13V7C15 5.89543 14.1046 5 13 5H11C9.89543 5 9 5.89543 9 7ZM11 7V13H13V7L11 7Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M16 17V7C16 5.89543 16.8954 5 18 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H18C16.8954 19 16 18.1046 16 17ZM18 17V7L20 7V17H18Z" fill="currentColor"></path></svg></span>
                        <span className="board-board-btn-span">
                            Board
                        </span>
                    </button> */}
                    <button className="new-board-board-btn">New</button>
                    <button className="star-board-btn">Star</button>
                    <span className="sperator-nav-board">|</span>
                    <button className="workspace-board-btn">View workspace</button>
                    <span className="sperator-nav-board">|</span>
                </div>
                       <div className="board-title" >
                    <h1>{title}</h1>
                </div>
                <div className="second-board-part">
                    <button className="invite-member-board-btn">Invite</button>
                    <button className="show-more-activity"><span>...</span> Show More</button>

                </div>
            </section>
        )
    }
}