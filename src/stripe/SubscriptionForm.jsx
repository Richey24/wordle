import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import url from "../url"
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
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const getUser = async () => {
        const res = await axios.get(`${url}/user/get/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            validateStatus: () => true
        })
        const rep = await res.data
        if (res.status !== 200) {
            navigate("/login")
        } else {
            setUser(rep)
        }
    }

    useEffect(() => {
        if (!id || !token) {
            navigate("/login")
        } else {
            getUser()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        const plan = e.target.plan.value
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
        if (error) {
            console.log(error);
        } else {
            console.log(paymentMethod);
            const res = await axios.post(`${url}/sub/new`, { paymentMethod: paymentMethod, email: user.email, plan: plan })
            const rep = await res.data
            const { clientSecret, status } = rep
            if (status === "requires_action") {
                stripe.confirmCardPayment(clientSecret).then((result) => {
                    if (result.error) {
                        console.log(result.error);
                    } else {
                        console.log("payment successful");
                    }
                })
            } else {
                console.log("payment successful");
            }
        }
    }

    return (
        <div className="payDiv">
            <form onSubmit={handleSubmit}>
                <select name="plan" id="plan">
                    <option value="monthly">Monthly $2.99</option>
                    <option value="yearly">Yearly $29.99</option>
                </select>
                <CardElement options={CARD_OPTIONS} />
                <button>Pay</button>
            </form>
        </div>
    )
}

export default SubscriptionForm