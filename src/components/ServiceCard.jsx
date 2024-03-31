import React from 'react'

const ServiceCard = ({imgURL,label,subtext}) => {
  return (
    <div className='flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-3xl dark:shadow-coral-red dark:shadow-md px-10 py-16'>
        <div className='w-11 h-11 flex justify-center items-center bg-coral-red rounded-full'>
            <img src={imgURL} alt={label} width={24} height={24}/>
        </div>
        <h3 className='dark:text-white mt-5 font-palanquin text-3xl leading-normal font-bold'>{label}</h3>
        <p className='dark:text-white mt-3 break-words font-montserrat text-lg leading-normal'>{subtext}</p>
    </div>
  )
}

export default ServiceCard