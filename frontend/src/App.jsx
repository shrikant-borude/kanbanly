import './App.css';
import React from 'react';

class Card extends React.Component {
  render() {
    const { card, onDelete, onEdit } = this.props;

    return (
      <li>
        <span>{card.title}</span>
        <button onClick={() => onDelete(card)}>Delete</button>
        <button onClick={() => onEdit(card)}>Edit</button>
      </li>
    );
  }
}

class List extends React.Component {
  render() {
    const {
      list,
      cards,
      onAddCard,
      onDeleteCard,
      onEditCard
    } = this.props;


    const listCards = cards.filter(
      card => card.board_list === list.id
    );

    return (
      <div className="list">
        <span>{list.title}</span>
        
        <ul>
          {listCards.map(card => (
            <Card
              key={card.id}
              card={card}
              onDelete={onDeleteCard}
              onEdit={onEditCard}
            />
          ))}
        </ul>
        <span><button onClick={() => onAddCard(list)} className='addCardButton'>+ Add Card</button></span>
      </div>
    );
  }
}

class BoardForm extends React.Component {
  render() {
    const {
      title,
      onSubmit,
      onChange,
      onCancel
    } = this.props;

    return (
      <div className="boardForm">
        <form onSubmit={onSubmit}>
          <h2>Add Board</h2>
          <input type="text" value={title} onChange={onChange} placeholder="Board title" required />
          <button type="submit"> Add </button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      </div>
    );
  }
}

class ListForm extends React.Component {
  render() {
    const { title, onSubmit, onChange, onCancel } = this.props;

    return (
      <div className="listForm">
        <form onSubmit={onSubmit}>
          <h2>Add List</h2>
          <input type="text" value={title} onChange={onChange} placeholder="List title" required />
          <button type="submit">Add</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      </div>
    );
  }
}

class CardForm extends React.Component {
  render() {
    const {
      editing,
      selectedList,
      newCard,
      onSubmit,
      onChangeTitle,
      onChangeDescription,
      onCancel
    } = this.props;

    if (!selectedList) {
      return null;
    }

    return (
      <div className="cardForm">
        <form onSubmit={onSubmit}>
          <h1>
            {editing
              ? `Edit card in ${selectedList.title}`
              : `Add card to ${selectedList.title}`}
          </h1>
          <input type="text" value={newCard.title} onChange={onChangeTitle} placeholder="Card title"/>
          <br />
          <textarea value={newCard.description} onChange={onChangeDescription} placeholder="Card description"/>
          <br />

          <button type="submit">
            {editing ? 'Edit' : 'Add'}
          </button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </form>
      </div>
    );
  }
}

