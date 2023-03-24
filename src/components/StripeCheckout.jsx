import React, { useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/basketSlice';
import axios from 'axios';
import { AuthContext } from '../contexts/authContext';

const stripePromise = loadStripe(process.env.stripe_public_key);

export default function StripeCheckout() {
  const items = useSelector(selectItems);
  const { session } = useContext(AuthContext);

  async function createCheckoutSession() {
    const stripe = await stripePromise;
    // Call the backend to create a checkout session...
    const checkoutSession = await axios.post('/api/create-checkout-session', {
      // body
      items,
      email: session.username,
    });
    // After created a session, redirect the user to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message); // @todo : Improve that!
    }
  }

  return (
    <>
      <a href='#' onClick={createCheckoutSession} className='link'>
        Go to payment Gateway
      </a>
      <span className='subscript'>powered by STRIPE</span>
    </>
  );
}
