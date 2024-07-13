import React, { useEffect, useState, Fragment, useContext } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom'
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
    TransitionChild,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, ChevronRightIcon, ChevronLeftIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon, } from '@heroicons/react/20/solid'
import { DarkModeContext } from '../context/dark';
import { FilterContext } from '../context/filter';

const sortOptions = [
    { name: 'Cancel Sort', value: 0 },
    { name: '3D Model', value: 1 },
    { name: 'Non 3D Model', value: 2 },
    { name: 'Price: Low to High', value: 3 },
    { name: 'Price: High to Low', value: 4 },
]
const subCategories = [
    { name: 'Men', value: 'male' },
    { name: 'Women', value: 'female' },
]
const filters = [
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White' },
            { value: 'black', label: 'Black' },
            { value: 'red', label: 'Red' },
            { value: 'pink', label: 'Pink' },
            { value: 'aquatone', label: 'Aquatone' },
            { value: 'blue', label: 'Blue' },
            { value: 'brown', label: 'Brown' },
            { value: 'green', label: 'Green' },
            { value: 'purple', label: 'Purple' },
        ],
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const navigate = useNavigate()
    const itemsPerPage = 12;
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [products, setProducts] = useState([]);
    // const [colors, setColors] = useState([]);
    // const [genders, setGenders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [data, setData] = useState([]);
    const [pages, setPages] = useState([]);
    const [gridView, setGridView] = useState(0);
    // const [sortBy, setSortBy] = useState(0);
    const [darkMode, setDarkMode] = useContext(DarkModeContext);
    const [filter, setFilter] = useContext(FilterContext);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_SERVER_ADDRESS}/api/v1/products/products`, {
                params: {
                    // colors: colors.join(','),
                    // gender: genders.join(','),
                    // sortBy: sortBy
                    colors: filter.colors.join(','),
                    gender: filter.genders.join(','),
                    sortBy: filter.sortBy
                }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    const handleColorChange = (color) => {
        const updatedColors = filter.colors.includes(color)
            ? filter.colors.filter((c) => c !== color)
            : [...filter.colors, color];
        setFilter((prevFilter) => {
            const updatedFilter = { ...prevFilter, colors: updatedColors }
            localStorage.setItem('filter', JSON.stringify(updatedFilter));
            return updatedFilter;
        });
    };
    const handleGenderChange = (gender) => {
        const updatedGenders = filter.genders.includes(gender)
            ? filter.genders.filter((g) => g !== gender)
            : [...filter.genders, gender];
        setFilter((prevFilter) => {
            const updatedFilter = { ...prevFilter, genders: updatedGenders }
            localStorage.setItem('filter', JSON.stringify(updatedFilter));
            return updatedFilter;
        });
    };
    const handleSortBy = (sortBy) => {
        setFilter((prevFilter) => {
            const updatedFilter = { ...prevFilter, sortBy: sortBy }
            localStorage.setItem('filter', JSON.stringify(updatedFilter));
            return updatedFilter;
        });
    };
    const resetFilter = () => {
        setFilter((prevFilter) => {
            const updatedFilter = { ...prevFilter, colors: [], genders: [] }
            localStorage.setItem('filter', JSON.stringify(updatedFilter));
            return updatedFilter;
        });
    }
    useEffect(() => {
        fetchProducts();
    }, [filter])
    useEffect(() => {
        let sz = Math.ceil(products.length / itemsPerPage);
        setTotalPages(sz);
        setData(products.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        ))
        const x = [];
        for (let i = 1; i <= sz; i++) {
            x.push(i);
        }
        setPages(x);
        setCurrentPage(1);
    }, [products])
    useEffect(() => {
        setData(products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
    }, [currentPage])
    return (
        <div className={`${darkMode ? 'bgDark' : ''} isolate`}>
            <div className="fixed top-0 w-full z-20 ">
                <Navbar />
            </div>
            <div>
                {
                    darkMode && (
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
                    )
                }
                {/* Mobile filter dialog */}
                <Transition show={mobileFiltersOpen}>
                    <Dialog className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                        <TransitionChild
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </TransitionChild>

                        <div className="fixed inset-0 z-40 flex">
                            <TransitionChild
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <DialogPanel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                                    <div className="flex items-center justify-between px-4">
                                        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                        <button
                                            type="button"
                                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                            onClick={() => setMobileFiltersOpen(false)}
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <div className="mt-4 border-t border-gray-200">
                                        <h3 className="sr-only">Categories</h3>
                                        <button
                                            onClick={() => resetFilter()}
                                            className={`mx-2 px-2 mt-4 rounded-full text-md font-semibold  text-center align-middle  text-coral-red border-coral-red border-2  hover:border-opacity-70 ${darkMode ? ' shadow-coral-red shadow-md' : 'shadow-xl hover:shadow-md'}`} >
                                            <span className="px-2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                                Reset Filter
                                            </span>
                                        </button>
                                        <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                                            {subCategories.map((category) => (
                                                <li key={category.name} className='flex'>
                                                    <input type="checkbox" value={category.value} checked={filter.genders.includes(category.value)} onChange={() => handleGenderChange(category.value)} className='flex my-auto ml-2 rounded-full' />
                                                    <a href={category.href} className="block px-2 py-3">
                                                        {category.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>

                                        {filters.map((section) => (
                                            <Disclosure defaultOpen as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                                                {({ open }) => (
                                                    <>
                                                        <h3 className="-mx-2 -my-3 flow-root">
                                                            <DisclosureButton className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">

                                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                                <span className="ml-6 flex items-center">
                                                                    {open ? (
                                                                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                                    ) : (
                                                                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                                    )}
                                                                </span>
                                                            </DisclosureButton>
                                                        </h3>
                                                        <Transition
                                                            enter="duration-200 ease-out"
                                                            enterFrom="opacity-0 -translate-y-6"
                                                            enterTo="opacity-100 translate-y-0"
                                                            leave="duration-300 ease-out"
                                                            leaveFrom="opacity-100 translate-y-0"
                                                            leaveTo="opacity-0 -translate-y-6"
                                                        >
                                                            <DisclosurePanel className="pt-6 origin-top transition">
                                                                <div className="space-y-6 ">
                                                                    {section.options.map((option, optionIdx) => (
                                                                        <div key={option.value} className="flex items-center ">
                                                                            <input
                                                                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                name={`${section.id}[]`}
                                                                                type="checkbox"
                                                                                value={option.value}
                                                                                checked={filter.colors.includes(option.value)}
                                                                                onChange={() => handleColorChange(option.value)}
                                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                                            />
                                                                            <label
                                                                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                                                className="ml-3 min-w-0 flex-1 text-gray-500"
                                                                            >
                                                                                {option.label}
                                                                            </label>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </DisclosurePanel>
                                                        </Transition>

                                                    </>
                                                )}
                                            </Disclosure>
                                        ))}
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </Dialog>
                </Transition>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className={`${darkMode ? 'text-gray-400' : 'text-gray-400'} lg:text-4xl text-3xl font-bold tracking-tight `}>
                            Just Do It!
                        </h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton className={` ${darkMode ? 'text-gray-400' : 'text-gray-700 hover:text-gray-900'} group inline-flex justify-center text-sm font-medium`}>
                                        Sort
                                        <ChevronDownIcon
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </MenuButton>
                                </div>

                                <Transition
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            {sortOptions.map((option) => (
                                                <MenuItem key={option.name}>
                                                    {({ focus }) => (
                                                        <a
                                                            onClick={() => handleSortBy(option.value)}
                                                            className={classNames(
                                                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                                focus ? 'bg-gray-100' : '',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            {option.name}
                                                        </a>
                                                    )}
                                                </MenuItem>
                                            ))}
                                        </div>
                                    </MenuItems>
                                </Transition>
                            </Menu>

                            <button type="button" onClick={() => setGridView(!gridView)} className="max-lg:hidden -m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon className={`h-5 w-5 ${gridView && 'text-coral-red'}`} aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                onClick={() => setMobileFiltersOpen(true)}
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>

                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                            {/* Filters */}
                            <div className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul role="list" className={`space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900`}>
                                    {subCategories.map((category) => (
                                        <li key={category.name} className='flex'>
                                            <input type="checkbox" value={category.value} checked={filter.genders.includes(category.value)} onChange={() => handleGenderChange(category.value)}
                                                className={`${darkMode ? 'bg-coral-red border-coral-red' : ''} text-coral-red focus:ring-coral-red flex mt-[3.5px] mr-2 rounded-full`} />

                                            <a href={category.href} className={`${darkMode ? 'text-white' : ''}`}>{category.name}</a>
                                        </li>
                                    ))}
                                </ul>

                                {filters.map((section) => (
                                    <Disclosure as="div" key={section.id} className=" border-b border-gray-200 py-6">
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <DisclosureButton className={` flex w-full items-center justify-between  py-3 text-sm text-gray-400 hover:text-gray-500`}>
                                                        <span className={`${darkMode ? 'text-white' : 'text-gray-900'} font-medium `}>
                                                            {section.name}
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                            ) : (
                                                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                            )}
                                                        </span>
                                                    </DisclosureButton>
                                                </h3>
                                                <Transition
                                                    as="div"
                                                    enter="transition-all duration-500 ease-in-out"
                                                    enterFrom="max-h-0 opacity-0"
                                                    enterTo="max-h-screen opacity-100"
                                                    leave="transition-all duration-500 ease-in-out"
                                                    leaveFrom="max-h-screen opacity-100"
                                                    leaveTo="max-h-0 opacity-0"
                                                >
                                                    <DisclosurePanel className="pt-6 ">
                                                        <div className="space-y-4">
                                                            {section.options.map((option, optionIdx) => (
                                                                <div key={option.value} className="flex  items-center">
                                                                    <input
                                                                        id={`filter-${section.id}-${optionIdx}`}
                                                                        name={`${section.id}[]`}
                                                                        // defaultValue={option.value}
                                                                        type="checkbox"
                                                                        value={option.value}
                                                                        checked={filter.colors.includes(option.value)}
                                                                        onChange={() => handleColorChange(option.value)}
                                                                        // defaultChecked={option.checked}
                                                                        className="h-4 w-4 rounded border-gray-300 text-coral-red focus:ring-coral-red"
                                                                    />
                                                                    <label
                                                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                                                        className={`${darkMode ? 'text-white ' : 'text-gray-600'} ml-3 text-sm `}
                                                                    >
                                                                        {option.label}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </DisclosurePanel>
                                                </Transition>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                                <button
                                    onClick={() => resetFilter()}
                                    className={`mt-4 rounded-full text-md font-semibold  text-center align-middle  text-coral-red border-coral-red border-2  hover:border-opacity-70 ${darkMode ? ' shadow-coral-red shadow-md' : 'shadow-xl hover:shadow-md'}`} >
                                    <span className="px-2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                        Reset Filter
                                    </span>
                                </button>
                            </div>

                            {/* Product grid */}
                            <div className="lg:col-span-4">
                                {/* Your content */}
                                <div className={` mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 ${gridView ? 'lg:grid-cols-2' : 'lg:grid-cols-3'} xl:gap-x-8`}>
                                    {data?.map((product, index) => (
                                        <div onClick={() => navigate(`/product-page/${product.slug}`)} key={index} className={`group relative `}>
                                            {product?.threeD ? (
                                                <div className='absolute max-lg:hidden font-montserrat bg-white m-2 px-4 rounded-full border-2 border-coral-red right-0'>
                                                    3D
                                                </div>
                                            ) : ("")}
                                            <div className={`${darkMode ? 'shadow-coral-red shadow-2xl ' : ''}  aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80`}>
                                                <img src={product.image}
                                                    alt={product.model}
                                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                />
                                            </div>
                                            <div className="mt-4 flex justify-between">
                                                <div>
                                                    <h3 className={`${darkMode ? 'text-white' : 'text-gray-700'} text-sm`}>
                                                        <a >
                                                            <span aria-hidden="true" className="absolute inset-0" />
                                                            {product.model}
                                                        </a>
                                                    </h3>
                                                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1 text-sm `}>
                                                        {product?.gender === "male" ? "Men's Shoes" : product?.gender === "female" ? "Women's Shoes" : "Unisex Shoes"}
                                                    </p>
                                                </div>
                                                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-900'}  text-sm font-medium`}>
                                                    ₹ {product.price}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='flex justify-end sm:mt-12 mt-8'>
                                    <div className="flex gap-4">
                                        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}
                                            className={`${darkMode ? 'text-coral-red hover:bg-[#293b55]' : 'text-gray-900 hover:bg-gray-900/10'}  flex items-center gap-2 px-3 font-sans text-xs font-bold text-center  uppercase align-middle transition-all rounded-lg select-none  active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                                            type="button">
                                            <ChevronLeftIcon className={`${darkMode ? 'text-white h-8 w-8' : 'h-5 w-5'}  `} />
                                        </button>
                                        <div className="flex items-center gap-2">
                                            {pages?.map((page) => (
                                                <button
                                                    key={page}
                                                    onClick={() => handlePageChange(page)}
                                                    className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-md font-semibold  text-center align-middle 
                                                    ${currentPage === page ? `text-coral-red border-coral-red border-2  hover:border-opacity-70  ${darkMode ? ' shadow-coral-red shadow-md' : 'shadow-xl hover:shadow-md'}`
                                                            : `${darkMode ? 'text-coral-red border-dashed border border-coral-red' : 'text-black'} hover:border-opacity-70 hover:shadow-md hover:border hover:border-coral-red`}`}
                                                >
                                                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">

                                                        {page}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                        <button onClick={() => handlePageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className={`${darkMode ? 'text-coral-red hover:bg-[#293b55]' : 'text-gray-900 hover:bg-gray-900/10'}  flex items-center gap-2 px-3  font-sans text-xs font-bold text-center uppercase align-middle transition-all rounded-lg select-none active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
                                            type="button">
                                            <ChevronRightIcon className={`${darkMode ? 'text-white h-8 w-8' : 'h-5 w-5'}  `} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}
