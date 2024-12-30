import React from 'react'
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Listings from '../components/Listings';
import About from '../components/About';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
    <Header />
    <Hero />
    <Features />
    <Listings />
    <About />
    <Footer />
    </>
  )
}

export default Home