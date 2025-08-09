import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import React, { useState } from "react";
import { toast } from "react-toastify";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { sessionId } = useParams(); 
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const { isPending, data: session = {} } = useQuery({
    queryKey: ["session", sessionId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sessions/${sessionId}`);
      return res.data;
    },
  });

  if (isPending) return "Loading...";

  const amount = session.registrationFee;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Step 2: Create Payment Intent
    const { data } = await axiosSecure.post("/payments/create-intent", {
      amountInCents,
      sessionId,
    });

    const clientSecret = data.clientSecret;

    // Step 3: Confirm Payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      setError("");

      if (result.paymentIntent.status === "succeeded") {
        const transactionId = result.paymentIntent.id;

        try {
          await axiosSecure.post("/payments/complete", {
            sessionId: session._id,
            sessionTitle: session.sessionTitle,
            email: user.email,
            amount,
            transactionId,
            paymentMethod: result.paymentIntent.payment_method_types,
          });

          Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
          });

          navigate("/dashboard/student/sessions");
        } catch (error) {
          toast.error("Booking failed after payment. Please contact support.", error);
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-20 my-6 rounded-xl shadow-md w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">
        Pay for: {session.sessionTitle}
      </h2>
      <CardElement className="p-2 border rounded my-6" />
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!stripe}
      >
        Pay ${amount}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default PaymentForm;
