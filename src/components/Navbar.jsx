import { headerLogo, footerLogo } from '../assets/images'
import { hamburger } from '../assets/icons'
import { Dialog } from '@headlessui/react'
import { navLinks } from '../constants'
import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useAuth } from '../context/auth';
import { toast } from 'react-toastify'
import { DarkModeContext } from '../context/dark';

// for dropdown
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        setAuth({
            ...auth, user: null, token: ''
        })
        localStorage.removeItem('auth');
        toast.success('Logged Out Successfully')
        navigate('/login')
    }
    const toggleMode = ()=>{
        if(!darkMode){
            toast.info('The Dark Mode is in Beta Stage', {
                // className: 'bg-[#333] text-[#fff] mt-12',
                // bodyClassName: 'text-[#ddd]',
                // progressClassName: 'bg-[#bbb]',
                className:'mt-12'
            })
        }
        setDarkMode(!darkMode);
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
    const [darkMode, setDarkMode] = useContext(DarkModeContext);
    return (
        <header className={`padding-x slow shadow-xl py-4 inset-x-0  absolute z- w-full ${scrolled ? 'bg-[#FF6452] shadow-md' : 'bg-white dark:bg-[#070F2B] dark:text-white'}`}>
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
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-4">
                            <button onClick={() => toggleMode()} type="button" className={`border-2 ${scrolled ? 'text-gray-300 hover:bg-gray-100 hover:text-gray-600' : 'border-coral-red text-gray-600 hover:bg-gray-100'}  focus:outline-none focus:ring-1 focus:ring-gray-200 rounded-lg text-sm p-2.5`}>
                                <svg className={`${darkMode ? 'hidden' : 'block'} w-5 h-5 flex pt-[2.5px] pl-[1px]`} xmlns="http://www.w3.org/2000/svg">
                                    <path className={`${scrolled ? 'fill-slate-300' : 'fill-slate-400'}`} d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z" />
                                    <path className={`${scrolled ? 'fill-slate-300' : 'fill-slate-600'}`} d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z" />
                                </svg>
                                <svg id="theme-toggle-light-icon" className={`${darkMode ? 'block' : 'hidden'} w-5 h-5`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4
                                11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                            </button>
                            <Menu as="div" className="relative inline-block text-left ">
                                <div>
                                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 border-2 border-coral-red shadow-xl  hover:bg-gray-50">
                                        Options
                                        <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                        </svg>

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
                                                        Admin
                                                    </NavLink>
                                                )}
                                            </Menu.Item>
                                            <form method="POST" action="#">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={() => { handleLogout() }}
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
                        <div className='lg:hidden flex'>
                            <button onClick={() => toggleMode()} type="button" className={`border-2 ${scrolled ? 'text-gray-300 hover:bg-gray-100 hover:text-gray-600' : 'border-coral-red text-gray-600 hover:bg-gray-100'}  focus:outline-none focus:ring-1 focus:ring-gray-200 rounded-lg text-sm p-2.5`}>
                                <svg className={`${darkMode ? 'hidden' : 'block'} w-5 h-5 flex pt-[2.5px] pl-[1px]`} xmlns="http://www.w3.org/2000/svg">
                                    <path className={`${scrolled ? 'fill-slate-300' : 'fill-slate-400'}`} d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z" />
                                    <path className={`${scrolled ? 'fill-slate-300' : 'fill-slate-600'}`} d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z" />
                                </svg>
                                <svg id="theme-toggle-light-icon" className={`${darkMode ? 'block' : 'hidden'} w-5 h-5`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4
                                11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
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
                                                Admin
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