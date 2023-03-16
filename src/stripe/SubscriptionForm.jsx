import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import THeHeader from "../components/TheHeader"
import url from "../url"
import "./Sub.css"

const SubscriptionForm = () => {
    const id = localStorage.getItem("id")
    const token = localStorage.getItem("token")
    const [user, setUser] = useState({})
    const [success, setSuccess] = useState(false)
    const [plan, setPlan] = useState("monthly")
    const [query, setQuery] = useSearchParams()
    const navigate = useNavigate()


    const getUser = async () => {
        try {
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
        } catch (error) {
            navigate("/login")
        }
    }

    useEffect(() => {
        if (!id || !token) {
            navigate("/login")
        } else {
            getUser()
        }
        if (query.get("success") !== null || query.get("cancelled") !== null) {
            if (query.get("success") === "true") {
                setSuccess(true)
                toggleModal()
            } else if (query.get("cancelled") === "true") {
                setSuccess(false)
                toggleModal()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const toggleModal = () => {
        document.getElementById("successDiv").classList.toggle("show")
    }

    const changePlan = (e) => {
        const val = e.target.value
        setPlan(val)
    }

    return (
        <div>
            <THeHeader />
            <div className="payDiv">
                <p>A Israel Bible Camp subscription give you unlimited
                    access to the site. Choose from the options below.</p>
                <form action={`${url}/create-checkout-session?email=${user.email}&plan=${plan}&id=${user._id}`} method="POST">
                    <select onChange={changePlan} name="plan" id="plan">
                        <option value="monthly">Monthly $2.99</option>
                        <option value="yearly">Yearly $29.99</option>
                    </select>
                    <button>Pay</button>
                </form>
            </div>

            <div className="successDiv" id="successDiv">
                {
                    success ? (
                        <div>
                            <p>You subscription was successful</p>
                            <p>You now have access to all the premium feature that we offer</p>
                            <button onClick={() => navigate("/")} className="tryButton">Go home</button>
                        </div>
                    ) : (
                        <div>
                            <p>Your payment was unsuccessful</p>
                            <p>Check your card details and try again</p>
                            <button onClick={toggleModal} className="tryButton">Try again</button>
                            <button onClick={() => navigate("/")} className="cancelButton">Cancel</button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SubscriptionForm