import { useState } from "react"
import axios from "axios"
import url from "../../url"

const ChangePass = () => {

    const token = localStorage.getItem("token")
    const id = localStorage.getItem("id")
    const [showErr, setShowErr] = useState(false)
    const [show, setShow] = useState(false)

    const changePassword = async (e) => {
        setShowErr(false)
        setShow(false)
        e.preventDefault()
        const body = {
            oldPass: e.target.oldPass.value,
            newPass: e.target.newPass.value,
            id: id
        }
        console.log(body);
        const res = await axios.post(`${url}/user/change/password`, body, {
            headers: { Authorization: `Bearer ${token}` },
            validateStatus: () => true
        })
        if (res.status === 401) {
            showErr(true)
            return
        }
        const rep = await res.data
        setShow(true)
    }

    return (
        <div className="col-span-3">
            <div className="md:grid md:grid-cols-6">

                <div className="md:col-span-12 md:mt-0">
                    {/* Profile information  */}
                    <form onSubmit={changePassword}>
                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                                {showErr && <p>Incorrect Password</p>}
                                {show && <p>Password changed successfully</p>}
                                <div className="bg-white px-4 py-5 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="oldPass" className="block text-sm font-medium text-gray-700">
                                                Old Password
                                            </label>
                                            <input
                                                type="text"
                                                name="oldPass"
                                                id="oldPass"
                                                autoComplete="given-name"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="newPass" className="block text-sm font-medium text-gray-700">
                                                New Password
                                            </label>
                                            <input
                                                type="text"
                                                name="newPass"
                                                id="newPass"
                                                autoComplete="family-name"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            />
                                        </div>







                                    </div>
                                </div>

                                <div>


                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
            <div>
            </div>

        </div>
    )
}

export default ChangePass