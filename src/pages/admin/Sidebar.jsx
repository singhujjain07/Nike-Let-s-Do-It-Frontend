import React, { useState } from 'react'
import { Menus } from "../../constants";
import { Link } from 'react-router-dom'

const Sidebar = ({ selectedMenu }) => {
    const [open, setOpen] = useState(true);
    return (
        <div className={`${open ? "w-72" : "w-20 "} bg-dark-purple h-screen p-5  pt-8 relative transition-all duration-300`}>
            <img src="/icons/control.png" className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && ' rotate-180'}`} onClick={() => setOpen(!open)} />
            <div className="flex gap-x-4 items-center">
                <Link to="/home">
                    <img src='/logo/nike-logo1.svg' className={`${!open && 'h-9 '} h-16 cursor-pointer transition duration-500 ${!open && "rotate-[360deg]"}`} />
                </Link>
                <h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && "hidden"}`}>
                    Let's Do It
                </h1>
            </div>
            <ul className="pt-6">
                {Menus.map((Menu, index) => (
                    <li key={index} className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"} ${index === selectedMenu && "bg-light-white"} `}>
                        <img src={`/icons/${Menu.src}.png`} className="w-7" />
                        <span className={`${!open && "hidden"} origin-left duration-200`}>
                            {Menu.title}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar