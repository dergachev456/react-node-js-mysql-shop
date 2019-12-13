import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Product extends Component {
    render() {
        return (
            <div className="card">
                <img src={`/images/${this.props.path}`} className="card__img" alt={this.props.name} />
                <div className="card__body">
                    <h5 className="card__title">{this.props.name}</h5>
                    <p className="card__price">{this.props.price} &#8372;</p>
                    <Link to={`/product/${this.props.id}`} className="button">More information</Link>
                </div>
            </div>
        )
    }
}
