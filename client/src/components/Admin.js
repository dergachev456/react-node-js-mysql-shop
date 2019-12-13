import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Admin extends Component {
    state = {
        isAdmin: false,
        orders: null
    }
    componentDidMount() {
        let user_data = JSON.parse(localStorage.getItem('user_data'));
        console.log(user_data.isAdmin);

        if (user_data.isAdmin === 1) {
            this.setState({ isAdmin: true });
            fetch(`http://localhost:8080/admin`)
                .then(responce => responce.json())
                .then(data => this.setState({ orders: data }))
        }
    }
    render() {
        return (
            <div className="admin">
                {
                    !this.state.isAdmin && (
                        <h1 className="admin__error">You do not have sufficient privileges to access this page.</h1>
                    )
                }
                {
                    this.state.isAdmin && (
                        <React.Fragment>
                            {
                                this.state.orders && this.state.orders.map(order => {
                                    return (
                                        <div key={order.id} className="admin__order">
                                            <div className="admin__container">
                                            <span>{order.name}</span>
                                            <span>{order.city}</span>
                                            <span>{order.country}</span>
                                            <span>{order.district}</span>
                                            <span>{order.street}</span>
                                            <span>{order.number}</span>
                                            <Link  to={`/product/${(order.product_id)}`}>{order.product_id}</Link>
                                            <span>{order.count}</span>
                                            <span>{order.total_price}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </React.Fragment>
                    )
                }
            </div>
        )
    }
}
