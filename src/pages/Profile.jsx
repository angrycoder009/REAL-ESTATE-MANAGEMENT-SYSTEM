import { getAuth, updateProfile } from 'firebase/auth';
import {doc, query, updateDoc, where,collection, orderBy,  getDocs} from "firebase/firestore";
import { db } from "../firebase";
import React, { useEffect } from 'react'
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FcHome } from "react-icons/fc";
import ListingItem from './ListingItem';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const[changeDetail,setChangeDetail]=useState(false);
  const[listings,setListings]=useState(null);
  const[loading,setLoading]=useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
  function onLogout(){
    auth.signOut();
    navigate("/");
  }
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onsubmit(){
    try {
      if(auth.currentUser.displayName!==name){
        ///update display name  in firebase auth
          await updateProfile(auth.currentUser,{
            displayName :name,
          })
          //update name in the firestore
          const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });
        toast.success("profile update successfully")
      }
    } catch (error) {
      toast.error("Could not update profile details")
    }
  }
  useEffect(()=>{
    async function fetchUserListings(){
    
      const listingRef = collection(db , "listings");
      const q = query(listingRef, where("userRef","==",auth.currentUser.uid),orderBy("timestamp","desc"));
      const querySnap = await getDocs(q);
      let listings =[];
      querySnap.forEach((doc)=>{
        return listings.push({
          id : doc.id,
          data :doc.data(),
        })
      })
      setListings(listings);
      setLoading(false)
    }
    fetchUserListings();
  },[auth.currentUser.uid])
  return (
    <>
    <section className='max-w-6xl mx-auto
    flex justify-center 
    items-center flex-col'>
     <h1 className='text-center text-3xl mt-6 font-bold'>My Profile</h1>
     <div className='w-full md:w-[50%] mt-6 px-3'>
      <form >
        <input type='text'
         id =  "name"   
         value={name} 
         disabled ={!changeDetail}
         onChange ={onChange}
        className='mb-6 w-full 
        px-4 py-2 text-xl
         text-gray-700
          bg-white border
           border-gray-300
            rounded transition
             ease-in-out' >

        </input>
        <input type='email'
         id =  "email"   
         value={email} 
         disabled
        className='mb-6 w-full 
        px-4 py-2 text-xl
         text-gray-700
          bg-white border
           border-gray-300
            rounded transition
             ease-in-out' >

        </input>

        <div className='flex justify-between
        whitespace-nowrap text-sm sm:text-lg mb-6'>
          <p className='flex items-center'>Do you want to change your name?
            <span onClick={()=>{ changeDetail && onsubmit();
              setChangeDetail((prevState)=> !prevState)}}
             className='text-red-400
            transition ease-in-out duration-200 ml-1
            hover:text-red-700 cursor-pointer'
           >{changeDetail ? "Apply change":"edit"}</span>
          </p>
          <p onClick={onLogout} className='text-blue-600
          hover:text-blue-900 
          transition ease-in-out
          cursor-pointer'>Sign out</p>
        </div>
      </form>
      <button className='w-full bg-green-600 text-white  uppercase px-7 py-3 font-medium rounded
      shadow-medium hover:bg-green-800 transition ease-in-out hover:shadow-lg
      active:bg-green-900' type="submit"><Link className='flex items-center justify-center' to = "/create-listing">
        <FcHome className='mr-2 text-3xl rounded bg-blue-100 border-2' />Sell or Rent your Home</Link></button>
     </div>
     </section>
     <div className='max-w-6xl px-3 mt-6 mx-auto'>
      {!loading && listings.length>0 &&(
        <>
        <h2 className="text-2xl text-center font-semibold mb-6">
          My Listings
        </h2>
        <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {listings.map((listing) => (
           <ListingItem
           key={listing.id}
           id={listing.id}
           listing={listing.data}/>
          ))}
        </ul>
      </>
      )}
     </div>
    </>
  )
}
