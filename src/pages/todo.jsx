
  onSaveMembers = () => {
    const { card } = this.state;
    //card = {...card }

    //debugger;
    const member = {
      _id: utilService.makeId(),
      username: prompt('Write user name'),
      fullname: prompt('Write full name'),
      imgUrl:
        'https://ca.slack-edge.com/T021743D5T8-U024HLL8UQZ-caf8640ec902-512',
    };

    if (!card.members) card.members = [];

    card.members.push(member);
    this.setState({ card }, this.onSaveCardToBoard());
  };



//cheklist

  onSaveChecklist = () => {
    const { card } = this.state;
    //card = {...card }

    //debugger;
    const checklist = {
      id: utilService.makeId(),
      title: prompt('Write new checklist name'),
      todos: [],
    };

    const newTodosCount = +prompt('How many todos to add?');

    for (let i = 0; i < newTodosCount; i++) {
      const todo = {
        id: utilService.makeId(),
        title: prompt('Write new todo name'),
        isDone: false,
      };
      checklist.todos.push(todo);
    }

    if (!card.checklists) card.checklists = [];

    card.checklists.push(checklist);
    this.setState({ card }, this.onSaveCardToBoard());
  };