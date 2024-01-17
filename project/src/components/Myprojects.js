import React, { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addProjectApi } from "../service/allApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addResponseContext } from "../service/ContextShare";

function Myprojects() {

  // access Context
  const {addUpdate,setAddUpdate}=useContext(addResponseContext)


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // state for image preview
  const [preview,setPreview]=useState("")

  const [token,setToken]=useState("")

  const [projectInputs,setProjectInputs]=useState({
    title:"",overView:"",gitHub:"",website:"",projectImage:"",languages:""
  })

  const setInputs=(e)=>{
    const {value,name}=e.target
    setProjectInputs({...projectInputs,[name]:value})
  }

  useEffect(()=>{
    if(projectInputs.projectImage){
      setPreview(URL.createObjectURL(projectInputs.projectImage))
    }
    else{
      setPreview("")
    }

  },[projectInputs.projectImage])

  useEffect(()=>{
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
    }
    else{
      setToken("")
    }
  },[])
  console.log(projectInputs);

  const handleAdd=async(e)=>{
    e.preventDefault()
    const {title,overView,gitHub,website,projectImage,languages}=projectInputs
    if(!title || !overView || !gitHub || !website || !projectImage || !languages){
      toast.warn('Please fill all datas', {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    else{
      // header - content type ,token
     const headerConfig={
      "Content-Type":"multipart/form-data",
      "access_token":`Bearer ${token}`
     }
      // body
      const reqBody=new FormData()
      reqBody.append("title",title)
      reqBody.append("overView",overView)
      reqBody.append("gitHub",gitHub)
      reqBody.append("website",website)
      reqBody.append("languages",languages)
      reqBody.append("projectImage",projectImage)

      const result=await addProjectApi(reqBody,headerConfig)
      console.log(result);
      if(result.status==200){

        // change context state
        setAddUpdate(result.data)
       
        toast.success(`${result.data.title} Project added successfully!`, {
          position: "top-center",
          autoClose: 1511,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        // reset form data
        setProjectInputs({...projectInputs,title:"",overView:"",gitHub:"",website:"",projectImage:"",languages:""})
        handleClose()
       
      }
      else{
        alert(result.response.data)
      }
      
    }
  }
  return (
    <div className="w-100">
      <Row className="mt-4">
        <Col lg={9}>
          <h4 style={{fontFamily:'Viga',fontSize:'22px'}}>My Projects</h4>
        </Col>
        <Col lg={3}>
          <Link style={{fontFamily:'Agbalumo'}}  onClick={handleShow} className="btn Link btn-info w-100">
            Add Project
          </Link>
        </Col>
      </Row>
     
      <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-info">
            Add The Project Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
            <label htmlFor="img1" className="text-center">
                <input onChange={(e)=>setProjectInputs({...projectInputs,["projectImage"]:e.target.files[0] })} id="img1" style={{display:'none'}} type="file" />
                <img className="w-100 mt-5" src={preview?preview:"https://i.postimg.cc/2574Sm8N/image-compression-plugins-jpg.webp"} alt="" />
            </label>
            </Col>
            <Col>
              <input value={projectInputs.title} name="title" onChange={(e)=>setInputs(e)}
                className="form-control p-2 mt-3"
                type="text"
                placeholder="Project Name"
                style={{ border: "none" }}
              />
              <hr />
              <input value={projectInputs.languages} name="languages" onChange={(e)=>setInputs(e)}
                className="form-control p-2 mt-2"
                type="text"
                placeholder="Language Used"
                style={{ border: "none" }}
              />
              <hr />
              <input value={projectInputs.gitHub} name="gitHub" onChange={(e)=>setInputs(e)}
                className="form-control p-2 mt-2"
                type="text"
                placeholder="Github Link"
                style={{ border: "none" }}
              />
              <hr />
              <input value={projectInputs.website} name="website" onChange={(e)=>setInputs(e)}
                className="form-control p-2 mt-2"
                type="text"
                placeholder="Website Link"
                style={{ border: "none" }}
              />
              <hr />
            </Col>
          </Row>
          <Row>
            <Col>
              {" "}
              <textarea value={projectInputs.overView} name="overView" onChange={(e)=>setInputs(e)}
                style={{ border: "none" }}
                className="form-control p-2 mt-3"
                type="text"
                placeholder="Project Overview"
              />
            </Col>
            <hr />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{fontFamily:'Agbalumo'}} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button style={{fontFamily:'Agbalumo'}} variant="info" onClick={(e)=>handleAdd(e)}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer/>
    </div>
  );
}

export default Myprojects;