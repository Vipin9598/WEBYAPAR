import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import Form from "../components/Form"
import {login} from "../services/operations"
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch();
  const [ formData, setFormData ] = useState({
    userId: "",
    password: "",
  });
  const matchRoutes = (link) => {
    return matchPath({ path: link }, location.pathname);
  };

  const submitHandler = async(e) => {
    if(formData.userId == "" || formData.password== ""){
        toast.error("Provide all details")
    }
    else{
        try{
            const result = await login(formData,dispatch)
            if(result.data.success){
                {matchRoutes("/") ? navigate("/admin") : navigate("/user-details")}
            }
        } catch(error){
            console.log("error",error)
        }
    }
  }

  
  return (
    <div className="flex sm:flex-row flex-col h-screen">
      <div className="flex justify-center items-center h-full sm:w-[60%] bg-blue-800">
        <div className=" bg-white flex justify-center items-center min-h-[100px]  min-w-[200px]  rounded-md">
          <p className=" text-blue-800 md:text-4xl text-2xl">Logo</p>
        </div>
      </div>
      {/* right div  */}
      <div className=" h-full sm:w-[40%]">
    
          
            <Form  formData={formData} setFormData={setFormData}  submitHandler={submitHandler}/>

      </div>
    </div>
  );
};

export default Home;
