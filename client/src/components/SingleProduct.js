import React, { Component } from 'react'
export default class SingleProduct extends Component {
    state = {
        product: null,
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch(`http://localhost:8080/product/${id}`)
            .then(responce => responce.json())
            .then(data => this.setState({ product: data }))
    }
    addProduct = () => {
        const newProduct = {
            id: this.state.product[0].id + Math.random(),
            name: `${this.state.product[0].name} ${this.state.product[0].model_name}`,
            price: this.state.product[0].price,
            path: this.state.product[0].path,
            count: 1
        }
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart === null) {
            localStorage.setItem('cart', JSON.stringify([]));
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.push(newProduct);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.props.history.push("/")
    }
    render() {
        return (
            <div className="single">
                {
                    this.state.product && (
                        <React.Fragment>
                            <div className="single__img-container">
                                <img src={`/images/${this.state.product[0].path}`} className="single__img" alt={this.state.product[0].name} />
                            </div>
                            <div className="single__info-container">
                                <h2 className="single__name">{this.state.product[0].name}  {this.state.product[0].model_name}</h2>
                                {
                                    this.state.product[0].availability ? <h2>available</h2> : <h2>not available</h2>
                                }
                                <h2 className="single__price">{this.state.product[0].price} &#8372;</h2>
                                {
                                    this.state.product[0].availability === 0 ? (<button className="m_button single__buy single__cant-buy ">Add to cart</button>) :
                                        (<button onClick={this.addProduct} className="m_button single__buy">Add to cart</button>)
                                }
                            </div>
                        </React.Fragment>
                    )
                }
            </div>
        )
    }
}
