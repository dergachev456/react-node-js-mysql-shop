import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import trashIcon from '../icons/trash.png'
export default class Cart extends Component {
    state = {
        products: null,
        cart: null,
        totalPrice: null
    }
    componentDidMount() {
        let cart;
        try {
            cart = JSON.parse(localStorage.getItem('cart'));
        } catch (error) {
            localStorage.setItem('cart', JSON.stringify([]));  
        }
        this.setState({ cart: cart });
        let total = 0;
        try {
            cart.forEach(product => {
                total += product.price;
            });
        } catch (error) { }
        this.setState({ totalPrice: total });
        localStorage.setItem('totalPrice', total);
    }
    removeProduct = id => {
        const filterdCart = this.state.cart.filter(product => product.id !== id);
        this.setState({ cart: filterdCart });
        let total = 0;
        try {
            filterdCart.forEach(product => {
                total += product.price;
            });
        } catch (error) { }
        localStorage.setItem('cart', JSON.stringify(filterdCart));
        this.setState({ totalPrice: total });
        localStorage.setItem('totalPrice', total)
    }
    render() {
        return (
            <div className="cart">
                {
                    this.state.cart && (
                        this.state.cart.map(product => {
                            return (
                                <div key={product.id} className="cart__product">
                                    <img src={`/images/${product.path}`} className="cart__img" alt={product.name} />
                                    <Link className="cart__product-name" to={`/product/${Math.trunc(product.id)}`}>{product.name}</Link>
                                    <span className="cart__product-price">{product.price} &#8372;</span>
                                    <img onClick={() => { this.removeProduct(product.id) }} src={trashIcon} className="cart__trash" alt="trash" />
                                </div>
                            )
                        })
                    )
                }
                {
                    (this.state.totalPrice === 0) ? (<h2 className="cart__total">Your cart is empty</h2>) :
                        (
                            <React.Fragment>
                                <h2 className="cart__total">Total: {this.state.totalPrice} &#8372;</h2>
                                <Link className="cart__total_checkout" to="/create-order">Checkout &#8594;</Link>
                            </React.Fragment>
                        )
                }
            </div>
        )
    }
}
