import { facebook, instagram, shieldTick, support, truckFast, twitter } from "../assets/icons";
import { bigShoe1, bigShoe2, bigShoe3, customer1, customer2, shoe4, shoe5, shoe6, shoe7, thumbnailShoe1, thumbnailShoe2, thumbnailShoe3 } from "../assets/images";

export const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about-us", label: "About Us" },
    { href: "/product-page", label: "Products" },
    { href: "#contact-us", label: "Contact Us" },
];

export const shoes = [
    {
        thumbnail: thumbnailShoe1,
        bigShoe: bigShoe1,
        label: "shoe1",
    },
    {
        thumbnail: thumbnailShoe2,
        bigShoe: bigShoe2,
        label: "shoe2",
    },
    {
        thumbnail: thumbnailShoe3,
        bigShoe: bigShoe3,
        label: "shoe3",
    },
];

export const statistics = [
    { value: '1k+', label: 'Brands' },
    { value: '500+', label: 'Shops' },
    { value: '250k+', label: 'Customers' },
];

export const products = [
    {
        imgURL: shoe4,
        name: "Nike Air Jordan-01",
        price: "$200.20",
    },
    {
        imgURL: shoe5,
        name: "Nike Air Jordan-10",
        price: "$210.20",
    },
    {
        imgURL: shoe6,
        name: "Nike Air Jordan-100",
        price: "$220.20",
    },
    {
        imgURL: shoe7,
        name: "Nike Air Jordan-001",
        price: "$230.20",
    },
];

export const services = [
    {
        imgURL: truckFast,
        label: "Free shipping",
        subtext: "Enjoy seamless shopping with our complimentary shipping service."
    },
    {
        imgURL: shieldTick,
        label: "Secure Payment",
        subtext: "Experience worry-free transactions with our secure payment options."
    },
    {
        imgURL: support,
        label: "Love to help you",
        subtext: "Our dedicated team is here to assist you every step of the way."
    },
];

export const reviews = [
    {
        imgURL: customer1,
        customerName: 'Morich Brown',
        rating: 4.5,
        feedback: "The attention to detail and the quality of the product exceeded my expectations. Highly recommended!"
    },
    {
        imgURL: customer2,
        customerName: 'Lota Mongeskar',
        rating: 4.5,
        feedback: "The product not only met but exceeded my expectations. I'll definitely be a returning customer!"
    }
];


export const footerLinks = [
    {
        title: "Products",
        links: [
            { name: "Air Force 1", link: "/" },
            { name: "Air Max 1", link: "/" },
            { name: "Air Jordan 1", link: "/" },
            { name: "Air Force 2", link: "/" },
            { name: "Nike Waffle Racer", link: "/" },
            { name: "Nike Cortez", link: "/" },
        ],
    },
    {
        title: "Help",
        links: [
            { name: "About us", link: "/" },
            { name: "FAQs", link: "/" },
            { name: "How it works", link: "/" },
            { name: "Privacy policy", link: "/" },
            { name: "Payment policy", link: "/" },
        ],
    },
    {
        title: "Get in touch",
        links: [
            { name: "customer@nike.com", link: "mailto:customer@nike.com" },
            { name: "+92554862354", link: "tel:+92554862354" },
        ],
    },
];

export const socialMedia = [
    { src: facebook, alt: "facebook logo" },
    { src: twitter, alt: "twitter logo" },
    { src: instagram, alt: "instagram logo" },
];

export const AirJordan1Img = [
    {src: 'air-jordan-1-mid-red.png',alt:'jordan-red'},
    {src: 'air-jordan-1-mid-blue.jpg',alt:'jordan-blue'},
    {src: 'air-jordan-1-mid-green.jpg',alt:'jordan-green'},
    {src: 'air-jordan-1-mid-grape.jpg',alt:'jordan-grape'},
    {src: 'air-jordan-1-mid-aquastone.jpg',alt:'jordan-aquastone'},
    {src: 'air-jordan-1-mid-sail-white.png',alt:'jordan-sail-white'},
    {src: 'air-jordan-1-mid-sail-desert.jpg',alt:'jordan-sail-desert'},
    {src: 'air-jordan-1-mid-sail-sea-coral.jpg',alt:'jordan-sail-sea-coral'},
    {src: 'air-jordan-1-mid-dusty-peach.jpg',alt:'jordan-dusty-peach'},
    {src: 'air-jordan-1-mid-gym-red.png',alt:'jordan-gym-red'},
]

export const jordanRed =[
    {src: 'jordan-red/jordan-red-1.png',alt:'jordan-red-1'},
    {src: 'jordan-red/jordan-red-2.jpg',alt:'jordan-red-2'},
    {src: 'jordan-red/jordan-red-3.png',alt:'jordan-red-3'},
    {src: 'jordan-red/jordan-red-4.png',alt:'jordan-red-4'},
    {src: 'jordan-red/jordan-red-5.png',alt:'jordan-red-5'},
    {src: 'jordan-red/jordan-red-6.png',alt:'jordan-red-6'},
    {src: 'jordan-red/jordan-red-7.jpg',alt:'jordan-red-7'},
    {src: 'jordan-red/jordan-red-8.jpg',alt:'jordan-red-8'},
]

export const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Inbox", src: "Chat" },
    { title: "Create Product", src: "add-product", gap: true },
    { title: "Update Products ", src: "improve" },
    { title: "Delete Product", src: "delete-product" },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Search", src: "Search" },
    { title: "Setting", src: "Setting" },
];