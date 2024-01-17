import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../service/baseUrl';


function ProjectCard({project}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (

    <div>
      <Card onClick={handleShow} style={{ width: '18rem' }}>
        <Card.Img variant="top" src="https://i.postimg.cc/G3XHfCwX/3726924.webp" />
        <Card.Body>
          <Card.Title className='text-center'><h4>{project?.title}</h4></Card.Title>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h3>{project?.title}</h3></Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row>
            <Col><img className='w-100' src={project?`${BASE_URL}/uploads/${project.projectImage}`:"https://i.postimg.cc/G3XHfCwX/3726924.webp"} alt="" /></Col>
            <Col>
              <b><span className='text-danger'><b>Project Discription</b> :{project?.overView} </span></b>
              <p><b><span className='text-danger'>Technologies : </span></b>{project?.languages}</p>

            </Col>
          </Row>

        </Modal.Body>
    <hr />
      
<div className='p-3'>  
            <Link to={project?.website}>
              <i class="fa-solid fa-link text-danger fa-2x"></i>
            </Link>
            <Link to={project?.gitHub}>
              <i class="fa-brands fa-github text-danger fa-2x mx-3"></i>
            </Link>
</div>
      </Modal>
    </div>
  )
}

export default ProjectCard