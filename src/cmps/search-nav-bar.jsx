import React from 'react'

export class SearchNavBar extends React.Component {
    state = {
        filterBy: {
            title: '',
        },
        field: ''
    };


    componentDidMount() {
        const boards = this.sortByRecentlyUsed(this.props.boards)
        this.props.onSelectSort(boards)

    }
    onSelectSort = (ev) => {
        let { boards } = this.props
        const sortBy = ev.target.value
        switch (sortBy) {
            case 'recently':
                boards = this.sortByRecentlyUsed(boards); break;
            case 'leastRecently':
                boards = this.sortByLeastRecentlyUsed(boards); break;
            case 'alphabetUp':
                boards = this.sortByAlfaBet_A_Z(boards); break;
            case 'alphabetDown':
                boards = this.sortByAlfaBet_Z_A(boards); break;
            default:
                boards = boards
        }
        this.props.onSelectSort(boards)
    }

    sortByRecentlyUsed = (boards) => {
        boards.sort(function (a, b) {
            return b.recentBoardInsert - a.recentBoardInsert;
        });
        console.log('boards', boards);
        return boards
    }
    sortByLeastRecentlyUsed = (boards) => {
        boards.sort(function (a, b) {
            return a.recentBoardInsert - b.recentBoardInsert;
        });
        console.log('boards', boards);
        return boards
    }
    sortByAlfaBet_A_Z = (boards) => {
        boards.sort(function (a, b) {
            if (a.title < b.title) { return -1; }
            if (a.title > b.title) { return 1; }
            return 0;
        })
        return boards
    }
    sortByAlfaBet_Z_A = (boards) => {
        boards.sort(function (a, b) {
            if (a.title > b.title) { return -1; }
            if (a.title < b.title) { return 1; }
            return 0;
        })
        return boards
    }


    handleChange = (ev) => {

        const field = ev.target.name;
        const value =
            ev.target.type === 'number' ? +ev.target.value : ev.target.value;
        this.setState({ filterBy: { ...this.state.filterBy, [field]: value } }, () => {
            // console.log('this.state.filterBy', this.state.filterBy);
            this.props.onSetFilter(this.state.filterBy)
        });
    };



    onSelect = (ev) => {
        const { filterBy } = this.state
        for (const key in filterBy) {
            filterBy[key] = ''
        };

        this.setState({ field: ev.target.value, filterBy })
        this.props.onSetFilter(this.state.filterBy)
    }



    onFilter = (ev) => {
        ev.preventDefault();
        this.props.onSetFilter(this.state.filterBy)
    };

    render() {
        const { filterBy, field } = this.state
        const { name } = filterBy;
        return (
            <section className="search-bar-container flex">
                <div className="left-search-bar-container flex">
                    <div className="sort-by-container">
                        <label htmlFor="sort">Sort by</label>
                        <div className="select-sort-by-workspace">
                            <select className="_3TTqkG5muwOzqZ css-ufz0vj-control _1Dp3s5P2VP237V _2RUB_6xy0LOMWG" name="field" id="field" onChange={(ev) => {
                                this.onSelectSort(ev)
                            }}>
                                <option value="empty"></option>
                                <option value="recently">Most recently active</option>
                                <option value="leastRecently">Least recently active</option>
                                <option value="alphabetUp">Alphabetically A-Z</option>
                                <option value="alphabetDown">Alphabetically Z-A</option>
                            </select>
                            {/* <button>Filter</button> */}
                        </div>
                    </div>
                    <div className="filter-by-container">
                        <label htmlFor="filter">Filter by</label>
                        <select className="select-filter-by-workspace _3TTqkG5muwOzqZ css-ufz0vj-control _1Dp3s5P2VP237V _2RUB_6xy0LOMWG" name="field" id="field" onChange={(ev) => {
                            this.onSelect(ev)
                        }}>
                            <option value="empty">Choose Collection...</option>
                            <option value="title">Name</option>
                        </select>
                    </div>
                </div>
                <div className="search-all-work-space">
                    <form className='search-all-work-space-form ' onSubmit={this.onFilter}>
                        <label htmlFor="by-name">Search</label>
                        <input className="search-all-work-filter-input _3TTqkG5muwOzqZ css-ufz0vj-control _1Dp3s5P2VP237V _2RUB_6xy0LOMWG"
                            name={field}
                            id='by-name'
                            type='text'
                            placeholder="Search all workspace boards"
                            value={filterBy[field]}
                            onChange={this.handleChange}
                        />
                    </form>
                </div>

            </section>
        )
    }



}