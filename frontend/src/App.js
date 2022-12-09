import React, { Component } from 'react';
import { decodeToken } from "react-jwt";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
// Import Components
import Login from './components/Login';
import AdminHomepage from './components/AdminHomepage';
import UserHomepage from './components/UserHomepage';

class App extends Component {
    constructor(props) {
        super(props);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleCreateUserButtonClick = this.handleCreateUserButtonClick.bind(this);
        this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
        this.logOut = this.logOut.bind(this);
        this.getMissingPersonsListFromDatabase = this.getMissingPersonsListFromDatabase.bind(this);
        this.state = {
            error: null,
            username: "",
            password: "",
            token: "", // Saves the decoded token to the empty object when state is set
            loggedIn: false, // Renders the todo list if logged in is true or the login page if false
            isAdmin: false, // Saves the boolean if the user is an admin or not
            missingPersonList: []
        };
    };

    // Functions below sets the state of the username and password to the value that the user has entered
    handleUserNameChange(e) {
        this.setState({username: e.target.value})
    };

    handlePasswordChange(e) {
        this.setState({password: e.target.value})
    };

    // Function below invoked when the user clicks the login button. The jwt is fetched and stored in state and loggedin set to true
    handleLoginButtonClick() {
        fetch("/users/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
        })
        .then(res => res.json())
            .then(response => {
            const theDecodedToken = decodeToken(response.token);
            let isAdmin = theDecodedToken.admin;
            this.setState({ loggedIn: true, token: response.token, isAdmin: isAdmin})
        })
        .catch(error => console.log('Error:', error))
    };

    // Function invoked when the user clicks the add user button. New user is added to the database
    handleCreateUserButtonClick() {
        fetch("/users/adduser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
        })
        .then(res => res.json())
        .then(response => {
        alert('The user has been added. Please Log In', JSON.stringify(response));
        })
        .catch(error => console.log('Error:', error))
    };

    // sets the loggedin state to false so the login page is rendered
    logOut() {
        this.setState({ loggedIn: false, token: "", username: "", password: "", isAdmin: false, missingPersonList: [] });
    };

    // Get the missing persons list from the database
    getMissingPersonsListFromDatabase() {
        fetch("/mp/listmp", {
            method: "GET"
        })
        .then(res => res.json())
        .then(
        (result) => {
          this.setState({ missingPersonList: result });
        },
        (error) => {
          this.setState({ error });
        }
      );
    };
    
    // When the user enters the login details and clicks loginbutton, the user is checked if they are an admin. 
    // The admin or the user homepage will render depending on if the user is an admin or not
    render() {
        const { loggedIn, isAdmin, missingPersonList } = this.state;

        if (!loggedIn) {
            return (
                <div id='loginDiv'>
                    <Login
                        handleUserNameChange={this.handleUserNameChange}
                        handlePasswordChange={this.handlePasswordChange}
                        handleCreateUserButtonClick={this.handleCreateUserButtonClick}
                        handleLoginButtonClick={this.handleLoginButtonClick}
                    />
                </div>
            )
        } else if (isAdmin) {
            return (
                <div>
                    <AdminHomepage
                        getMissingPersonsListFromDatabase={this.getMissingPersonsListFromDatabase}
                        logOut={this.logOut}
                        missingPersonList={missingPersonList}
                    />
                </div>
            )
        } else {
            return (
                <div>
                    <UserHomepage
                        getMissingPersonsListFromDatabase={this.getMissingPersonsListFromDatabase}
                        logOut={this.logOut}
                      missingPersonList={missingPersonList}
                    />
                </div>
            )
        }
  }
};

export default App;

/*
I used this website to assist with the react-jwt: https://www.npmjs.com/package/react-jwt
*/