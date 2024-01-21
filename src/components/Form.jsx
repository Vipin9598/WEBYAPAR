import React from "react";
import { matchPath, useLocation } from "react-router-dom";

const Form = ({formData,setFormData,submitHandler}) => {
    const location = useLocation();
    const matchRoutes = (link) => {
        return matchPath({ path: link }, location.pathname);
      };

    function changeHandler(event) {
        setFormData((prevdata) => {
          return {
            ...prevdata,
            [event.target.name]: event.target.value,
          };
        });
      }
 
  return (
    <div className="flex flex-col items-center justify-center h-full  gap-5">
        <p className="text-2xl font-semibold">{matchRoutes("/user-login") ? "User Login" : matchRoutes("/")?"Admin Login" : "Create User" }</p>
      <div className="flex flex-col gap-5 w-[90%]">
        <div className="flex flex-col gap-1">   
          {matchRoutes("/admin") && <label for="userId">User ID</label>}
          <input
            type="text"
            placeholder="User ID"
            name="userId"
            id="userId"
            value={formData.userId}
            onChange={changeHandler}
            required
            className="px-2 py-1  border-2  border-gray-700 rounded-md min-w-[250px] "
          />
        </div>
        <div className="flex flex-col gap-1">
          {matchRoutes("/admin") && <label for="password">Password</label>}
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={formData.password}
            onChange={changeHandler}
            required
            className="px-2 py-1  border-2  border-gray-700 rounded-md"
          />
        </div>
        <button onClick={submitHandler}  className=" rounded-md text-center text-xl  px-2 py-1 bg-blue-700 text-white">{`${matchRoutes("/admin")  ? "Submit" : "Login"}`}</button>
      </div>

      
    </div>
  );
};

export default Form;
