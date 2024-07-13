import { useContext, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Field, Label, Switch } from '@headlessui/react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { DarkModeContext } from '../context/dark'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ContactUsPage = () => {
    const [agreed, setAgreed] = useState(false)
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [country, setCountry] = useState('IN');
    const [company, setCompany] = useState('');
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useContext(DarkModeContext);

    const handleContact = async (e) => {
        e.preventDefault();
        const { data } = await axios.post(`${import.meta.env.VITE_SERVER_ADDRESS}/api/v1/auth/contact`, { firstname, lastname, company: company || 'NA', email, country, phone, message });
        console.log(data);
        if (data.success === true) {
            navigate('/home')
        }
    }

    return (
        <div>
            <div className="fixed top-0 w-full z-20 ">
                <Navbar />
            </div>
            <div className={`isolate ${darkMode ? 'bgDark' : 'bg-white'} px-6 py-24 sm:py-32 lg:px-8`}>
                <div
                    className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className={`${darkMode ? 'text-coral-red ' : 'text-gray-900 '} text-3xl font-bold tracking-tight  sm:text-4xl`}>
                        Contact sales
                    </h2>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600 '}  mt-2 text-lg leading-8 `}>
                        We’re here to assist you with any questions about our products, pricing, or custom solutions.
                    </p>
                </div>
                <form onSubmit={handleContact} className="mx-auto mt-16 max-w-xl sm:mt-20">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="first-name" className={`${darkMode ? 'text-gray-100 ' : ' text-gray-900 '} block text-sm font-semibold leading-6 `}>
                                First name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    required
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    autoComplete="given-name"
                                    className={`${darkMode && 'bg-gray-400'} block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6`}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="last-name" className={`block text-sm font-semibold leading-6 ${darkMode ? 'text-gray-100 ' : ' text-gray-900 '} `}>
                                Last name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    required
                                    type="text"
                                    name="last-name"
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    id="last-name"
                                    autoComplete="family-name"
                                    className={`${darkMode && 'bg-gray-400'} block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6`}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="company" className={`${darkMode ? 'text-gray-100 ' : ' text-gray-900 '}  block text-sm font-semibold leading-6 `}>
                                Company <span className={`${darkMode ? 'text-gray-400 ' : ' text-gray-500 '} `}>(optional)</span>
                            </label>
                            <div className="mt-2.5">
                                <input
                                    type="text"
                                    name="company"
                                    id="company"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    autoComplete="organization"
                                    className={`${darkMode && 'bg-gray-400'} block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6`}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className={`${darkMode ? 'text-gray-100 ' : ' text-gray-900 '}  block text-sm font-semibold leading-6 `}>
                                Email
                            </label>
                            <div className="mt-2.5">
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    className={`${darkMode && 'bg-gray-400'} block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6`}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="phone-number" className={`${darkMode ? 'text-gray-100 ' : ' text-gray-900 '}  block text-sm font-semibold leading-6 text-gray-900`}>
                                Phone number
                            </label>
                            <div className="relative mt-2.5">
                                <div className="absolute inset-y-0 left-0 flex items-center">
                                    <label htmlFor="country" className="sr-only">
                                        Country
                                    </label>
                                    <select
                                        id="country"
                                        name="country"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className={`${darkMode ? 'text-gray-900 ' : 'text-gray-400 '}  h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm`}
                                    >
                                        <option value='IN'>IN</option>
                                        <option value='US'>US</option>
                                        <option value='CA'>CA</option>
                                    </select>
                                    <ChevronDownIcon
                                        className={`${darkMode ? 'text-gray-900 ' : 'text-gray-400 '} pointer-events-none absolute right-3 top-0 h-full w-5 `}
                                        aria-hidden="true"
                                    />
                                </div>
                                <input
                                    required
                                    type="tel"
                                    name="phone-number"
                                    id="phone-number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    autoComplete="tel"
                                    className={`${darkMode && 'bg-gray-400'}  block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6`}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className={`${darkMode ? 'text-gray-100 ' : ' text-gray-900 '}  block text-sm font-semibold leading-6 `}>
                                Message
                            </label>
                            <div className="mt-2.5">
                                <textarea
                                    required
                                    name="message"
                                    id="message"
                                    rows={4}
                                    className={`${darkMode && 'bg-gray-400'} block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-coral-red sm:text-sm sm:leading-6`}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                        </div>
                        <Field as="div" className="flex gap-x-4 sm:col-span-2">
                            <div className="flex h-6 items-center">
                                <Switch
                                    checked={agreed}
                                    onChange={setAgreed}
                                    className={classNames(
                                        agreed ? `bg-coral-red`: 'bg-gray-200',
                                        'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-red'
                                    )}
                                >
                                    <span className="sr-only">Agree to policies</span>
                                    <span
                                        aria-hidden="true"
                                        className={classNames(
                                            agreed ? 'translate-x-3.5' : 'translate-x-0',
                                            'h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out'
                                        )}
                                    />
                                </Switch>
                            </div>
                            <Label className={`${darkMode ? 'text-gray-400 ' : 'text-gray-600 '} text-sm leading-6 `}>
                                By selecting this, you agree to our{' '}
                                <a href="#" className={`text-coral-red font-semibold `}>
                                    privacy&nbsp;policy
                                </a>
                                .
                            </Label>
                        </Field>
                    </div>
                    <div className="mt-10">
                        <button type="submit" disabled={!agreed}
                            className={`${!agreed ? 'bg-gray-400 cursor-not-allowed' : `${darkMode ? 'bg-coral-red hover:opacity-90' : 'bg-coral-red hover:opacity-90'}`} block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-red`}
                        >
                            Let's talk
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ContactUsPage