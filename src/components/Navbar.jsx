import { headerLogo,footerLogo } from '../assets/images'
import { hamburger } from '../assets/icons'
import { navLinks } from '../constants'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

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
        <header className={`padding-x py-4  absolute z- w-full ${scrolled ? 'bg-[#FF6452] shadow-md' : 'bg-white dark:bg-[#070F2B] dark:text-white'}`}>
            <nav className='flex justify-between items-center max-container'>
                <a href="/">
                    <img src={scrolled ? footerLogo :headerLogo} alt="Logo" width={130} height={29} />
                </a>
                <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
                    {navLinks.map((item) => (
                        <li key={item.label}>
                            <Link
                                to={item.href}
                                className={`font-montserrat leading-normal text-lg font-medium hover:border-b-2 ${!scrolled? "border-[#FF6452]" : "border-white"}`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div>
                    <img src={hamburger} alt="Hamburger" width={25} height={25} className='hidden max-lg:block' />
                </div>
            </nav>
        </header>
    )
}

export default Navbar