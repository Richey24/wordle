
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import THeHeader from '../../components/TheHeader'
import url from '../../url'

const CancelSub = () => {
    const { id } = useParams()
    const [show, setShow] = useState(false)
    const navigate = useNavigate()

    const cancelSubscription = async () => {
        const res = await axios.post(`http://localhost:5000/cancel/sub/${id}`)
        console.log(res);
        if (res.status === 200) {
            setShow(true)
            setTimeout(() => {
                navigate("/")
            }, 4000)
        }
    }
    return (
        <div>
            <THeHeader />
            <div style={{ display: "flex", height: "90vh", justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <div>
                    {show && <p>Your subscription has been cancelled successfully</p>}
                    <p>Click on the button to cancel your subscription, you will lose access to all our premium features once your current subscription expires</p>
                    <button
                        onClick={cancelSubscription}
                        style={{ marginTop: "10px" }}
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >Cancel subscription</button>
                </div>
            </div>
        </div>
    )
}

export default CancelSub