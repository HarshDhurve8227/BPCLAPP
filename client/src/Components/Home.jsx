import React from 'react'
import Footer from './Footer'
import { Carousel, initMDB } from "mdb-ui-kit";
import './Product.css'

initMDB({ Carousel });

export default function Home() {
  return (

    <>
    <div className='container-fluid p-5'>
        <h2 className='text-primary text-center custom-table-head'>Bharat Gas</h2>
        <p className='custom-table-body'>In a constantly evolving country such as ours, the supply of efficient energy forms the backbone of our industries, fuelling economic growth and development. LPG permeates our lives in far-reaching ways; be it across housing and health, apparel and hardware, or hospitality and agriculture. Bharatgas provides end-to-end solutions and services to meet all your business requirements for energy, and helps create products that are superior in quality and reliable.
Having reached over 8 crores households, Bharatgas has spread its motto ‘Cook Food Serve Love’ across millions of families. It is an emotion that strengthens bonds amongst near and dear ones, all made possible by our vibrant teams, dynamic distributors and delivery personnel. 
We also serve the needs of commercial and bulk customers fulfilling a varied set of needs through our B2B offerings.</p>
    </div>









    
  
    

    <Footer/>

    </>
  )
}