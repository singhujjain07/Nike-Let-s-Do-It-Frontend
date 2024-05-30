import { headerLogo, footerLogo } from '../assets/images'
import { hamburger } from '../assets/icons'
import { Dialog } from '@headlessui/react'
import { navLinks } from '../constants'
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify'

// for dropdown
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const handleLogout = async() => {
        setAuth({
            ...auth, user: null, token: ''
        })
        localStorage.removeItem('auth');
        toast.success('Logged Out Successfully')
        navigate('/login')
    }

    // Listen for scroll events
    window.addEventListener('scroll', () => {
        // Check if the user has scrolled past a certain threshold
        if (window.scrollY > 100) {
            setScrolled(true); // If scrolled past threshold, set scrolled to true
        } else {
            setScrolled(false); // If not scrolled past threshold, set scrolled to false
        }
    });
    return (
        <header className={`padding-x slow py-4 inset-x-0  absolute z- w-full ${scrolled ? 'bg-[#FF6452] shadow-md' : 'bg-white dark:bg-[#070F2B] dark:text-white'}`}>
            <nav className="flex items-center justify-between  lg:px-8 max-container" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="/">
                        <img src={scrolled ? footerLogo : headerLogo} alt="Logo" width={130} height={29} />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button onClick={() => setMobileMenuOpen(true)} type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                        <span className="sr-only">Open main menu</span>
                        <svg className="h-8 w-8 p-1 dark:bg-coral-red rounded-sm" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                <ul className="hidden lg:flex lg:gap-x-12">
                    {navLinks.map((item) => (
                        <li key={item.label}>
                            <NavLink
                                to={item.href}
                                className={`font-montserrat leading-normal text-lg font-medium hover:border-b-2 ${!scrolled ? "border-[#FF6452]" : "border-white"}`}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {
                    auth.user ? (
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
                            <Menu as="div" className="relative inline-block text-left ">
                                <div>
                                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                        Options
                                        <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                        </svg>

                                        {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
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
                                    <Menu.Items className="absolute  right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Account settings
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Support
                                                    </a>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <NavLink
                                                        to="/cart"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Cart
                                                    </NavLink>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <NavLink
                                                        to="/favorites"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Favorites
                                                    </NavLink>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <NavLink
                                                        to="/my-orders"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        My Orders
                                                    </NavLink>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <NavLink
                                                        to="/admin/create-product"
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        Dashboard
                                                    </NavLink>
                                                )}
                                            </Menu.Item>
                                            <form method="POST" action="#">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={()=>{handleLogout()}}
                                                            type="submit"
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block w-full px-4 py-2 text-left text-sm'
                                                            )}
                                                        >
                                                            Sign out
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </form>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    ) : (
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            <Link to="/login" className={`text-md font-montserrat font-semibold leading-normal text-gray-900 hover:border-b-2 ${!scrolled ? "border-[#FF6452]" : "border-white"}`}>
                                Log in <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    )
                }

            </nav>

            <Dialog as="div" className="lg:hidden relative transition-all duration-500 " open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50  " />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src={headerLogo}
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <ul className="space-y-2 py-6">
                                {navLinks.map((item) => (
                                    <li key={item.label}>
                                        <Link to={item.href}
                                            className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50`}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            {
                                !auth?.user ? (
                                    <div className="py-6">
                                        <Link to="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                            Log in
                                        </Link>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="">
                                            <Link to="/favorites" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                Favorites
                                            </Link>
                                        </div>
                                        <div className="">
                                            <Link to="/cart" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                Cart
                                            </Link>
                                        </div>
                                        <div className="">
                                            <Link to="/my-orders" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                My Orders
                                            </Link>
                                        </div>
                                        <div className="">
                                            <Link to="/admin/create-product" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                Dashboard
                                            </Link>
                                        </div>
                                        <div className="">
                                            <Link onClick={handleLogout} type="submit" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                Log Out
                                            </Link>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>

        </header>
    )
}

export default Navbar