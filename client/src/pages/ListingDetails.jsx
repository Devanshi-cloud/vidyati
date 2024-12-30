import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Header from '../components/Header'
import Listing from '../../../server/models/Listing'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { FaPersonShelter } from 'react-icons/fa6'
import { MdBed, MdOutlineBathroom, MdOutlineBedroomChild } from 'react-icons/md'
import { facilities } from '../assets/data'
import {DateRange} from "react-date-range";
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { useSelector } from 'react-redux'
import Footer from "../components/Footer"

const ListingDetails = () => {
const [loading, setLoading] = useState(true)
const {listingId} = useParams()
const [listing, setListing] = useState(null)

const getListingDetails = async ()=> {
    try {
        const response = await fetch(`http://localhost:4000/listing/${listingId}`,{
            method: 'GET',
        })

        const data = await response.json()
        setListing(data)
        setLoading(false)
    } catch (err) {
        console.log("Fetch Listing Details Failed", err.message)
    }
}

//BookingCalender
const [dateRange, setDateRange] = useState([
    {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',

    },
]);


const handleSelect = (ranges)=> {
    //Update the selected date range when the user makes a selection
    setDateRange([ranges.selection])

}

const start = new Date(dateRange[0].startDate);
const end = new Date(dateRange[0].endDate);

const customerId = useSelector((state) => state?.user?._id)

const isOwner = listing?.creator?._id == customerId;

const navigate = useNavigate();
const handleSubmit = async ()=>{
    try {
        
        const bookingForm = {
            customerId,
            listingId,
            hostId: listing.creator._id,
            startDate: dateRange[0].startDate.toDateString(),
            endDate: dateRange[0].endDate.toDateString(),
            title: listing.title,
            description: listing.description,
        }
        
        const response = await fetch("http://localhost:4000/bookings/create", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingForm),
        });
        if(response.ok){
            navigate(`/${customerId}/trips`)
        }
    } catch (err) {
        console.log("Submit Booking failed", err.message)
    }
};

useEffect(()=>{
    getListingDetails()
},[])

    return loading ? (
    <Loader />
 ):(
    <>
        <Header />
        <section className='max-padd-container flex gap-12 flex-col-reverse xl:flex-row py-10'>
            {/* Left */}
            <div className='flex-1'>
                <div>
                    <h3 className='h3'>{Listing.title}</h3>
                    <div className='flex items-center gap-x-1 pb-1'>
                        <span>
                            <HiOutlineLocationMarker/>
                        </span>
                        <p>
                            {listing.type} in {listing.city}, {listing.province},{" "} 
                            {listing.country}
                        </p>
                    </div>
                    <div className='flex items-center gap-4 capitalize pt-5'>
                        <span>
                            <FaPersonShelter className='text-xl'/>
                            <p className='pt-2'>{listing.guestCount} guests</p>
                        </span>
                        <span>
                            <MdOutlineBedroomChild className='text-xl'/>
                            <p className='pt-2'>{listing.bedroomCount} bedrooms</p>
                        </span>
                        <span>
                            <MdBed className='text-xl'/>
                            <p className='pt-2'>{listing.bedCount} beds</p>
                        </span>
                        <span>
                            <MdOutlineBathroom className='text-xl'/>
                            <p className='pt-2'>{listing.bathroomCount} bathrooms</p>
                        </span>
                    </div>
                </div>
           
            <div className='flex items-center gap-x-3 py-6'>
                <img
                    src={`http://localhost:4000/${listing?.creator?.profileImagePath?.replace(
                        "public",
                        ""
    )}`}
    alt='creator'
    height={44}
    width={44}
    className='rounded-full'
    />
    <h5 className='medium-14 capitalize'>
        Hosted by {listing.creator.firstName} {listing.creator.lastName}
        </h5>
    </div>
    <p className='pb-3'>{listing.description}</p>
    {/* Amenities/Facilities */}
    <div>
        <h4 className='h4 py-3'>What this place offers?</h4>
        <ul className='flex items-center flex-wrap gap-3'>
            {listing.amenities[0].split(",").map((item,i) => (
                <li key={i}
                    className='flex items-center gap-3 bg-white ring-1 ring-slate-900/5 p-4 rounded'>
                        <div>{facilities.find((f)=> f.name === item)?.icon}</div>
                    <p>{item}</p>
                </li>
            ))} 
        </ul>
    </div>

    {/* Booking Calender */}
    <div>
        <h4 className='h4 py-3 my-2'>When Are You Free?</h4>
        <DateRange ranges={dateRange} onChange={handleSelect}/>
        <div>
            
            <div className='flex items-center gap-x-3 pt-2'>
                <span className='bold-15'>Start Date:</span>
                <p className='relative pt-0.5'>
                    {dateRange[0].startDate.toDateString()}
                </p>
            </div>
            <div className='flex gap-x-3 pt-2'>
                <span className='bold-15'>End Date:</span>
                <p className='relative pt-0.5'>
                    {dateRange[0].endDate.toDateString()}

                </p>
            </div>
        </div>
    </div>

    {/* Book Button */}
    <button 
        type="submit" 
        onClick={handleSubmit}
        className='btn-secondary rounded-full flexCenter gap-x-2
        capitalize'
        disabled={isOwner}
    >
        {isOwner ? "You can't Book your own property" : "Book the Visit"}
        </button>
    </div> 
    
{/* Right {image Gallery} */}
<div className='flex-1'>
    <div className='flex flex-wrap'>
            {listing.listingPhotoPaths?.map((item,index)=>(
                <div key={index} className={`${index === 0 ? "w-full": "w-1/2"} p-2`}>
                <img 
                src={`http://localhost:4000/${item.replace("public", "")}`} 
                alt="ListingImages" 
                className={`max-w-full ${
                    index === 0 ? "object-contain rounded-3xl" : "rounded-2xl"
                }`} 
                />
                </div>
            ))}
    </div>
</div>
</section>
<Footer/>
    </>
  )
}

export default ListingDetails