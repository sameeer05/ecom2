const Cart = require('../models/Cart')
const router = require('express').Router()
const { verifyToken, verifyTokenAndAuthoization, verifyTokenAndAdmin } = require('./verifyToken')
const CryptoJS = require('crypto-js');

// CREATE 

router.post('/', verifyToken, async (req, res) => {
    const newCart = new Cart(req.body)

    try {
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    } catch(err) {
        res.status(200).json(err)
    }
})


//UPDATE
router.put('/:id', verifyTokenAndAuthoization, async (req, res) => {

    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },
        { new: true }
        )
        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE

router.delete('/:id', verifyTokenAndAuthoization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Cart has been deleted")
    } catch(err) {
        res.status(500).json(err)
    }
})

// GET USER CART

router.get('/find/userId', verifyTokenAndAdmin, async (req, res) => {
    try {
        const cart = await Cart.find({ userId: req.params.userId })
        res.status(200).json(cart)
    } catch(err) {
        res.status(500).json(err)
    }
})

// GET ALL

router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch(err) {
        res.staus(200).json(err)
    }
})

module.exports = router