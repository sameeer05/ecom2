const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')


dotenv.config()
const stripeRoute = require('./routes/stripe')

app.use(express.json())
app.use(cors())

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch(console.error).catch((err) => console.log(err))

app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)
app.use('/api/carts',cartRoute)
app.use('/api/orders', orderRoute)
app.use('/api/checkout', stripeRoute)

app.listen(process.env.PORT || 5000, () => {
    console.log("Server Started on Port 5000")
})