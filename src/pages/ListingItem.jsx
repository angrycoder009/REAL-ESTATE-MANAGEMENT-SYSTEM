import React from 'react'
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { MdLocationPin } from "react-icons/md";
export default function ListingItem({listing,id}) {
  return   <li className='mt-6 mr-10'>
    <Link to={`/category/${listing.type}/${id}`}>
      <img className='rounded-xl w-80 h-[300px] object-cover ' src={listing.imgUrls[0]} alt="" />
      <Moment fromNow>{listing.timestamp?.toDate()}</Moment>
      <div>
        <div>
        <MdLocationPin />
        <p>{listing.address}</p>
        </div>  
       <p>{listing.name}</p>
       <p>${listing.offer? listing.discountedPrice .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") :listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
           {listing.type === "rent" && "/month"}       
                  </p>
      </div>
    </Link>
  </li>;
  
}
