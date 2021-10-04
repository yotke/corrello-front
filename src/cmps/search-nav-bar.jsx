import React from 'react'

export class SearchNavBar extends React.Component {
    render() {

        return (
            <section className="search-bar-container flex">
                <div className="left-search-bar-container flex">
                    <div className="sort-by-container">
                        Sort by
                    </div>
                    <div className="filter-by-container">
                        Filter by
                    </div>
                </div>
                <div className="search-all-work-space">
                    Search
                </div>

            </section>
        )
    }



}