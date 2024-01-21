import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from "react-hot-toast"
import Form from '../components/Form'
import {createUser} from "../services/operations"
import { useDispatch, useSelector } from 'react-redux'
import { setSearchUser } from '../slices/userSlice'


const Admin = () => {
    const navigate = useNavigate()
  const dispatch = useDispatch();
  const {searchedUser} = useSelector((state)=>state.user)
  const [ formData, setFormData ] = useState({
    userId: "",
    password: "",
  });
  const [desired,setdesireduser] = useState({
    user1:"",
    user2:""
  })
  

  function changeHandler(event) {
    setdesireduser((prevdata) => {
      return {
        ...prevdata,
        [event.target.name]: event.target.value,
      };
    });
  }
 
    // const fetchData = async()=> {
    //     const toastId = toast.loading("Loading....")
    //     const desiredId = []
    //     desiredId.push(desired.user1)
    //     desiredId.push(desired.user2)
    //     console.log("desiredArray",desiredId)
    //     try{
    //         const result = await fetchalluser(dispatch)
    //         console.log("All the user detail are ",result.data.data)
    //         await setUserData(result?.data?.data)
    //         console.log("userData",userData)
    //         const filteredData =await userData.filter((item)=>desiredId.includes(item.userId))
    //         console.log("filtered Data",filteredData)
    //         await dispatch(setSearchUser(filteredData))
    //         console.log("searchedUser",searchedUser)
    //     }
    //     catch(error){
    //         console.log("error aa gya while fetching all the user",error)
    //     }
    //     toast.dismiss(toastId);
    // }
      
      const clickHandler = () => {
        const newarray = []
        if(desired.user1 != "") newarray.push(desired.user1)
        if(desired.user2 != "") newarray.push(desired.user2)
        dispatch(setSearchUser(newarray))
    navigate("/view-user")
      }

  const submitHandler = async(e) => {
    if(formData.userId == "" || formData.password== ""){
        toast.error("Provide all details")
    }
    else{
        try{
            const result = await createUser(formData,dispatch)
            console.log("result  user create krte wqt ...........",result)
            if(result.data.success){
                navigate("/user-login");
            }
        } catch(error){
            console.log("error",error)
        }
    }
  }
  return (
    <div className='flex sm:flex-row flex-col  h-screen'>
      <div className='h-full sm:w-[50%] w-[100%]'>
        <Form formData={formData}  setFormData={setFormData} submitHandler={submitHandler}/>
      </div>

      {/* RIGHT PART / */}
      <div className='h-full sm:w-[50%] w-[100%] flex items-center justify-center'>
        <div className='flex flex-col gap-5 sm:w-auto w-[80%]'>
            <p className='text-center text-2xl font-semibold '>View User</p>
            <div className='bg-blue-100 px-6 py-5 w-full'>
                <input type="text" name='user1' value={desired.user1} onChange={changeHandler}className='w-full rounded-md'/>
            </div>
            <div className='bg-blue-100 px-6 py-5 w-full'>
                <input type="text" name='user2' value={desired.user2} onChange={changeHandler} className='w-full rounded-md'/>
            </div>
            <div className='flex justify-end'>
            <button onClick={clickHandler} className='py-1 px-5 bg-blue-700 text-white text-lg rounded-md'>View</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
