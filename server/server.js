const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
var cors = require('cors');
const app = express();
const randomInt = require('random-int');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var whitelist = ['http://localhost:3000', 'http://localhost:5000'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions));

const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "shop",
    password: ""
});

getRandomId = () => {
    return randomInt(1000000, 10000000);
}

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

function sortCart(arr) {
    var counter = arr.reduce((o, i) => {
        if (!o.hasOwnProperty(Math.trunc(i.id))) {
            o[Math.trunc(i.id)] = 0;
        }
        o[Math.trunc(i.id)]++;
        return o;
    }, {});
    var result = Object.keys(counter).map(function (id) {
        return {
            id: id,
            sum: counter[id]
        };
    });
    return result;
}

app.post('/registration', function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const name = req.body.user.name;
    const surname = req.body.user.surname;
    const email = req.body.user.email.toLowerCase();
    const phone_number = req.body.user.phone_number;
    const password = req.body.user.password;
    let sql = 'INSERT INTO user (name, surname, email, phone_number, password) VALUES (?,?,?,?,?)'
    pool.query(sql, [name, surname, email, phone_number, password], function (err, data) {
        res.sendStatus('200');
    });
});

// create address -> put address id into booking -> put booking and user ids into order
app.post('/create-order', (req, res) => {
    const sorted_cart = sortCart(req.body.cart);
    const sorted_cart_length = sorted_cart.length;
    const user_id = req.body.user_id;
    const total_price = req.body.totalPrice;
    const address = req.body.address;
    const address_id = getRandomId();
    const booking_id = getRandomId();
    const order_id = getRandomId();
    let add_address = 'INSERT INTO address (id, street, number, district, city, country) VALUES (?, ?, ?, ?, ?, ?)'
    pool.query(add_address, [address_id, address.street, address.number, address.district, address.city, address.country], function (err, data) {
        if (err) console.log(err);
    });

    let add_booking = 'INSERT INTO booking (id, total_price, user_id, address_id) VALUES (?, ?, ?, ?)';
    pool.query(add_booking, [booking_id, total_price, user_id, address_id], function (err, data) {
        if (err) {
            console.log('something go wrong with creating booking')
        }
    });
    // 1 type of product = 1 order
    for (let i = 0; i < sorted_cart_length; i++) {
        let add_order = 'INSERT INTO orders (id, count, product_id, booking_id) VALUES (?, ?, ?, ?)';
        console.log('booking id = ' + booking_id);

        pool.query(add_order, [order_id + i, sorted_cart[i].sum, sorted_cart[i].id, booking_id], function (err, data) {
            if (err) {
                console.log(err);
            }
            if (i + 1 === sorted_cart_length) {
                res.sendStatus('200')
            }
        });
    }
})

app.get('/check-auth', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.sendStatus(200)
        }
    })
})

app.post('/promocode', (req, res) => {
    const promocode = req.body.promocode;
    try {
        const sql = 'SELECT discount FROM promocode WHERE value = ?';
        let query = pool.query(sql, [promocode], (err, result) => {
            if (result[0]) {
                res.json({
                    discount: result[0].discount
                })
            } else if (res[0] = []) {
                res.sendStatus(403)
            }
        })
    } catch (error) {
        res.sendStatus(403)
    }
})


app.post('/login', (req, res) => {
    const user = {
        email: req.body.user.email.toLowerCase(),
        password: req.body.user.password
    }
    const sql = 'SELECT email, password, name, surname, id, isAdmin FROM user WHERE email = ? AND password = ?';
    let query = pool.query(sql, [user.email, user.password], (err, result) => {
        try {
            if (result[0].email === user.email && result[0].password === user.password) {
                jwt.sign({
                    user: user
                }, 'secretkey', (err, token) => {
                    res.json({
                        token: token,
                        user: {
                            name: result[0].name,
                            surname: result[0].surname,
                            email: result[0].email,
                            id: result[0].id,
                            isAdmin: result[0].isAdmin
                        }
                    })
                })
            } else {
                res.sendStatus(403);
            }
        } catch (error) {
            res.sendStatus(403);
        }
    })
});

app.get('/product', (req, res) => {
    let sql = 'SELECT * FROM product';
    let query = pool.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

app.get('/product/:id', (req, res) => {
    let sql = 'Select p.id, p.path, p.name, p.price, p.category, p.availability, b.name, m.name as model_name FROM product p, brand b, model m WHERE p.brand_id = b.id AND p.model_id = m.id AND p.id = ?';
    const id = req.params.id;
    let query = pool.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify(result));
    })
})

app.get('/admin', (req, res) => {
    let sql = 'SELECT o.id as order_id, o.count, p.id as product_id, b.total_price, a.street, a.number, a.district, a.city, a.country, u.name, u.phone_number FROM orders o, booking b, product p, address a, user u WHERE o.product_id = p.id AND o.booking_id = b.id AND b.address_id = a.id AND b.user_id = u.id';
    let query = pool.query(sql, (err, result) => {
        if (err) console.log(err);
        res.send(JSON.stringify(result));
    })
})

app.listen(8080, function () {
    console.log("connected");
});