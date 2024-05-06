const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_KEY);

const storeItems = new Map([
  [1, { priceInPaise: 10000, name: 'Learn React Today' }],
  [2, { priceInPaise: 10000, name: 'Learn CSS Today' }],
])

router.post('/payment', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        // const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: 'inr',
            product_data: {
              name: item.itemName
            },
            unit_amount: item.itemPrice * 100 
          },
          quantity: item.quantity
        }
      }),
      success_url: `http://localhost:3000/success`,
      cancel_url: `http://localhost:3000/cancel`,
    })
    res.status(200).json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
});

module.exports = router;
