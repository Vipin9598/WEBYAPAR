import React, { useEffect ,useState} from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../services/operations";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner"
import {toast} from "react-hot-toast";
import {fetchalluser} from "../services/operations"
import { verification } from "../services/operations";

const ViewUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchedUser } = useSelector((state) => state.user);
  const [userData,setUserData] = useState([])

  const verificationHandler = async(Id) => {
    try{
        console.log("backend p call lga diu")
        const result = await verification(Id,dispatch)
        console.log("response",result)
    } catch(error){
        console.log("Error aa gya verification",error)
    }
  }

  const deleteHandler = async(Id) => {
    try{
        const result = await deleteUser(Id,dispatch)
        console.log("response",result)
        if(result?.data?.success){
            const filterData = await userData.filter((item)=>item.Id != Id)
            setUserData(filterData)
            if(filterData.length == 0){
                navigate("/admin")
            }
        }
    } catch(error){
        console.log("Error a gya delete krte time ")
    }
  }

  useEffect(()=>{
    const fetchData = async()=> {
        const toastId = toast.loading("Loading....")
        try{
            console.log("Fetched User",searchedUser)
            const result = await fetchalluser(dispatch)
            console.log("All the user detail are ",result.data.data)
            const filteredData =await result.data.data.filter((item)=>searchedUser.includes(item.Id))
            console.log("filtered Data",filteredData)

            await setUserData(filteredData)
            console.log("userData",userData)
            // await dispatch(setSearchUser(filteredData))
            // console.log("searchedUser",searchedUser)
        }
        catch(error){
            console.log("error aa gya while fetching all the user",error)
        }
        toast.dismiss(toastId);
    }
    fetchData();
  },[])

  return (
    <div className="h-screen w-screen">
      {!userData.length>0 ? (
        <div className="h-full w-full flex justify-center items-center">
            <Spinner />
        </div>
      ) : (
        <div className="flex flex-col w-full h-full gap-5  p-5" >
          <div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center px-2 py-1 border  border-blue-200"
            >
              <MdOutlineKeyboardArrowLeft />
              Back
            </button>
          </div>

          <div className="  flex mx-auto">
            <table className="viewuserTable w-auto" >
              <tr className="flex p-x-20 ">
                <th className="h-[40px] w-[100px] text-center">UserId</th>
                <th className="h-[40px] w-[100px] text-center">Name</th>
                <th className="h-[40px] w-[140px] text-center">Photo</th>
                <th className="h-[40px] w-[200px] text-center">Action</th>
              </tr>
              {userData.map((data) => (
                
                <tr className="text-black  flex p-x-20 " >
                  <td className="h-[60px] w-[100px] text-center">{data.Id}</td>
                  <td className="h-[60px] w-[100px] text-center">{data?.additionalDetails?.name}</td>
                  <td className="h-[60px] w-[140px] text-center flex justify-center items-center"><img src={data?.additionalDetails?.image} className="object-cover h-full w-full"/></td>
                  <td className="h-[60px] w-[200px] text-center flex gap-x-5 items-center justify-center">
                    {data?.validation == "Pending" && (
                      <button onClick={()=>verificationHandler(data.Id)} className=" text-center bg-blue-700 text-white px-2 py-1 text-lg">
                        Done
                      </button>
                    )}
                    <button onClick={()=>deleteHandler(data.Id)} className="px-2 py-1 border border-blue-700 text-center">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewUser;
