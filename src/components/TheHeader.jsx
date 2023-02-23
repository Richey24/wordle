import { Fragment, useState, useEffect, useRef } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, SpeakerWaveIcon, SpeakerXMarkIcon, EnvelopeOpenIcon } from '@heroicons/react/24/outline'
import { useLocation, useNavigate } from "react-router-dom"
import Loading from 'react-fullscreen-loading';


import logo from '../img/white-bible.png';
import mail from "../img/Artwork.svg"

import url from "../url"
import axios from 'axios'
import "./TheHeader.css"
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/fontawesome-free-solid'
import { io } from "socket.io-client";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function THeHeader({ soundClick, soundOn, showAbout, admin }) {

  const socket = useRef();
  const navigate = useNavigate()
  const id = admin ? sessionStorage.getItem("id") : localStorage.getItem("id")
  const token = admin ? sessionStorage.getItem("token") : localStorage.getItem("token")
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(true)

  const [onlineUsers, setOnlineUsers] = useState([]);

  const logOut = () => {
    localStorage.clear()
    navigate(window.location.pathname === "/" ? 0 : "/")
  }

  const getUserData = async () => {
    setLoader(true)
    try {

      const res = await axios.get(`${url}/user/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        validateStatus: () => true
      })
      const response = await res.data
      if (res.status !== 200) {
        setTimeout(() => {
          setLoader(false)
        }, 1000)
        return
      }

      if (token !== response.mainToken) {
        localStorage.clear()
        setTimeout(() => {
          setLoader(false)
        }, 1000)
        return
      }
      setUser(response)
      setTimeout(() => {
        setLoader(false)
      }, 1000)
    } catch (err) {
      setLoader(false)
    }
  }



  useEffect(() => {
    getUserData()
  }, [])


    // Connect to Socket.io
    useEffect(() => {
      socket.current = io(url);
      socket.current.emit("login", user?._id);
    }, [user]);


  return (<>
    <Loading loading={loader} background="#673AB7" loaderColor="#FFBA15" />
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start cursor-pointer"  >
                <div className="flex flex-shrink-0 items-center" onClick={() => navigate(admin ? "/admin" : '/')}>
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src={logo}
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src={logo}
                    alt="Your Company"
                  />
                </div>

              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                <a
                  type="button"
                  href="mailto:?body=Shalom [enter friends name here],%0A%0AI wanted to share these links with you of a new Bible gaming site. It contain Bible trivia, word games, and study tools for your entertainment and learning.%0A%0AClick here to see the promo: https://www.youtube.com/watch?v=uBrwlGHz2_k%0A%0AClick https://www.israelbiblecamp.world to register for FREE"
                  className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <OverlayTrigger placement='bottom' overlay={<Tooltip id='share'>Share</Tooltip>}>
                    <EnvelopeOpenIcon className="h-6 w-6" aria-hidden="true" />
                  </OverlayTrigger>
                </a>

                {user?.username ? (
                  <>
                    {soundOn ?
                      <button
                        onClick={() => soundClick()}
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">Sound Control</span>
                        <SpeakerWaveIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      :
                      <button
                        onClick={() => soundClick()}
                        type="button"
                        className="rounded-full bg-gray-800 p-1 ml-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">Sound Control</span>
                        <SpeakerXMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    }


                    <button
                      type="button"
                      className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      {user?.username && <BellIcon className="h-6 w-6" aria-hidden="true" />}
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open user menu</span>
                          {/* <img
                            className="h-8 w-8 rounded-full"
                            src="/img/profile.png"
                            alt=""
                          /> */}
                          <div className="m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-amber-500 text-xl text-white uppercase">
                            {user?.username[0]}
                          </div>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >

                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            <h2
                              href="#"
                              className="block px-4 mt-2 text-sm text-gray-700"
                            >
                              SHALOM, {user?.username}
                            </h2>
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <p
                                onClick={() => navigate("/user-account")}
                                style={{ cursor: "pointer" }}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm pointer text-gray-700')}
                              >
                                Your Profile
                              </p>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <p
                                onClick={showAbout}
                                style={{ cursor: "pointer" }}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                              >
                                About Us
                              </p>
                            )}
                          </Menu.Item>
                          <hr />
                          <Menu.Item>
                            {({ active }) => (
                              <p
                                onClick={logOut}
                                style={{ cursor: "pointer" }}
                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 text-sm text-gray-700')}
                              >
                                Sign out
                              </p>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                ) : (
                  <>


                    {soundOn ?
                      <button
                        onClick={() => soundClick()}
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">Sound Control</span>
                        <SpeakerWaveIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      :
                      <button
                        onClick={() => soundClick()}
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">Sound Control</span>
                        <SpeakerXMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    }

                    <button onClick={() => navigate(admin ? "/admin/login" : "/login")} type="button" className="rounded-md bg-amber-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-amber-500  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Login
                    </button>

                    <button onClick={() => navigate("/register")} type="button" className="rounded-md ml-1 bg-amber-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                      Register
                    </button>
                  </>
                )
                }
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  </>
  )
}