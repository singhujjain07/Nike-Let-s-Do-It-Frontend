import { useContext, useState } from "react"
import { arrowRight } from "../../assets/icons"
import Button from "../../components/Button"
import { shoes, statistics } from "../../constants"
import { bigShoe1 } from "../../assets/images"
import ShoeCard from "../../components/ShoeCard"
import ShoeSection from "./ShoeSection"
import { DarkModeContext } from "../../context/dark"

const Hero = () => {
  const [bigShoeImg, setBigShoeImg] = useState("AirJordan1")
  const [darkMode,setDarkMode] = useContext(DarkModeContext);

  return (
    <section id="home" className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container">
      <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-28">
        <p className="text-xl font-montserrat text-coral-red">
          Our Summer Collection
        </p>
        <h1 className={` ${darkMode ? 'text-white':''} mt-10 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold`}>
          <span className={` ${darkMode ? 'xl:bg-[#121212]':'xl:bg-white'} xl:whitespace-nowrap relative z-10 pr-10 `}>
            The New Arrival
          </span>
          <br />
          <span className="text-coral-red inline-block mt-3">Nike</span>
          Shoes
        </h1>
        <p className={`font-montserrat ${darkMode ? 'text-gray-400' :' text-slate-gray '} text-lg leading-8 mt-6 mb-14 sm:max-w-sm`}>
          Discover stylish Nike arrivals, quality comfort, and innovation for your active life.</p>
        <Button label="Shop Now" iconURL={arrowRight} ani={"ani1"}/>
        <div className="flex justify-start items-start flex-wrap w-full mt-20 gap-16">
          {statistics.map((stat) => (
            <div key={stat.label}>
              <p className={`${darkMode ? 'text-white': ''} text-4xl font-palanquin font-bold `}>
                {stat.value}
              </p>
              <p className={`leading-7 font-montserrat ${darkMode ? 'text-gray-400' :' text-slate-gray '}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex-1 flex justify-center items-center xl:min-h-screen pb-40 sm:py-40 bg-primary bg-hero bg-cover bg-center rounded-b-3xl">
        {/* <img src={bigShoeImg} alt="shoe collection" width={610} height={500} className="object-contain relative z-10" /> */}
        <div className="sm:w-[600px] sm:h-[500px] w-screen h-[300px]">
          <ShoeSection key={bigShoeImg} ele={bigShoeImg} />
        </div>
        <div 
          className="flex sm:gap-6 gap-4 absolute -bottom-[5%] sm:left-[10%] max-sm:px-6"
        >
          <ShoeCard imgURL={"AirJordan1"} bigShoeImg={bigShoeImg} changeBigShoeImage={(shoe) => setBigShoeImg(shoe)}/>
          <ShoeCard imgURL={"Shoe2"} bigShoeImg={bigShoeImg} changeBigShoeImage={(shoe) => setBigShoeImg(shoe)}/>
          <ShoeCard imgURL={"Shoe10"} bigShoeImg={bigShoeImg} changeBigShoeImage={(shoe) => setBigShoeImg(shoe)}/>
        </div>
      </div>
    </section>
  )
}

export default Hero