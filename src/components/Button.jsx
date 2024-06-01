import { Link } from "react-router-dom"

const Button = ({ label, iconURL, backgroundColor, borderColor, textColor,fullWidth,ani,link }) => {
  return (
    <Link to={link} className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat
      text-lg leading-none
     ${backgroundColor ? `${backgroundColor} ${textColor} ${borderColor}`  : ' bg-coral-red text-white border-coral-red'}  rounded-full ${fullWidth && 'w-full'}   `}>
      {label}
      {iconURL && <div id={ani}><img src={iconURL} alt="arrow right icon" className="ml-2 rounded-full w-5 h-5" /></div>}
    </Link>
  )
}

export default Button