class Kanban extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boardList: [],
      cards: [],
      boards: [],
      showCardForm: false,
      showListForm: false,
      newListTitle: '',
      selectedList: null,
      newCard: {
        title: '',
        description: ''
      },
      editing: false
    };
  }

  componentDidMount() {
    this.fetchLists();
    this.fetchCards();
    this.fetchBoards();
  }

  fetchBoards = () => {
    fetch('http://127.0.0.1:8000/api/boards/')
      .then(response => response.json())
      .then(data => {
        this.setState({
          boards: data
        });
      });
  };

  fetchLists = () => {
    fetch('http://127.0.0.1:8000/api/lists/')
      .then(response => response.json())
      .then(data => {
        this.setState({
          boardList: data
        });
      });
  };

  fetchCards = () => {
    fetch('http://127.0.0.1:8000/api/cards/')
      .then(response => response.json())
      .then(data => {
        this.setState({
          cards: data
        });
      });
  };

  deleteCard = (card) => {
    fetch(
      `http://127.0.0.1:8000/api/cards/${card.id}/`,
      {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      }
    ).then(response => {
      console.log('Response:', response.status);
      this.fetchCards();
    });
  };

  addCard = (list) => {
    this.setState({
      editing: false,
      showCardForm: true,
      selectedList: list,
      newCard: {
        title: '',
        description: ''
      }
    });
  };

  editCard = (card) => {
    const list = this.state.boardList.find(
      list => list.id === card.board_list
    );

    this.setState({
      editing: true,
      showCardForm: true,
      selectedList: list,
      newCard: {
        id: card.id,
        title: card.title,
        description: card.description
      }
    });
  };

  handleTitleChange = (event) => {
    this.setState({
      newCard: {
        ...this.state.newCard,
        title: event.target.value
      }
    });
  };

  handleDescriptionChange = (event) => {
    this.setState({
      newCard: {
        ...this.state.newCard,
        description: event.target.value
      }
    });
  };

  submitList = (event) => {
    event.preventDefault();

    fetch('http://127.0.0.1:8000/api/lists/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.newListTitle,
        board: this.props.board.id
      })
    })
      .then(response => response.json())
      .then(() => {
        this.setState({
          showListForm: false,
          newListTitle: ''
        });
        this.fetchLists();
      });
  };

  handleListTitleChange = (event) => {
    this.setState({ newListTitle: event.target.value });
  };

  submitCard = (event) => {
    event.preventDefault();

    let url = 'http://127.0.0.1:8000/api/cards/';
    let method = 'POST';

    if (this.state.editing) {
      url = `http://127.0.0.1:8000/api/cards/${this.state.newCard.id}/`;
      method = 'PATCH';
    }

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.newCard.title,
        description: this.state.newCard.description,
        board_list: this.state.selectedList.id
      })
    })
      .then(response => response.json())
      .then(() => {
        this.setState({
          editing: false,
          showCardForm: false,
          selectedList: null,
          newCard: {
            title: '',
            description: ''
          }
        });

        this.fetchCards();
      });
  };

  render() {
    const {
      boardList,
      cards,
      showCardForm,
      showListForm,
      selectedList,
      newListTitle,
      newCard,
      editing
    } = this.state;
    
    const { board, onGoHome } = this.props; 

    const boardLists = boardList.filter(
      list => list.board === board.id
    );

    return (
      <div>
      <div id='appName'>kanbanly</div>
      <div className="boardHeader">
        <h1 className='boardTitle'>{board.title}</h1>
        <div className='left-header'>
          <button onClick={() => this.setState({ showListForm: true })}>
            + Add List
          </button>
          <button onClick={onGoHome} className='addListButton'>
            Home
          </button>
        </div>
      </div>

        <div className="horizontal"></div>
        <p style={{marginLeft: "20px", color: "grey"}}>Add lists of your choice like Started, In progress, Finished for your project or task.</p>

        {showListForm && (
          <ListForm
            title={newListTitle}
            onSubmit={this.submitList}
            onChange={this.handleListTitleChange}
            onCancel={() => this.setState({ showListForm: false, newListTitle: '' })}
          />
        )}

        {showCardForm && (
          <CardForm
            editing={editing}
            selectedList={selectedList}
            newCard={newCard}
            onSubmit={this.submitCard}
            onChangeTitle={this.handleTitleChange}
            onChangeDescription={this.handleDescriptionChange}
            onCancel={() => this.setState({ showCardForm: false, newCard: {title: "", description: ""}})}

          />
        )}

        <div className="lists">
          {boardLists.map(list => (
            <List
              key={list.id}
              list={list}
              cards={cards}
              onAddCard={this.addCard}
              onDeleteCard={this.deleteCard}
              onEditCard={this.editCard}
            />
          ))}
        </div>
      </div>
    );
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boards: [],
      showBoardForm: false,
      newBoardTitle: ''
    };
  }

  componentDidMount() {
    this.fetchBoards();
  }

  fetchBoards = () => {
    fetch('http://127.0.0.1:8000/api/boards/')
      .then(response => response.json())
      .then(data => {
        this.setState({
          boards: data
        });
      });
  };

   submitBoard = (event) => {
    event.preventDefault();

    let url = 'http://127.0.0.1:8000/api/boards/';
    let method = 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.newBoardTitle,
      })
    }).then(() => {
      this.setState({
        showBoardForm: false,
        newBoardTitle: ''
      });

      this.fetchBoards();
    });
  };

  handleBoardTitleChange = (event) => {
    this.setState({
      newBoardTitle: event.target.value
    });
  };

  cancelBoardForm = () => {
    this.setState({
      showBoardForm: false,
      newBoardTitle: ''
    })
  }

  render() {
    const { boards, showBoardForm } = this.state;
    const { onSelectBoard } = this.props;

    return (
      <div>
        <div className="home">
          <div id='appName'>kanbanly</div>
          <h1>Boards</h1>
          <p style={{marginLeft: "20px", color: "grey"}}>Add boards for your projects or tasks to perform.</p>
          <div className='horizontal'></div>
          <button
            onClick={() => {
              this.setState({
                showBoardForm: true
              });
            }} className='addBoardButton'>
              + Add Board
            </button>

          {showBoardForm && (
            <BoardForm
              title={this.state.newBoardTitle}
              onSubmit={this.submitBoard}
              onChange={this.handleBoardTitleChange}
              onCancel={() =>
                this.setState({
                  showBoardForm: false,
                  newBoardTitle: ''
                })
              }
            />
          )}

          <div className="boards">
            {boards.map(board => (
              <div key={board.id} className="board" onClick={() => onSelectBoard(board)}>{board.title}</div>
            ))}
          </div>

        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedBoard: null
    };
  }

  selectBoard = (board) => {
    this.setState({
      selectedBoard: board
    });
  };

  goHome = () => {
    this.setState({
      selectedBoard: null
    })
  }
  render() {
    if (!this.state.selectedBoard) {
      return <Home onSelectBoard={this.selectBoard} />;
    }

    return (
      <Kanban
        board={this.state.selectedBoard}
        onGoHome={this.goHome}
      />
    );
  }
}

export default App;
