import axios from 'axios';
import Header from '../../components/TheHeader.jsx';
import { useEffect, useState } from 'react';
import url from "../../url"
import ProfileInfo from './ProfileInfo.jsx';
import ChangePass from './ChangePass.jsx';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification.jsx';
const id = localStorage.getItem("id")

export default function ProfilePage() {

    const token = localStorage.getItem("token")
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [active, setActive] = useState("info")
    // const [loading, setLoader] = useState();

    const fetchUserInformation = async () => {
        await axios.get(`${url}/user/get/${id}`, { headers: { Authorization: `Bearer ${token}` }, validateStatus: () => true })
            .then(response => {
                setUser(response.data)
            })
            .catch(err => {
                console.log(err);
                // navigate("/login")
            })
    }

    useEffect(() => {
        fetchUserInformation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        <Header />
        <div className="absolute w-auto min-w-full min-h-full max-w-none">
            <div className="container mx-auto px-6 py-16">
                    <div>
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900">Profile</h3>
                                    <p className="text-sm text-gray-600">
                                        This information will be displayed publicly so be careful what you share.
                                    </p>
                                </div>
                            </div>
                            <div className="md:col-span-2 md:mt-0">
                                <ProfileInfo />
                            </div>
                        </div>

                        <div className="hidden sm:block" aria-hidden="true">
                            <div className="py-5">
                            <div className="border-t border-gray-200" />
                            </div>
                        </div>

                        <div className="mt-10 sm:mt-0">
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                    <div className="px-4 sm:px-0">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900">Change Password</h3>
                                    <p className="mt-1 text-sm text-gray-600">Use in order to change password if needed.</p>
                                    </div>
                                </div>
                                <div className="md:col-span-2 md:mt-0">
                                    <ChangePass />
                                </div>
                            </div>
                        </div>


                        <div className="hidden sm:block" aria-hidden="true">
                            <div className="py-5">
                            <div className="border-t border-gray-200" />
                            </div>
                        </div>

                        <div className="mt-10 sm:mt-0">
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                                <div className="md:col-span-1">
                                    <div className="px-4 sm:px-0">
                                    <h3 className="text-base font-semibold leading-6 text-gray-900">Notifications</h3>
                                    <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
                                    </div>
                                </div>
                                <div className="md:col-span-2 md:mt-0">
                                    <Notification />
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
          </div>
        </>
    )
}



