import React, { useEffect, useState } from 'react'
import {useParams } from "react-router-dom";
import { doc,getDoc} from 'firebase/firestore';
import { db } from '../firebase';
import Spinner from '../components/Spinner';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css/bundle";
import { FaShareFromSquare } from "react-icons/fa6";
export default function Listing() {
  const params = useParams();
  const [listing,setListing]=useState(null);
  const[loading,setLoading]=useState(true);
  
  useEffect(()=>{
    async function fetchListing(){
    const docRef = doc(db,"listings",params.listingId)
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
       setListing(docSnap.data())
       setLoading(false);
    }
    }
    fetchListing()
  },[params.listingId])
  if(loading){
    return <Spinner/>
  }
  return  <main >
    <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true, type: "progressbar" }}
        effect="fade"
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[500px] object-fill mt-1
              "
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div onClick={()=>{
        navigator.clipboard.writeText(window.location.href)
      }}
      className='fixed top-[27%] right-[3%] z-50 text-[2rem] bg-white cursor-pointer
      border-gray-400 rounded-full w-12 h-12 flex items-center text-center justify-center
      hover:bg-gray-600 active:bg-gray-900
      '>
      <FaShareFromSquare />
      
      </div>
    </main>;
  
}
