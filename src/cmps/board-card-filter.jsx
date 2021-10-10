
export class EmailFilter extends React.Component {
    state = {
        filterBy: {
            name: '',
        },
        field: ''
    };

    // componentDidMount() { //todo
    //     this.setState({ filterBy: { ...this.state.filterBy, name: '' } },)
    //     this.setState({ filterBy: { ...this.state.filterBy, emailAddress: '' } },)
    // }

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
            <form className='email-filter' onSubmit={this.onFilter}>
                <div className="filter-input-container">
                    {/* <label htmlFor='by-name'>By Name</label> */}
                    <input className="filter-input"
                        name={field}
                        id='by-name'
                        type='text'
                        placeholder='name'
                        value={filterBy[field]}
                        onChange={this.handleChange}
                    />
                    <select name="field" id="field" onChange={(ev) => {
                        this.onSelect(ev)
                    }}>
                        <option value="empty"></option>
                        <option value="name">Name</option>
                    </select>
                    <button>Filter</button>
                </div>
            </form>
        );
    }

}