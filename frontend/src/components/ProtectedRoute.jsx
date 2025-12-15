import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoute = () => {
 let {user} = useSelector((state)=>state.auth)

 if(!user){
  return <Navigate to='/'/>
 }
 
  return <Outlet/>
}

export default ProtectedRoute


// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router";

// const ProtectedRoute = () => {
//   let { user } = useSelector((state) => state.auth);
//   console.log("user", user);

//   if (!user) {
//     return <Navigate to="/" />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;
