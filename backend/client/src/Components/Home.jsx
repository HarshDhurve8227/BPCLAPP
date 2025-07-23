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

    <div id="lpgCarousel" className="carousel slide mt-5" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/images/lpg1.jpg" className="d-block w-100" alt="LPG Bottling 1" />
            </div>
            <div className="carousel-item">
              <img src="/images/lpg2.jpg" className="d-block w-100" alt="LPG Bottling 2" />
            </div>
            <div className="carousel-item">
              <img src="/images/lpg3.jpg" className="d-block w-100" alt="LPG Bottling 3" />
            </div>
          </div>
          {/* Carousel Controls */}
          <button className="carousel-control-prev" type="button" data-bs-target="#lpgCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#lpgCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      

    <Footer/>

    </>
  )
}