import { Fragment, useState, useEffect, useRef } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, SpeakerWaveIcon, SpeakerXMarkIcon, EnvelopeOpenIcon } from '@heroicons/react/24/outline'
import { useLocation, useNavigate } from "react-router-dom"
import Loading from 'react-fullscreen-loading';
import Moment from 'react-moment';

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
  const [notifications, setNotifications ] = useState([]);

  const fetchUserNotifications = async () => {
     await axios.get(`${url}/api/notifications`, { headers: { Authorization: `Bearer ${token}`} ,validateStatus: () => true })
    .then( res => {
      console.log(res)
      setNotifications(res.data)
      
    })
    .catch( err => {
      console.log(err.response)
    })
  }

  const readNotification = async (notification_id) => {

    let params = {
      notification_id: notification_id
    }
    
    await axios.get(`${url}/api/notifications/read`, params, { headers: { Authorization: `Bearer ${token}`} ,validateStatus: () => true })
    .then( res => {
      console.log(res)
      setNotifications(res.data)
    })
    .catch( err => {
      console.log(err.response)
    })
  }

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

    fetchUserNotifications();
  }

    // useEffect(() => {
    //   fetchUserNotifications();
    // }, [])

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

                           <Menu as="div" className="relative inline-block text-left mt-2">
                            <div>
                              <Menu.Button className="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400" type="button">
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
                                { notifications.length > 0 && 
                                     <div className="relative flex">
                                        <div className="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3 dark:border-gray-900"></div>
                                     </div>  
                                }
                                
                              </Menu.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95">

                              <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">

                                <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                                    Notifications
                                </div>

                                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                  {notifications && notifications.map((data, key) => {
                                      return (
                                        <a href="#" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={readNotification(data._id)}>
                                        <div className="w-full pl-3">
                                            <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">{data.content}</div>
                                            <div className="text-xs text-blue-600 dark:text-blue-500"> <Moment fromNow>{data.created_at}</Moment></div>
                                        </div>
                                      </a>
                                        );
                                      }
                                    )}
                                </div>
                                {/* <a href="#" className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                                  <div className="inline-flex items-center ">
                                    <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path></svg>
                                      View all
                                  </div>
                                </a> */}
                             
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                    
                                     
                          {/* Profile dropdown */}
                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="sr-only">Open user menu</span>
                              
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