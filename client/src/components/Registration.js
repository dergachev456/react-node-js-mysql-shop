import React, { Component } from 'react'

export default class Registration extends Component {
    state = {
        name: "",
        surname: "",
        email: "",
        phone_number: "",
        password: "",
    }
    handleName = (event) => {
        this.setState({ name: event.target.value });
    }
    handleSurname = (event) => {
        this.setState({ surname: event.target.value });
    }
    handleEmail = (event) => {
        this.setState({ email: event.target.value });
    }
    handlePhoneNumber = (event) => {
        this.setState({ phone_number: event.target.value });
    }
    handlePassword = (event) => {
        this.setState({ password: event.target.value });
    }
    sendData = () => {
        fetch('http://localhost:8080/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    name: this.state.name,
                    surname: this.state.surname,
                    email: this.state.email,
                    phone_number: this.state.phone_number,
                    password: this.state.password
                }
            })
        });
        localStorage.clear();
        this.props.history.push('/login');
    }
    render() {
        return (
            <div className="registration">
                <h2 className="registration__title">Create account</h2>
                <span className="registration__label">Your name</span>
                <input onChange={this.handleName} className="registration__input" type="text" required />
                <span className="registration__label">Surname</span>
                <input onChange={this.handleSurname} className="registration__input" type="text" required />
                <span className="registration__label">Email</span>
                <input onChange={this.handleEmail} className="registration__input" type="text" required />
                <span className="registration__label">Phone number</span>
                <input onChange={this.handlePhoneNumber} className="registration__input" type="text" required />
                <span className="registration__label">Password</span>
                <input onChange={this.handlePassword} className="registration__input" type="password" required />
                <button onClick={this.sendData} className="registration__button m_button">Create your Sho(p) account</button>
            </div>
        )
    }
}
