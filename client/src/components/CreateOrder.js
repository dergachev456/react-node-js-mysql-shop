import React, { Component } from 'react'
export default class CreateOrder extends Component {
    state = {
        cart: null,
        totalPrice: null,
        street: '',
        number: '',
        district: '',
        country: '',
        city: '',
        promocode: '',
        wasSended: false,
        incorrectPromocode: false,
        successPromocode: false,
    }
    handleStreet = (event) => {
        this.setState({ street: event.target.value });
    }
    handleNumber = (event) => {
        this.setState({ number: event.target.value });
    }
    handleDistrict = (event) => {
        this.setState({ district: event.target.value });
    }
    handleCountry = (event) => {
        this.setState({ country: event.target.value });
    }
    handleCity = (event) => {
        this.setState({ city: event.target.value });
    }
    handlePromocode = (event) => {
        this.setState({ promocode: event.target.value });
    }
    componentDidMount() {
        let token = localStorage.getItem('token');
        let data = `Bearer ${token}`;
        fetch('http://localhost:8080/check-auth', {
            headers: {
                Authorization: data
            }
        })
            .then(responce => {
                if (responce.ok) {} else {
                    this.props.history.push('/login');
                }
            })
            .catch(error => {
                console.log('hui');
                
                this.props.history.push('/login');
            })

        const cart = JSON.parse(localStorage.getItem("cart"));
        const totalPrice = JSON.parse(localStorage.getItem("totalPrice"))
        this.setState({
            cart: cart,
            totalPrice: totalPrice
        })
    }
    sendPromocode = () => {
        this.setState({ incorrectPromocode: false });
        fetch('http://localhost:8080/promocode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                promocode: this.state.promocode
            })
        })
            .then(responce => responce.json())
            .then(data => {
                let newPrice = this.state.totalPrice;
                let discount = newPrice / 100 * data.discount;
                newPrice = newPrice - discount;
                this.setState({ totalPrice: newPrice });
                this.setState({ successPromocode: true });
            })
            .catch(error => {
                this.setState({ incorrectPromocode: true });
            })
    }
    sendData = () => {

        const user_data = localStorage.getItem('user_data');
        const user_id = JSON.parse(user_data).id;
        fetch('http://localhost:8080/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address: {
                    street: this.state.street,
                    number: this.state.number,
                    district: this.state.district,
                    city: this.state.city,
                    country: this.state.country
                },
                user_id: user_id,
                cart: this.state.cart,
                totalPrice: this.state.totalPrice
            })
        });
        this.setState({ wasSended: true });
        localStorage.setItem('cart', JSON.stringify([]));
    }
    render() {
        return (
            <div className="create-order__container">
                {
                    this.state.totalPrice &&
                    <React.Fragment>
                        <div className="promocode__container">
                            <h3 className="promocode__title">Enter promocode</h3>
                            <input onChange={this.handlePromocode} className="promocode__input" type="text" />
                            {
                                !this.state.successPromocode && <button onClick={this.sendPromocode} className="promocode__button m_button">Check promocode</button>
                            }
                            {
                                this.state.incorrectPromocode && <h6 className="promocode__incorrect">Incorrect promocode</h6>
                            }
                            <h2 className="promocode__price">Total price: {this.state.totalPrice} &#8372;</h2>
                        </div>
                    </React.Fragment>

                }
                {
                    this.state.cart && !this.state.wasSended && (
                        <React.Fragment>
                            <div className="create-order">
                                <h2 className="create-order__title">Delivery address</h2>
                                <span className="create-order__label">Your street</span>
                                <input onChange={this.handleStreet} className="create-order__input" type="text" required />
                                <span className="create-order__label">Number</span>
                                <input onChange={this.handleNumber} className="create-order__input" type="text" required />
                                <span className="create-order__label">District</span>
                                <input onChange={this.handleDistrict} className="create-order__input" type="text" />
                                <span className="create-order__label">Country</span>
                                <input onChange={this.handleCountry} className="create-order__input" type="text" required />
                                <span className="create-order__label">City</span>
                                <input onChange={this.handleCity} className="create-order__input" type="text" required />
                                <button onClick={this.sendData} className="create-order__button m_button">Сonfirm the order</button>
                            </div>
                        </React.Fragment>
                    )
                }
                {
                    this.state.wasSended && <h1 className="create-order__wasSended">Your order has been sent for processing.</h1>
                }
            </div>
        )
    }
}
