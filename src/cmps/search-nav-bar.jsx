import React from 'react'

export class SearchNavBar extends React.Component {
    state = {
        filterBy: {
            name: '',
            emailAddress: '',

        },
        field: ''
    };


    handleChange = (ev) => {
        const field = ev.target.name;
        const value =
            ev.target.type === 'number' ? +ev.target.value : ev.target.value;
        this.setState({ filterBy: { ...this.state.filterBy, [field]: value } }, () => {
            // console.log('this.state.filterBy', this.state.filterBy);
            this.props.onSetFilter(this.state.filterBy)
        });
    };
    onSelectSort = (ev) => {
        console.log(ev.target.value)
    }

    onFilter = (ev) => {
        ev.preventDefault();
        this.props.onSetFilter(this.state.filterBy)
    };

    render() {
        return (
            <section className="search-bar-container flex">
                <div className="left-search-bar-container flex">
                    <div className="sort-by-container">
                        Sort by
                        <div className="input-sort-by">
                            <select name="field" id="field" onChange={(ev) => {
                                this.onSelectSort(ev)
                            }}>
                                <option value="empty"></option>
                                <option value="recently">Most recently active</option>
                                <option value="leastRecently">Least recently active</option>
                                <option value="alphabetUp">Alphabetically A-Z</option>
                                <option value="alphabetDown">Alphabetically Z-A</option>
                            </select>
                            <button>Filter</button>
                        </div>
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