// This is your test secret API key.
const stripe = require('stripe')('sk_test_51K1TikGL048Bas4mc4alDUqv9Qsf5oqm9obzWyyVsAXWzEMEByT2RvtQyph4dECMgdfFyVB3vjguI6twwQMDZmOz003MMwM1FZ');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = window.location.origin

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 100,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.redirect(303, session.url);
});

app.listen(3000, () => console.log('Running on port 3000'));
