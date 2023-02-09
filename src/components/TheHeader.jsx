import { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLocation, useNavigate } from "react-router-dom"

import logo from '../img/white-bible.png';

import url from "../url"
import axios from 'axios'
import "./TheHeader.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/fontawesome-free-solid'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function THeHeader({ soundClick, soundOn, showAbout }) {
  const navigate = useNavigate()
  const id = localStorage.getItem("id")
  const token = localStorage.getItem("token")
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(true)
  const soundOnLocation = "img/soundOn.png"
  const soundOffLocation = "img/soundOff.png"

  const { pathname } = useLocation()

  const navigation = [
    { name: 'Home', path: '/', current: pathname === "/" ? true : false },
    // { name: 'Wordle', path: '/select', current: pathname === "/select" ? true : false },
    // { name: 'Crossword', path: '/crossword', current: pathname === "/crossword" ? true : false },
    // { name: 'Hangman', path: '/hangman', current: pathname === "/hangman" ? true : false },
  ]


  const logOut = () => {
    localStorage.clear()
    navigate(0)
  }

  const getUserData = async () => {
    try {
      const res = await axios.get(`${url}/user/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        validateStatus: () => true
      })
      const response = await res.data
      if (res.status !== 200) {
        setLoader(false)
        return
      }

      if (token !== response.mainToken) {
        localStorage.clear()
        setLoader(false)
        return
      }
      setUser(response)
      setLoader(false)
    } catch (err) {
      setLoader(false)
    }
  }

  useEffect(() => {
    getUserData()
  }, [id])

  return (
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
              <div style={{ alignItems: "flex-start", paddingTop: "8px" }} className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div id='theHeadBlock' style={{ marginLeft: "-50px", marginRight: "30px" }} className="flex flex-shrink-0 items-center">
                  {
                    user?.username ? (
                      <>
                        <p style={{ marginRight: "40px", textTransform: "uppercase" }} className='text-gray-300'>shalom {user.username}.</p>
                        {pathname === "/" && <p style={{ cursor: "pointer" }} onClick={() => soundClick()}><img src={soundOn ? soundOnLocation : soundOffLocation} alt="Sound On" width={"30px"} /></p>}
                      </>
                    ) : (
                      <>
                        <p className='text-gray-300' style={{ marginRight: "40px", cursor: "pointer" }} onClick={() => navigate("/register")}>Register</p>
                        <p className='text-gray-300' style={{ marginRight: "40px", cursor: "pointer" }} onClick={() => navigate("/login")}>Login</p>
                        {pathname === "/" && <p style={{ cursor: "pointer" }} onClick={() => soundClick()}><img src={soundOn ? soundOnLocation : soundOffLocation} alt="Sound On" width={"30px"} /></p>}
                      </>
                    )
                  }
                </div>
                <div style={{ marginLeft: "10px" }} className="flex flex-shrink-0 items-center">
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

                <div style={{ marginLeft: "40px" }} className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      pathname !== "/" && <div style={{ cursor: "pointer" }} onClick={() => navigate(item.path)}>
                        <FontAwesomeIcon size="2x" icon={faHome} className="text-white" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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
                    {user?.username && <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="/img/profile.png"
                        alt="User Name"
                      />
                    </Menu.Button>}
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
                        {({ active }) => (
                          <a
                            onClick={() => navigate("/user-account")}
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <p
                            onClick={logOut}
                            style={{ cursor: "pointer", display: user?.username ? "block" : "none" }}
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </p>
                        )}
                      </Menu.Item>
                      {pathname === "/" && <Menu.Item>
                        {({ active }) => (
                          <p
                            onClick={showAbout}
                            style={{ cursor: "pointer" }}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            About Us
                          </p>
                        )}
                      </Menu.Item>}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.path}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div id='theHeadBlockMobile' style={{ marginLeft: "23px" }} className="flex flex-shrink-0 items-center">
              {
                user?.username ? (
                  <>
                    <p style={{ marginRight: "15px", textTransform: "uppercase" }} className='text-gray-300'>shalom {user.username}.</p>
                    {pathname === "/" && <p style={{ cursor: "pointer" }} onClick={() => soundClick()}><img src={soundOn ? soundOnLocation : soundOffLocation} alt="Sound On" width={"30px"} /></p>}
                  </>
                ) : (
                  <>
                    <p className='text-gray-300' style={{ marginRight: "15px", cursor: "pointer" }} onClick={() => navigate("/register")}>Register</p>
                    <p className='text-gray-300' style={{ marginRight: "15px", cursor: "pointer" }} onClick={() => navigate("/login")}>Login</p>
                    {pathname === "/" && <p style={{ cursor: "pointer" }} onClick={() => soundClick()}><img src={soundOn ? soundOnLocation : soundOffLocation} alt="Sound On" width={"30px"} /></p>}
                  </>
                )
              }
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
