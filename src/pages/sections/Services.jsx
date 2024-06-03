// import ServiceCard from "../../components/ServiceCard"
import { useContext } from "react";
import { services } from "../../constants"
import { DarkModeContext } from "../../context/dark"

const Services = () => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  return (
    <section className="max-container flex justify-center flex-wrap gap-9">
      {services.map((service,index) => (
        // <ServiceCard key={service.label} {...service} />
        <div key={index} className={`flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-3xl ${darkMode ? 'shadow-coral-red shadow-md' : ''}  px-10 py-16`}>
          <div className='w-11 h-11 flex justify-center items-center bg-coral-red rounded-full'>
            <img src={service.imgURL} alt={service.label} width={24} height={24} />
          </div>
          <h3 className={`${darkMode ? 'text-white' : ' '} mt-5 font-palanquin text-3xl leading-normal font-bold`}>{service.label}</h3>
          <p className={`${darkMode ? 'text-white' : ''} mt-3 break-words font-montserrat text-lg leading-normal`}>{service.subtext}</p>
        </div>
      ))}
    </section>
  )
}

export default Services