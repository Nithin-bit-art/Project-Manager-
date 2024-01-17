import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";


// register
export const registerApi=async(body)=>{
    return await commonApi ('POST',`${BASE_URL}/user/register`,body,"")
}

// login 
export const loginApi=async(body)=>{
    return await commonApi ('POST',`${BASE_URL}/user/login`,body,"")
}

// update profile
export const updateProfile=async(body,headers,id)=>{
    return await commonApi ('PUT',`${BASE_URL}/user/update-profile/${id}`,body,headers)
}
//  // get profile 
//  export const getProfileApi=async(id)=>{
//     return await commonApi ('GET',`${BASE_URL}/user/grtprofile/${id}`,{},"")
//  }

 // add new project
 export const addProjectApi=async(body,headers)=>{
    return await commonApi('POST',`${BASE_URL}/user/add-project`,body,headers)
 }

  // get new project
  export const userProjectApi=async(headers,id)=>{
    return await commonApi('GET',`${BASE_URL}/user/get-user-projects/${id}`,"",headers)
 }

 // get all projects
 export const allProjectsApi=async(searchData)=>{
    return await commonApi('GET',`${BASE_URL}/user/get-all-projects?search=${searchData}`,"","")
 }

 // get home projects
 export const homeProjectApi=async()=>{
    return await commonApi('GET',`${BASE_URL}/user/get-home-projects`,"","")
 }
// update project
export const UpdateProjectApi=async(body,header,id)=>{
   return await commonApi('PUT',`${BASE_URL}/user/edit-project/${id}`,body,header)
}

// delete Project
export const deleteProjectApi=async(header,id)=>{
   return await commonApi('DELETE',`${BASE_URL}/user/delete-project/${id}`,{},header)
}

 
