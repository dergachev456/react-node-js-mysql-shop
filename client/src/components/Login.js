import React, { Component } from 'react'

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        data: null,
        isError: false,
        isLogedIn: true,
        user_name: ''
    }
    handleEmail = (event) => {
        this.setState({ email: event.target.value });
    }
    handlePassword = (event) => {
        this.setState({ password: event.target.value });
    }
    componentDidMount() {
        if (localStorage.getItem('token') !== null) {
            this.setState({ isLogedIn: false })
        }
        let user_data = JSON.parse(localStorage.getItem('user_data'));
        if (user_data !== null) {
            this.setState({ user_name: user_data.name })
        }
    }
    sendData = () => {
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    email: this.state.email,
                    password: this.state.password
                }
            })
        })
            .then(responce => responce.json())
            .then(data => {                
                localStorage.setItem('token', data.token);
                const user = {
                    name: data.user.name,
                    id: data.user.id,
                    isAdmin: data.user.isAdmin
                }
                localStorage.setItem('user_data', JSON.stringify(user));
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ isError: true });
            })
    }
    logout = () => {
        localStorage.clear()
        this.setState({ isLogedIn: true });
    }
    render() {        
        return (
            <React.Fragment>
                {
                    this.state.isLogedIn && (
                        <div className="login">
                            <div className="login__container">
                                <h2 className="login__title">Login</h2>
                                <span className="login__label">Your email</span>
                                <input onChange={this.handleEmail} type="text" className="login__input" />
                                <span className="login__label">Password</span>
                                <input onChange={this.handlePassword} type="password" className="login__input" />
                                <button onClick={this.sendData} className="login__button m_button">Continue</button>
                            </div>
                            {
                                this.state.isError && <h2 className="login__error">Incorrect data</h2>
                            }
                        </div>
                    )
                }
                {
                    !this.state.isLogedIn && (
                        <div className="logout__container">
                            <h2 className="logout__title">Welcome, {this.state.user_name}</h2>
                            <button onClick={this.logout} className="logout__button m_button">Logout</button>
                        </div>
                    )
                }
            </React.Fragment>
        )
    }
}
