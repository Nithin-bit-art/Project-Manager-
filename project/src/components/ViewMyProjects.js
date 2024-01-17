import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteProjectApi, userProjectApi, userProjectsApi } from "../service/allApi";
import { addResponseContext, editResponseContext } from "../service/ContextShare";
import UpdateProject from "./UpdateProject";
import '../index.css'




function ViewMyProjects() {
  const {addUpdate}=useContext(addResponseContext)

  const {editUpdate}=useContext(editResponseContext)


  const [userProjects,setUserProjects ] = useState([]);
  const getUserProjects = async () => {
    // header
    // id
    if (localStorage.getItem("currentId")) {
      const id = localStorage.getItem("currentId");
      console.log(id);
      // header creation
      const token = localStorage.getItem("token");

      const reqHeader = {
        "Content-Type": "application/json",
        access_token: `Bearer ${token}`,
      };

      const result = await userProjectApi(reqHeader, id);
      console.log(result);
      if(result.status==200){
        setUserProjects(result.data)
      }
    }
  };

  const handleDelete =async (e,id)=>{
    e.preventDefault()
    // header
    const token=localStorage.getItem("token")

    const reqHeader={
      "Content-Type": "application/json",
      access_token:`Bearer ${token}`,
    }

    const response =await deleteProjectApi(reqHeader,id)
    console.log(response);
    alert(response.data)
    getUserProjects()
  }
  useEffect(() => {
    getUserProjects();
  }, [addUpdate,editUpdate]);
  return (
    <div>
      {userProjects?.length>0?
      userProjects?.map(i=>(
      <div className="border mt-5 p-4 shadow">
        <Row>
          <Col lg={8}>
            <span className="">{i?.title}</span>
          </Col>
          <Col lg={4} className="text-end">
            <UpdateProject project={i}></UpdateProject>
            <Link to={`${i.gitHub}`}
              className="me-3 ms-3 text-dark"
              style={{ textDecoration: "none" }}
            >
              <i class="fa-brands fa-github fs-4"></i>
            </Link>
            <span onClick={(e)=>handleDelete(e,i?._id)} className="me-3 text-dark" style={{ textDecoration: "none" }}>
              <i class="fa-solid fa-trash fs-4"></i>
            </span>
          </Col>
        </Row>
        </div>
      ))
       :
          <p className="mt-5 p-4 text-info">No Projects Uploaded!</p>}
        
      </div>
   
  )
}

export default ViewMyProjects;