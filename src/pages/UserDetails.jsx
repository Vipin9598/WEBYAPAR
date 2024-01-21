import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {updateProfile} from "../services/operations"

const UserDetails = () => {
    const {user} = useSelector((state)=>state.user)
    const [loading,setLoading] = useState(false)
    const [showProfile,setShowProfile] =  useState(false)
    console.log("user slice vala ",user)
    const dispatch = useDispatch();
    const [ formData, setFormData ] = useState({
      name: "",
      image: "",
    });
    function changeHandler(event) {
        setFormData((prevdata) => {
          return {
            ...prevdata,
            [event.target.name]: event.target.value,
          };
        });
      }
  
    const submitHandler = async(e) => {
      if(formData.name == "" || formData.image== ""){
          toast.error("Provide all details")
      }
      else{
          try{
              const result = await updateProfile(formData,dispatch)
              console.log("result  user create krte wqt ...........",result)
            //   if(result.data.success){
            //       navigate("/user-login");
            //   }
          } catch(error){
              console.log("error",error)
          }
      }
    }
  return (
    <div className="h-screen w-screen flex flex-col">
      <div className="flex justify-end  relative ">
        <div className="p-5">
        <button disabled={loading} className="px-2 py-1  border border-blue-400 rounded-md text-blue-300" onClick={()=>{
            setShowProfile(!showProfile)
            setLoading(true)
        }}>View</button>
        </div>
        {
            showProfile && (
                <div className="absolute top-0 right-0 bg-slate-200 md:w-[40%] sm:w-[75%] w-[100%] h-screen z-50 ">
                   <div className="flex justify-end p-5">
                   <button className="px-2 py-1 border border-blue-400 rounded-md text-blue-300" onClick={()=>{
                    setShowProfile(!showProfile)
                    setLoading(false)
                   }}>Back</button>
                   </div>
                    <div className="h-full w-full px-10 flex flex-col items-center mt-[70px] gap-2">
                        <div className="w-full">
                            <p>Name</p>
                            <p className="py-1 px-2 min-h-[30px] border rounded-md">{user?.additionalDetails?.name}</p>
                        </div>
                        <div className="w-full">
                            <p>Photo</p>
                            <img src={user?.additionalDetails?.image}  className="h-[250px] w-[250px]"/>
                        </div>
                        <p>{user?.validation == "Pending" ?"Not Accepted by Admin" : "Accepted by Admin"}</p>
                        
                    </div>
                </div>
            )
        }
      </div>
      <div className="flex h-full w-full justify-center items-center">
        <div className="flex flex-col    sm:w-[40%] w-[80%] gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="userId">Name</label>
            <input
              type="text"
              placeholder="User ID"
              name="name"
              id="name"
              value={formData.name}
              onChange={changeHandler}
              required
              className="px-2 py-1  border-2  border-gray-700 rounded-md sm:min-w-[200px]"
            />
          </div>
          <div className="flex flex-col gap-1">
             <label for="image">Photo</label>
            <input
              type="file"
              placeholder="Upload Photo"
              name="image"
              id="image"
              value={formData.image}
              onChange={changeHandler}
              required
              className="px-2 py-1  border-2  border-gray-700 rounded-md min-h-[200px]"
            />
          </div>
          <button
          disabled={loading}
            onClick={submitHandler}
            className=" rounded-md text-center text-xl  px-2 py-1 bg-blue-700 text-white"
          >Upload</button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
