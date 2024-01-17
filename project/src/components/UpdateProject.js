import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../service/baseUrl';
import { UpdateProjectApi } from '../service/allApi';
import { editResponseContext } from '../service/ContextShare';
import { Col, Row } from 'react-bootstrap';



function UpdateProject({ project }) {

  const {setEditUpdate}=useContext(editResponseContext)

  const [show, setShow] = useState(false);
  
  const handleClose = () =>{ setShow(false);
  setProjectInput({
    title:"",
    overView:"",
    gitHub:"",
    website:"",
    projectImage:"",
    languages:""
  })}

  const handleShow = () => setShow(true);

  const [preview, setPreview] = useState();
  const [ProjectInputs, setProjectInput] = useState({
    title: project.title, overView: project.overView, gitHub: project.gitHub, website: project.website, ProjectImage: "", languages: project.languages
  })


  useEffect(() => {
    if (ProjectInputs.ProjectImage) {
      setPreview(URL.createObjectURL(ProjectInputs.ProjectImage))
    }
    else {
      setPreview("")
    }
  }, [ProjectInputs.ProjectImage])

  const handleUpdate = async (e) => {
    e.preventDefault()
    const { title, languages, gitHub, website, overView, projectImage } = ProjectInputs
    if (!title || !languages || !gitHub || !website || !overView) {
      alert('please fill all the datas')
    }
    else {
      // api call
      // body
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("overView", overView)
      reqBody.append("gitHub", gitHub)
      reqBody.append("website", website)
      reqBody.append("languages", languages)

      preview ? reqBody.append("projectImage", projectImage) :
        reqBody.append("projectImage", project.projectImage)

      //header
      const token = localStorage.getItem("token")
      var headerConfig={}
      if (preview) {
        var headerConfig = {
          "content-Type": "multipart/form-data",
          "access_token": `Bearer ${token}`
        }
      }
      else {
        var headerConfig = {
          "content-Type": "application/json",
          "access_token": `Bearer ${token}`
        }
      }
      // project id
      const proId=project._id
      const result=UpdateProjectApi(reqBody,headerConfig,proId)
      if(result.status==200){
        alert(`${result.data.title}updated`)
        // update context
        setEditUpdate(result.data)
        handleClose()
      }
      else{
        alert('update fail')
      }
    }
  }

  return (
    <>
      <span onClick={handleShow}><i class="fa-solid fa-pen-to-square fs-4 text-dark"></i>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="text-info">
              Add The Project Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <label htmlFor="img1" className="text-center">
                  <input onChange={(e) => setProjectInput({ ...ProjectInputs, ["projectImage"]: e.target.files[0] })} id="img1" style={{ display: 'none' }} type="file" />
                  <img className="w-100 mt-5" src={preview ? preview : `${BASE_URL}/uploads/${project.projectImage}`} alt="" />
                </label>
              </Col>
              <Col>
                <input
                  onChange={(e) => setProjectInput({ ...ProjectInputs, ["title"]: e.target.value })}
                  value={ProjectInputs.title}
                  className="form-control p-2 mt-3"
                  type="text"
                  placeholder="Project Name"
                  style={{ border: "none" }}
                />
                <hr />
                <input
                  onChange={(e) => setProjectInput({ ...ProjectInputs, ["languages"]: e.target.value })}
                  value={ProjectInputs.languages}
                  className="form-control p-2 mt-2"
                  type="text"
                  placeholder="Language Used"
                  style={{ border: "none" }}
                />
                <hr />
                <input
                  onChange={(e) => setProjectInput({ ...ProjectInputs, ["gitHub"]: e.target.value })}
                  value={ProjectInputs.gitHub}
                  className="form-control p-2 mt-2"
                  type="text"
                  placeholder="Github Link"
                  style={{ border: "none" }}
                />
                <hr />
                <input
                  onChange={(e) => setProjectInput({ ...ProjectInputs, ["website"]: e.target.value })}
                  value={ProjectInputs.website}
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
                <textarea
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
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="info" onClick={(e)=>handleUpdate(e)}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>

      </span>

    </>
  )
}

export default UpdateProject