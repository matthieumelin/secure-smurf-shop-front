import React from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

const stripeTestPromise = loadStripe(
  "pk_test_51IgcbAGMYIuF2M55Ue6SrOlXeGWgevwr7JMgob6HSvTbaTGBWa46RJKcx566gIyLvVt7BI684u70WmUG7xFk5FGs00n1sWYqWk"
);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
}
