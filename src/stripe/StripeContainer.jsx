import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import SubscriptionForm from "./SubscriptionForm"

const publicKey = "pk_test_rMPWU9Z6rUNQdAVaNz7vTaPq"

const stripePromise = loadStripe(publicKey)

const StripeContainer = () => {
    return (
        <Elements stripe={stripePromise}>
            <SubscriptionForm />
        </Elements>
    )
}

export default StripeContainer