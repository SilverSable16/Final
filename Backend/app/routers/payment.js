// backend/routes/payment.js
const express = require('express');
const Stripe = require('stripe');
const router = express.Router();  //la secret key aca es la mia lol
const stripe = new Stripe('stripe-secret-key'); //el nombre lo dice todo

router.post('/create-checkout-session', async (req, res) => {
    const { total } = req.body; // Recibe el total desde el frontend

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd', // Cambia a la moneda que prefieras
                        product_data: {
                            name: 'Total del Carrito',
                        },
                        unit_amount: total * 100, // Stripe trabaja en centavos
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error("Error creando la sesión de pago:", error);
        res.status(500).json({ error: 'Hubo un error al crear la sesión de pago' });
    }
});

module.exports = router;
