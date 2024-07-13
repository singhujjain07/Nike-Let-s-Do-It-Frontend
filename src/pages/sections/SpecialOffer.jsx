import { useContext } from "react"
import { arrowRight } from "../../assets/icons"
import { offer } from "../../assets/images"
import Button from "../../components/Button"
import { DarkModeContext } from "../../context/dark"


const SpecialOffer = () => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  return (
    <section className="flex flex-wrap items-center max-xl:flex-col-reverse gap-10 max-container">
      <div className="flex-1">
        <img src={offer} alt="" width={773} height={687} className="object-contein w-full" />
      </div>
      <div className='flex flex-1 flex-col'>
        <h2 className={`${darkMode ? 'text-white' : ''} font-palanquin text-4xl capitalize font-bold lg:max-w-lg`}>
          <span className="text-coral-red"> Special </span>
          Offer
        </h2>
        <div className={`${darkMode ? 'text-gray-400' :''}`}>
          <p className="mt-4 lg:max-w-lg info-text">
            Embark on a shopping journey that redifines your experience with unbeatabledeals. From premier selections to incredible
            savings, we offer unparalled value that sets us apart.
          </p>
          <p className='mt-6 lg:max-w-lg info-text'>
            Navigate a realm of possibilities designed to fulfill your unique desires, surpasiing the loftiest expectations. Your journey with us is nothing short of exceptional.
          </p>
        </div>
        <div className='mt-11 flex flex-wrap gap-4'>
          <Button label="Shop Now" iconURL={arrowRight} ani={"ani1"} link={"/products"} />
          {/* <Button label="Learn More" backgroundColor="bg-white" borderColor="border-slate-gray" textColor="text-slate-gray" /> */}
        </div>
      </div>
    </section>
  )
}

export default SpecialOffer