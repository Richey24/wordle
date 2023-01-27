import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import "./Sub.css"

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#3d1152",
            color: "#3d1152",
            fontWeight: 700,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#3d1152" },
            "::placeholder": { color: "#3d1152" }
        },
        invalid: {
            iconColor: "#3d1152",
            color: "#3d1152"
        }
    }
}

const SubscriptionForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
        if (error) {
            console.log(error);
        } else {
            console.log(paymentMethod);
        }
    }

    return (
        <div className="payDiv">
            <form onClick={handleSubmit}>
                <CardElement options={CARD_OPTIONS} />
                <button>Pay</button>
            </form>
        </div>
    )
}

export default SubscriptionForm