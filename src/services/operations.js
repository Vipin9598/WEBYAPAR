import { toast } from "react-hot-toast";
import { setUser, setLoading } from "../slices/userSlice";
import { useSelector } from "react-redux";
import { apiConnector } from "./apiconnector";

export async function createUser(data, dispatch) {
  console.log("aa gya ");
  dispatch(setLoading(true));
  const toastId = toast.loading("Loading...");
  let response;
  try {
     response = await apiConnector(
      "POST",
      "http://localhost:5000/api/v1/createuser",
      data
    );
    console.log("response of create user api..........",response)
    if (!response.data.success) {
    toast.error(response.data.message)
      throw new Error(response.data.message);
    }
    toast.success("User created Successfully");
    
  } catch (error) {
    console.log("User Create api error.........", error);
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
  return response
}

export async function login(data, dispatch) {
  console.log("Login krne aaya hoon..........");
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");
    let response;
    try {
       response = await apiConnector(
        "POST",
        "http://localhost:5000/api/v1/login",
        data
      );
      console.log("response...........", response.data.data);
      if (!response.data.success) {
        toast.error(response.data.message)
        throw new Error(response.data.message);
      }
      await dispatch(setUser(response.data.data));
    //   console.log("slice ka user set krn e k baad login m ",user)
      toast.success("Login Successfully");
    } catch (error) {
      console.log("Error occured while login..........", error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
    return response;
}

export async function updateProfile(data, dispatch) {
    let response

    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");
    try {
       response = await apiConnector(
        "POST",
        "http://localhost:5000/api/v1/updateprofile",
        data
      );
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      dispatch(setUser(response.data.data));
      toast.success("Upload Successfully");
    } catch (error) {
      console.log("User Create api error.........", error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
    return response

}

export async function verification(Id,dispatch) {
    let response
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading....");
    try {
       response = await apiConnector(
        "POST",
        "http://localhost:5000/api/v1/verification",{Id}
      );
      if (!response.data.success) {
        toast.error(response.data.message)
        throw new Error(response.data.message);
      }
      toast.success("Verified");
    } catch (error) {
      console.log("Verification api error ..........", error);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
    return response;

}

export async function fetchalluser(dispatch){
    let response
    dispatch(setLoading(false))
    const toastId = toast.loading("Loading....")
    try{
        response = await apiConnector("GET","http://localhost:5000/api/v1/fetchalluser");
        if(!response.data.success){
            throw new Error(response.data.message)
        }

    }
    catch(error){
        console.log("Error occur durinf fetching all the user",error)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
    return response

}

export async function deleteUser (Id,dispatch){
    let response
    dispatch(setLoading(false))
    const toastId = toast.loading("Loading....")
    try{
        response = await apiConnector("POST","http://localhost:5000/api/v1/deleteuser",{Id});
        if(!response.data.success){
            toast.error(toast.error.message)
            throw new Error(response.data.message)
        }
        toast.success("Account Deleted Successfully")
        
    } catch(error){
        console.log("Error occur durinf delete  the user",error)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
    return response
}