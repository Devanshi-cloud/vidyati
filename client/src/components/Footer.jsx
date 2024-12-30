import React from 'react'
import { Link } from 'react-router-dom'
import { BsEnvelopeFill, BsFacebook, BsGeoAltFill, BsInstagram, BsLinkedin, BsTelephoneFill, BsTwitter, } from 'react-icons/bs'

const Footer = () => {
  return (
    <footer className='max-padd-container'>
        <div className='max-padd-container bg-black text-white py-10 rounded-3xl'>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8'>
                {/* Logo */}
                <Link to={'/'} className='bold-24 mb-4'>
                <div>
                    Diviniti<span className='text-secondary'>Realty</span>
                </div>
                <p className="text-white/70">Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Cum, harum! Sit porro ipsa 
                inventore asperiores eos cum molestias!</p>
                <p>&copy; 2024 Devanshi Jaiswal. All Rights Reserved.</p>
                </Link>
                {/* Quick Links */}
                <div className=''>
                    <h4 className='h4 mb-4'>Quick Links</h4>
                    <ul className='space-y-3 regular-15'>
                        <li className='text-gray-10'>
                            <a href="/about">About Us</a>
                        </li>
                        <li className='text-gray-10'>
                            <a href="/properties">Properties</a>
                        </li>
                        <li className='text-gray-10'>
                            <a href="/services">Services</a>
                        </li>
                        <li className='text-gray-10'>
                            <a href="/contact">Contact</a>
                        </li>
                        <li className='text-gray-10'>
                            <a href="/privacy-policy">Privacy Policy</a>
                        </li>
                    </ul>
                </div>
                {/* Contact Info */}
                <div>
                    <h4 className='h4 mb-4'>Contact Us</h4>
                    <p className='text-gray-10 mb-2'>
                        <BsTelephoneFill className='inline-block mr-2'/> +91 9161055529
                    </p>
                    <p className='text-gray-10 mb-2'>
                        <BsEnvelopeFill className='inline-block mr-2'/>{" "}devanshijaiswal7@gmail.com
                    </p>
                    <p className='text-gray-10 mb-2'>
                        <BsGeoAltFill className='inline-block mr-2'/> 107/244A Neheru Nagar, Kanpur, Uttar Pradesh
                    </p>
                </div>

                {/* Social Media Links */}

                <div>
                    <h4 className="h4 mb-4">Follow Us</h4>
                    <div className="flex space-x-4 text-gray-10">
                        <a href="#" className='hover:text-blue-500'>
                            <BsFacebook/>
                        </a>
                        <a href="#" className="hover:text-blue-400">
                            <BsTwitter/>
                        </a>
                        <a href="#" className="hover:text-red-500">
                            <BsInstagram/>
                        </a>
                        <a href="#" className="hover:text-blue-600">
                            <BsLinkedin/>
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-10 text-center text-gray-100">
                <p>
                   Powered by <a href="#">Leaselodge Team</a>
                </p>
            </div>
        </div>
    </footer>
  )
}

export default Footer