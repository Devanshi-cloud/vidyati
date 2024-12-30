import React from 'react'
import { Link } from 'react-router-dom'
import circle from "../assets/circle.png"
import client1 from "../assets/person-1.jpg"
import client2 from "../assets/person-2.jpg"
import sideImg from "../assets/sideImg.png"
import sideImg1 from "../assets/sideImg1.png"
import sideImg2 from "../assets/sideImg2.png"
import { useSelector } from 'react-redux'

const Hero = () => {
    const user = useSelector((state) => state.user)
  return (
    <section className='max-padd-container mt-16 xl:mt-10'>
        <div className='flex flex-col xl:flex-row gap-16'>
            {/* Left */}
            <div className='flex justify-center flex-1 flex-col gap-y-8
            xl:max-w-[555px] relative'>
            <h1 className="h1">Invest in <span className='text-secondary'>Your Future
                </span> with 
                confidence
            </h1>
            <p>"Vidyām dadāti vinayaṁ" is our company motto, reflecting our core belief in the transformative power of knowledge and humility. As a newly established realty firm, we are dedicated to helping people with their real estate needs by providing expert guidance and personalized service. Our team understands that purchasing or selling a property is not just a transaction; it’s a significant life decision. We strive to empower our clients with the information they need to make informed choices, ensuring a smooth and rewarding experience. With integrity and respect at the forefront of our operations, we aim to build lasting relationships based on trust and satisfaction.
            </p>
        <div className='flex gap-3'>
        <a href="#listing" className="btn-dark flexCenter
        rounded-full">Explore Properties
        </a>
        {user ? (
            <Link
            to={"/create-listing"}
            className="btn-primary flexCenter rounded-full"
            >
            <span className="medium-20 pr-1">+</span>Add Property
        </Link>
        ) :(
            <Link
            to={"/login"}
            className='btn-secondary flexCenter rounded-full'>
                <span className="medium-20 pr-1">+</span> Add Property
            </Link>
        )}
        </div>
         <div className="flex relative">
            
            <img src={client1} alt="" className='rounded-full h-[80px] z-30' />
             <img src={circle} alt="" className='rounded-full h-[80px] shadow-sm absolute left-16 z-20' />
             <img src={client2} alt=""  className='rounded-full h-[80px] 
            shadow-sm absolute left-32 z-10'/>  
        </div> 
        </div>
        {/* Right */}
        <div className="flex flex-1 flex-col gap-4">
            <div className="rounded-2xl h-[266px] overflow-hidden">
                <img src={sideImg} alt="" className='rounded-xl object-cover'/></div>
            <div className="flexBetween gap-4">
                <div className='flex flex-1 rounded-xl'><img 
                src={sideImg1} alt="" className='rounded-xl object-cover
                aspect-square'/></div>
                <div className='flex flex-1 rounded-xl'><img 
                src={sideImg2} alt="" className='rounded-xl object-cover
                aspect-square'/></div>
            </div>
        </div>
    </div>    
    </section>
  )
}

export default Hero